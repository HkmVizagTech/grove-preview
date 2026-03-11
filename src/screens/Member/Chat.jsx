import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createSocket } from '../../api';
import { UserContext } from '../../App';
import { C } from '../../theme';
import { Avatar, Card } from '../../UI';
import { Send, ArrowLeft } from 'lucide-react';

export default function Chat() {
    const { threadId } = useParams();

    if (threadId) {
        return <ThreadViewer threadId={threadId} />;
    }

    return <ThreadList />;
}

function ThreadList() {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;

        axios.get('/api/chat', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setThreads(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ padding: 24, textAlign: 'center', color: C.text3 }}>Loading Vani messages...</div>;

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Vani (Chat)</h2>

            {threads.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 32, color: C.text3 }}>
                    No messages yet. Join a Seva Circle or contact a Guide to start chatting!
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {threads.map(t => {
                        const otherDevotee = t.participants.find(p => p.id !== user?.id) || t.participants[0];
                        const name = t.isGroup ? t.name : (otherDevotee?.spiritualName || otherDevotee?.displayName);
                        const lastMsg = t.messages?.[0]?.content || "No messages yet";

                        return (
                            <div key={t.id} onClick={() => navigate(`/app/chat/${t.id}`)} style={{
                                display: 'flex', gap: 16, padding: '16px', borderRadius: C.radius, background: C.surface,
                                border: `1px solid ${C.border}`, cursor: 'pointer', alignItems: 'center'
                            }}>
                                <Avatar initials={name ? name[0] : 'V'} size={48} />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</div>
                                    <div style={{ color: C.text3, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {lastMsg}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function ThreadViewer({ threadId }) {
    const [thread, setThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;

        // Fetch thread details
        axios.get(`/api/chat/${threadId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setThread(res.data);
                setMessages(res.data.messages || []);
                scrollToBottom();
            })
            .catch(console.error);

        // Setup socket
        socketRef.current = createSocket();

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join_thread', threadId);
        });

        socketRef.current.on('receive_message', ({ message }) => {
            setMessages(prev => [...prev, message]);
            scrollToBottom();
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.emit('leave_thread', threadId);
                socketRef.current.destroy();
            }
        };
    }, [threadId]);

    const scrollToBottom = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSend = () => {
        if (!text.trim() || !socketRef.current) return;
        socketRef.current.emit('send_message', { threadId, text });
        setText('');
    };

    if (!thread) return <div style={{ padding: 24, textAlign: 'center', color: C.text3 }}>Loading conversation...</div>;

    const otherDevotee = thread.participants.find(p => p.id !== user?.id) || thread.participants[0];
    const name = thread.isGroup ? thread.name : (otherDevotee?.spiritualName || otherDevotee?.displayName);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg, maxWidth: 600, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ padding: '16px', background: C.surface, display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${C.border}` }}>
                <ArrowLeft size={24} color={C.text} onClick={() => navigate('/app/chat')} style={{ cursor: 'pointer' }} />
                <Avatar initials={name ? name[0] : '-'} size={40} />
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map(m => {
                    const isMe = m.senderId === user?.id;
                    return (
                        <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                            {!isMe && (
                                <div style={{ fontSize: 11, color: C.text3, marginBottom: 4, marginLeft: 4 }}>
                                    {m.sender?.spiritualName || m.sender?.displayName}
                                </div>
                            )}
                            <div style={{
                                background: isMe ? C.saffron : C.surface,
                                color: isMe ? C.bg : C.text,
                                border: `1px solid ${isMe ? C.saffron : C.border}`,
                                padding: '10px 14px',
                                borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                fontSize: 15, lineHeight: 1.4
                            }}>
                                {m.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <div style={{ padding: 16, background: C.surface, borderTop: `1px solid ${C.border}`, display: 'flex', gap: 12 }}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '12px 16px', borderRadius: C.radiusPill, border: `1px solid ${C.border}`, background: C.surface2, outline: 'none', color: C.text }}
                />
                <button onClick={handleSend} style={{ width: 44, height: 44, borderRadius: '50%', background: C.saffron, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createSocket } from '../../api';
import { UserContext } from '../../App';
import { C } from '../../theme';
import { Card, Avatar, Chip, DailyShloka, OmWatermark } from '../../UI';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

export default function HomeFeed() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [japaLog, setJapaLog] = useState(0);
    const [filter, setFilter] = useState('All');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (token) {
            axios.get('/api/posts', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setPosts(res.data))
                .catch(err => console.error(err));

            // Also fetch today's sadhana for japa log
            axios.get('/api/sadhana', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const today = new Date().toISOString().split('T')[0];
                    const todayLog = res.data.find(l => l.date.split('T')[0] === today);
                    if (todayLog) setJapaLog(todayLog.japaRounds || 0);
                });
        }

        const newSocket = createSocket();

        newSocket.on('new_post', (post) => {
            setPosts(prev => [post, ...prev]);
        });

        newSocket.on('post_liked', ({ postId, likes }) => {
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes } : p));
        });

        return () => newSocket.destroy();
    }, []);

    const TABS = ['All', 'Posts', '🏛️ Ashrams', '🎵 Kirtan', '📖 Realizations'];

    const handleQuickJapa = async (n) => {
        const token = localStorage.getItem('folk_token');
        const newRounds = Math.min(16, japaLog + n);
        setJapaLog(newRounds);
        try {
            await axios.post('/api/sadhana', { japaRounds: newRounds }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) { console.error(err); }
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>

            {/* Top Banner (Shloka) */}
            <DailyShloka />

            {/* Quick Access Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                <QuickAccessItem icon="📿" label="Sadhana" path="/app/sadhana" />
                <QuickAccessItem icon="📅" label="Events" path="/app/events" />
                <QuickAccessItem icon="📖" label="Vani" path="/app/chat" />
                <QuickAccessItem icon="🎓" label="Courses" path="/app/courses" />
                <QuickAccessItem icon="🎫" label="Coupons" path="/app/coupons" />
                <QuickAccessItem icon="🚌" label="Trips" path="/app/trips" />
                <QuickAccessItem icon="🏛️" label="Ashrams" path="/app/residencies" />
                <QuickAccessItem icon="📷" label="Scan QR" path="/app/scan" />
            </div>

            {/* Japa Quick-Log */}
            <Card style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 24 }}>📿</div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>Today: {japaLog}/16 rounds 🔥</div>
                        <div style={{ fontSize: 13, color: C.text3 }}>Keep chanting!</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 4].map(n => (
                        <button key={n} onClick={() => handleQuickJapa(n)} style={{
                            background: C.surface2, padding: '6px 10px', borderRadius: C.radiusPill, border: `1px solid ${C.border}`, cursor: 'pointer'
                        }}>+{n}</button>
                    ))}
                </div>
            </Card>

            {/* Stories mock */}
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {['My Day', 'Festivals', 'Kirtan', 'Seva'].map((lbl, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 64 }}>
                        <Avatar initials={lbl[0]} size={64} lotusRing={i > 0} />
                        <span style={{ fontSize: 12 }}>{lbl}</span>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === filter} onClick={() => setFilter(t)}>{t}</Chip>
                ))}
            </div>

            {/* Feed Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {posts.length === 0 && <p style={{ textAlign: 'center', color: C.text3 }}>No realizations shared yet.</p>}
                {posts.map(post => (
                    <PostCard key={post.id} post={post} user={user} />
                ))}
            </div>
        </div>
    );
}

function QuickAccessItem({ icon, label, path }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(path)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: C.shadow }}>
                {icon}
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, textAlign: 'center' }}>{label}</span>
        </div>
    );
}

function PostCard({ post, user }) {
    const isLiked = user && post.likes && post.likes.includes(user.id);

    const handleLike = async () => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;
        try {
            await axios.post(`/api/posts/${post.id}/pranam`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error(err);
        }
    };

    const timeString = new Date(post.createdAt).toLocaleDateString();
    const displayName = post.user?.spiritualName || post.user?.displayName || 'Devotee';

    return (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: C.radius, overflow: 'hidden' }} className="card-decoration">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Avatar initials={displayName[0]} size={40} />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{displayName}</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginTop: 2 }}>
                            <span style={{ color: C.text3 }}>{timeString}</span>
                            <span>•</span>
                            <span style={{ color: C.saffron }}>{post.tag || 'Realization'}</span>
                        </div>
                    </div>
                </div>
                <MoreHorizontal color={C.text3} />
            </div>

            {post.media?.urls?.[0] && (
                <div onDoubleClick={handleLike} style={{ width: '100%', height: 300, background: C.surface2, position: 'relative', overflow: 'hidden' }}>
                    <img src={post.media.urls[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Heart onClick={handleLike} fill={isLiked ? C.lotus : 'transparent'} color={isLiked ? C.lotus : C.text} style={{ cursor: 'pointer' }} />
                        <MessageCircle />
                        <Send />
                    </div>
                    <Bookmark />
                </div>

                <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                    🙏 {post.likes ? post.likes.length : 0} Pranams
                </div>

                <div style={{ fontSize: 14, lineHeight: 1.5, color: C.text2 }}>
                    <span style={{ fontWeight: 'bold', color: C.text, marginRight: 8 }}>{displayName}</span>
                    {post.content}
                </div>
            </div>
        </div>
    );
}

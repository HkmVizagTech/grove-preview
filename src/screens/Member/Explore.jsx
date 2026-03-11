import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, Avatar, Chip } from '../../UI';
import { Search, Video } from 'lucide-react';

export default function Explore() {
    const [tab, setTab] = useState('Devotees');
    const TABS = ['Devotees', 'Seva Circles', 'Ashrams', 'Reels', 'Calendar'];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ position: 'relative', marginBottom: 24 }}>
                <input
                    placeholder="Search devotees, circles, ashrams..."
                    style={{ width: '100%', padding: '12px 16px', paddingLeft: 40, borderRadius: C.radiusPill, background: C.surface2, border: `1px solid ${C.border}`, outline: 'none' }}
                />
                <Search size={18} color={C.text3} style={{ position: 'absolute', top: 12, left: 14 }} />
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Chip>
                ))}
            </div>

            {tab === 'Devotees' && <DevoteesTab />}
            {tab === 'Seva Circles' && <CirclesTab />}
            {tab === 'Calendar' && <CalendarTab />}
            {tab === 'Reels' && <ReelsTab />}
        </div>
    );
}

import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

function DevoteesTab() {
    const [devotees, setDevotees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        axios.get('/api/community/devotees', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setDevotees(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleShelter = async (id) => {
        const token = localStorage.getItem('folk_token');
        try {
            const res = await axios.post(`/api/community/shelter/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setDevotees(prev => prev.map(d => d.id === id ? { ...d, sheltered: res.data.sheltered } : d));
        } catch (err) { console.error(err); }
    };

    const handleMessage = async (id, name) => {
        const token = localStorage.getItem('folk_token');
        try {
            const res = await axios.post('/api/chat/thread', {
                participantIds: [id],
                isGroup: false
            }, { headers: { Authorization: `Bearer ${token}` } });
            navigate(`/app/chat/${res.data.id}`);
        } catch (err) { console.error(err); }
    };

    if (loading) return <p style={{ textAlign: 'center', color: C.text3 }}>Seeking devotees...</p>;

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            {devotees.map((dev) => (
                <Card key={dev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Avatar initials={dev.spiritualName?.[0] || dev.displayName?.[0] || 'D'} size={48} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{dev.spiritualName || dev.displayName}</div>
                            <div style={{ fontSize: 13, color: C.text3 }}>{dev.center?.name || 'HKM Vizag'}</div>
                            <div style={{ fontSize: 12, color: C.saffron, marginTop: 4 }}>{dev.batch?.name || 'Gopalas'}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button
                            onClick={() => handleMessage(dev.id, dev.spiritualName || dev.displayName)}
                            style={{
                                background: C.surface2,
                                color: C.text2,
                                padding: '8px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                            <MessageCircle size={18} />
                        </button>
                        <button
                            onClick={() => handleShelter(dev.id)}
                            style={{
                                background: dev.sheltered ? C.surface2 : C.saffronLight,
                                color: dev.sheltered ? C.text3 : C.saffron,
                                padding: '8px 16px',
                                borderRadius: C.radiusPill,
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                            {dev.sheltered ? 'Sheltered' : 'Take Shelter 🙏'}
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
}

function CirclesTab() {
    const [circles, setCircles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        axios.get('/api/community/circles', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setCircles(res.data));
    }, []);

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            {circles.map(c => (
                <Card key={c.id}>
                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>{c.name}</div>
                    <p style={{ fontSize: 14, color: C.text2, margin: '8px 0' }}>{c.description}</p>
                    <div style={{ fontSize: 12, color: C.text3 }}>Leader: {c.leader?.spiritualName || c.leader?.displayName}</div>
                    <PrimaryBtn style={{ marginTop: 16, height: 36, fontSize: 14 }}>Join Circle</PrimaryBtn>
                </Card>
            ))}
        </div>
    );
}

function CalendarTab() {
    const FESTIVALS = [
        { name: 'Gaura Purnima', date: 'March 23, 2026', type: 'Festival' },
        { name: 'Rama Navami', date: 'April 6, 2026', type: 'Festival' },
        { name: 'Nrisimha Chaturdasi', date: 'May 20, 2026', type: 'Festival' }
    ];

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            <h3 className="title-font" style={{ color: C.gold }}>Vaishnava Calendar</h3>
            {FESTIVALS.map((fest, i) => (
                <Card key={i} style={{ borderLeft: `4px solid ${C.saffron}` }}>
                    <div style={{ fontWeight: 'bold' }}>{fest.name}</div>
                    <div style={{ color: C.text3, fontSize: 13, marginTop: 4 }}>{fest.date}</div>
                </Card>
            ))}
        </div>
    );
}

function ReelsTab() {
    return (
        <div style={{ height: '60vh', background: C.surface, borderRadius: C.radius, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
            <div>
                <Video size={48} color={C.text3} style={{ marginBottom: 16 }} />
                <h3 className="title-font">Vani Shorts</h3>
                <p style={{ color: C.text2, fontSize: 14 }}>Swipe up for next short kirtan clip or realization.</p>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, Chip, Tag, Avatar } from '../../UI';
import { Calendar as CalIcon, MapPin } from 'lucide-react';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        axios.get('/api/events', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setEvents(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const FILTERS = ['All', 'Satsang', 'Workshop', 'Festival', 'Book Drive', 'Service'];

    const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

    if (loading) return <div style={{ padding: 24, textAlign: 'center', color: C.text3 }}>Loading Events...</div>;

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold }}>Events & Festivals</h2>
                <CalIcon color={C.saffron} />
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {FILTERS.map(f => (
                    <Chip key={f} active={f === filter} onClick={() => setFilter(f)}>{f}</Chip>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filteredEvents.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: 32, color: C.text3 }}>No upcoming events found.</Card>
                ) : filteredEvents.map(ev => {
                    const isReg = ev.registrations && ev.registrations.length > 0;
                    return (
                        <Card key={ev.id} style={{ borderLeft: `6px solid ${C.saffron}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Tag color={C.saffron}>{ev.type || 'Event'}</Tag>
                                {isReg ? (
                                    <Tag color={C.green}>Registered ✅</Tag>
                                ) : (
                                    <Tag color={C.text2}>Open</Tag>
                                )}
                            </div>

                            <h3 style={{ fontSize: 18, marginBottom: 4 }}>{ev.title}</h3>
                            <p style={{ fontSize: 13, color: C.text2, marginBottom: 12 }}>{ev.description}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text2, marginBottom: 4 }}>
                                <CalIcon size={14} /> {new Date(ev.startTime).toLocaleString()}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text2, marginBottom: 12 }}>
                                <MapPin size={14} /> {ev.scope || 'General Location'}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: 12, color: C.text3 }}>{ev._count?.registrations || 0} attending</div>
                                <button style={{ background: C.saffron, color: C.bg, padding: '6px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                    {isReg ? 'View Ticket' : 'Register'}
                                </button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

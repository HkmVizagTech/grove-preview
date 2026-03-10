import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, Chip, Tag, Avatar } from '../../UI';
import { Calendar as CalIcon, MapPin, Users, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Events() {
    const [filter, setFilter] = useState('All');
    const FILTERS = ['All', 'Satsang', 'Workshop', 'Festival', 'Book Drive', 'Service'];
    const navigate = useNavigate();

    const EVENTS = [
        { id: 1, title: 'Mangala Arati Satsang', type: 'Satsang', color: C.saffron, guide: 'Vaishnava Das', scope: 'Your Batch', date: 'Thurs, 5:00 AM', venue: 'Temple Hall', cap: 40, reg: 24, status: 'Registered' },
        { id: 2, title: 'Yoga for Happiness', type: 'Workshop', color: '#E8738A', guide: 'Admin', scope: 'All FOLK', date: 'Sat, 6:00 PM', venue: 'Convention Center', cap: 200, reg: 180, status: 'Open' },
        { id: 3, title: 'Janmashtami 2026', type: 'Festival', color: C.gold, guide: 'Admin', scope: 'Public', date: 'Aug 26, All Day', venue: 'ISKCON Vizag Campus', cap: 5000, reg: 1200, status: 'Open' }
    ];

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
                {EVENTS.map(ev => (
                    <Card key={ev.id} style={{ borderLeft: `6px solid ${ev.color}` }} className="card-decoration">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={ev.color}>{ev.type}</Tag>
                            {ev.status === 'Registered' ? (
                                <Tag color={C.green}>Registered ✅</Tag>
                            ) : (
                                <Tag color={C.text2}>Open</Tag>
                            )}
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 4 }}>{ev.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text3, marginBottom: 4 }}>
                            <Avatar initials={ev.guide[0]} size={20} />
                            <span>{ev.guide}</span>
                            <span>•</span>
                            <span style={{ color: C.saffron }}>{ev.scope}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text2, marginBottom: 4 }}>
                            <CalIcon size={14} /> {ev.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text2, marginBottom: 12 }}>
                            <MapPin size={14} /> {ev.venue}
                        </div>

                        <div style={{ background: C.surface2, height: 6, borderRadius: C.radiusPill, overflow: 'hidden', marginBottom: 12 }}>
                            <div style={{ width: `${(ev.reg / ev.cap) * 100}%`, height: '100%', background: ev.color }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 12, color: C.text3 }}>{ev.reg} / {ev.cap} filled</div>
                            <button style={{ background: C.saffron, color: C.bg, padding: '6px 16px', borderRadius: C.radiusPill, fontWeight: 'bold' }}>
                                {ev.status === 'Registered' ? 'View Ticket' : 'Register'}
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

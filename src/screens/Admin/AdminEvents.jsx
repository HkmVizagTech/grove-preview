import React from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Users } from 'lucide-react';

export default function AdminEvents() {
    const EVENTS = [
        { title: 'Janmashtami Mahotsav 2026', scope: 'Public', status: 'Published', reg: 1200, type: 'Festival', date: 'Aug 26, All Day' },
        { title: 'Bhagavad Gita Marathon', scope: 'All FOLK', status: 'Published', reg: 85, type: 'Book Drive', date: 'Dec 1' },
        { title: 'Mangala Arati Satsang', scope: 'FOLK-Vizag-Students', status: 'Published', reg: 24, type: 'Satsang', date: 'Thu, 5:00 AM' }
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.saffron }}>All Events</h2>
                <PrimaryBtn style={{ width: 'auto' }}>+ Admin Event</PrimaryBtn>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {EVENTS.map((ev, i) => (
                    <Card key={i} style={{ borderLeft: `6px solid ${C.saffron}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={C.green}>{ev.status}</Tag>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Tag color={C.gold}>{ev.scope}</Tag>
                                <Tag color={C.saffron}>{ev.type}</Tag>
                            </div>
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 8 }}>{ev.title}</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                                <Users size={16} /> <span style={{ fontWeight: 'bold' }}>{ev.reg}</span> <span style={{ color: C.text3 }}>Registrations</span>
                            </div>
                            <button style={{ padding: '6px 12px', background: C.surface2, borderRadius: C.radiusPill, fontSize: 13 }}>Manage Center-wide</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

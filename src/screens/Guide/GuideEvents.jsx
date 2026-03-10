import React from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Users, FileText, CheckCircle } from 'lucide-react';

export default function GuideEvents() {
    const EVENTS = [
        { title: 'Mangala Arati Satsang', date: 'Thurs, 5:00 AM', status: 'Published', reg: 24, cap: 40, type: 'Satsang' },
        { title: 'Sunday Program', date: 'Sun, 4:00 PM', status: 'Draft', reg: 0, cap: 60, type: 'Festival' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold }}>My Events</h2>
                <PrimaryBtn style={{ width: 'auto' }}>+ New Event</PrimaryBtn>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {EVENTS.map((ev, i) => (
                    <Card key={i} style={{ borderLeft: `6px solid ${ev.status === 'Draft' ? C.text3 : C.saffron}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={ev.status === 'Draft' ? C.text3 : C.green}>{ev.status}</Tag>
                            <Tag color={C.saffron}>{ev.type}</Tag>
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 8 }}>{ev.title}</h3>

                        <div style={{ fontSize: 13, color: C.text3, marginBottom: 12 }}>
                            {ev.date}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                                <Users size={16} /> <span>{ev.reg} / {ev.cap} Registrations</span>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button style={{ padding: '6px 12px', background: C.surface2, borderRadius: C.radiusPill, fontSize: 13 }}>Edit</button>
                                <button style={{ padding: '6px 12px', background: C.surface2, borderRadius: C.radiusPill, fontSize: 13 }}>Manage</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

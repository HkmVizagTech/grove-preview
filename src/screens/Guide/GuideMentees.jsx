import React from 'react';
import { C } from '../../theme';
import { Card, Avatar, Tag } from '../../UI';
import { MessageCircle, Phone, FileText } from 'lucide-react';

export default function GuideMentees() {
    const MENTEES = [
        { name: 'Karthik', spName: 'Krishna Das', japa: 16, attendance: 95, status: 'Active 🟢' },
        { name: 'Suresh', spName: '-', japa: 8, attendance: 60, status: 'Needs Care 🟡' },
        { name: 'Ramesh', spName: 'Radhanath Das', japa: 16, attendance: 100, status: 'Active 🟢' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>My Folks</h2>
            <div style={{ display: 'grid', gap: 16 }}>
                {MENTEES.map((m, i) => (
                    <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 200 }}>
                            <Avatar initials={m.name[0]} size={48} />
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{m.spName !== '-' ? m.spName : m.name}</div>
                                {m.spName !== '-' && <div style={{ fontSize: 13, color: C.text3 }}>{m.name}</div>}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ color: C.text3 }}>Japa</span>
                                <span style={{ fontWeight: 'bold' }}>{m.japa}/16</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ color: C.text3 }}>Attendance</span>
                                <span style={{ fontWeight: 'bold' }}>{m.attendance}%</span>
                            </div>
                        </div>
                        <div>
                            <Tag color={m.status.includes('Active') ? C.green : C.gold}>{m.status}</Tag>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button style={{ padding: 8, background: C.surface2, borderRadius: C.radiusPill }}><MessageCircle size={18} /></button>
                            <button style={{ padding: 8, background: C.surface2, borderRadius: C.radiusPill }}><Phone size={18} /></button>
                            <button style={{ padding: 8, background: C.surface2, borderRadius: C.radiusPill }}><FileText size={18} /></button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

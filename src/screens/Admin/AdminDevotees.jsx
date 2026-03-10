import React from 'react';
import { C } from '../../theme';
import { Card, Avatar, Tag } from '../../UI';

export default function AdminDevotees() {
    const MEMBERS = [
        { name: 'Karthik S', spName: 'Krishna Das', batch: 'Students', japa: 16, attendance: 95, role: 'member' },
        { name: 'Gopinath V', spName: 'Gopinath Das', batch: 'Professionals', japa: 16, attendance: 100, role: 'guide' },
        { name: 'Admin Prabhu', spName: 'Admin Prabhu', batch: 'Center Admin', japa: '-', attendance: '-', role: 'admin' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>All Devotees</h2>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <input placeholder="Search members..." style={{ flex: 1, padding: 12, borderRadius: C.radiusPill, background: C.surface2 }} />
                <button style={{ padding: '12px 24px', background: C.saffronLight, color: C.saffron, borderRadius: C.radiusPill, fontWeight: 'bold' }}>Filter</button>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                    <thead>
                        <tr style={{ background: C.surface2, color: C.text2 }}>
                            <th style={{ padding: 16 }}>Devotee</th>
                            <th style={{ padding: 16 }}>Batch</th>
                            <th style={{ padding: 16 }}>Role</th>
                            <th style={{ padding: 16 }}>Japa (avg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MEMBERS.map((m, i) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={{ padding: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Avatar initials={m.name[0]} size={36} />
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{m.spName}</div>
                                            <div style={{ fontSize: 12, color: C.text3 }}>{m.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: 16, color: C.text3 }}>{m.batch}</td>
                                <td style={{ padding: 16 }}><Tag color={m.role === 'admin' ? C.lotus : m.role === 'guide' ? C.gold : C.saffron}>{m.role}</Tag></td>
                                <td style={{ padding: 16, fontWeight: 'bold' }}>{m.japa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

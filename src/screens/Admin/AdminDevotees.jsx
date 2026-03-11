import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, Avatar, Tag } from '../../UI';
import axios from 'axios';

export default function AdminDevotees() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (token) {
            axios.get('/api/community/devotees', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setMembers(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, []);

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>All Devotees ({members.length})</h2>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <input placeholder="Search members..." style={{ flex: 1, padding: 12, borderRadius: C.radiusPill, background: C.surface2, color: C.text, border: 'none', outline: 'none' }} />
                <button style={{ padding: '12px 24px', background: C.saffronLight, color: C.saffron, borderRadius: C.radiusPill, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Filter</button>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                        <thead>
                            <tr style={{ background: C.surface2, color: C.text2, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                                <th style={{ padding: 16 }}>Devotee</th>
                                <th style={{ padding: 16 }}>Contact</th>
                                <th style={{ padding: 16 }}>Batch</th>
                                <th style={{ padding: 16 }}>Role</th>
                                <th style={{ padding: 16 }}>Today's Japa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} style={{ padding: 16, textAlign: 'center', color: C.text3 }}>Loading...</td></tr>
                            ) : members.length === 0 ? (
                                <tr><td colSpan={5} style={{ padding: 16, textAlign: 'center', color: C.text3 }}>No devotees found.</td></tr>
                            ) : members.map((m) => (
                                <tr key={m.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                                    <td style={{ padding: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Avatar initials={(m.spiritualName || m.displayName || 'D')[0]} size={36} />
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{m.spiritualName || m.displayName}</div>
                                                {m.spiritualName && <div style={{ fontSize: 12, color: C.text3 }}>{m.displayName}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: 16, color: C.text3 }}>{m.phone || '-'}</td>
                                    <td style={{ padding: 16, color: C.text3 }}>{m.batch?.name || 'No Batch'}</td>
                                    <td style={{ padding: 16 }}>
                                        <Tag color={m.role === 'folk_admin' ? C.lotus : m.role === 'folk_guide' ? C.gold : C.green}>{m.role.replace('folk_', '')}</Tag>
                                    </td>
                                    <td style={{ padding: 16, fontWeight: 'bold', color: m.todayJapa >= 16 ? C.green : m.todayJapa > 0 ? C.gold : C.text3 }}>
                                        {m.todayJapa || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card } from '../../UI';

export default function GuideSadhana() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ submitted: 0, total: 0, avgJapa: 0 });

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        const h = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('/api/community/devotees', h)
            .then(res => {
                const devs = res.data || [];
                setMembers(devs);
                setStats({
                    submitted: devs.filter(d => d.todayJapa > 0).length,
                    total: devs.length,
                    avgJapa: devs.length
                        ? (devs.reduce((sum, d) => sum + (d.todayJapa || 0), 0) / devs.length).toFixed(1)
                        : 0
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>Sadhana Reports</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                <Card style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: C.text2 }}>Today's Log Completion</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{stats.submitted}/{stats.total}</div>
                    <div style={{ width: '100%', height: 4, background: C.surface2, marginTop: 8, borderRadius: 4 }}>
                        <div style={{ width: `${stats.total ? (stats.submitted / stats.total * 100) : 0}%`, height: '100%', background: C.green, borderRadius: 4 }} />
                    </div>
                </Card>
                <Card style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: C.text2 }}>Avg Japa (Batch)</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, color: C.gold }}>{stats.avgJapa}</div>
                    <div style={{ fontSize: 12, color: C.text3, marginTop: 4 }}>Target: 16 rounds</div>
                </Card>
            </div>

            <Card>
                {loading ? (
                    <div style={{ color: C.text3, textAlign: 'center', padding: 32 }}>Loading sadhana data...</div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 500 }}>
                            <thead>
                                <tr style={{ borderBottom: `2px solid ${C.border}`, color: C.text2, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    <th style={{ padding: '12px 0' }}>Devotee</th>
                                    <th style={{ padding: '12px 0' }}>Role</th>
                                    <th style={{ padding: '12px 0' }}>Phone</th>
                                    <th style={{ padding: '12px 0' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr><td colSpan={4} style={{ padding: 24, color: C.text3, textAlign: 'center' }}>No members in batch yet.</td></tr>
                                ) : members.map((u, i) => (
                                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                                        <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{u.displayName || u.spiritualName || 'Devotee'}</td>
                                        <td style={{ padding: '16px 0' }}>
                                            <span style={{ background: u.role === 'folk_guide' ? C.saffronLight : C.surface2, color: u.role === 'folk_guide' ? C.saffron : C.text2, borderRadius: 12, padding: '2px 8px', fontSize: 12 }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 0', color: C.text2 }}>{u.phone || '-'}</td>
                                        <td style={{ padding: '16px 0' }}>
                                            <span style={{ color: u.todayJapa > 0 ? C.green : C.text3 }}>
                                                {u.todayJapa > 0 ? `✅ ${u.todayJapa} rounds` : '⏳ Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}

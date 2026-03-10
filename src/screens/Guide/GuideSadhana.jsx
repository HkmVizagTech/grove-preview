import React from 'react';
import { C } from '../../theme';
import { Card, Tag } from '../../UI';

export default function GuideSadhana() {
    const S_DATA = [
        { name: 'Jagannath Das', roundAvg: 16.0, streak: 45, mangala: '95%', shastra: '30 mins/day' },
        { name: 'Gouranga Das', roundAvg: 16.0, streak: 12, mangala: '80%', shastra: '20 mins/day' },
        { name: 'Krishna Das', roundAvg: 12.4, streak: 3, mangala: '40%', shastra: '15 mins/day' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>Sadhana Reports</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                <Card style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: C.text2 }}>Today's Log Completion</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>24/35</div>
                    <div style={{ width: '100%', height: 4, background: C.surface2, marginTop: 8 }}><div style={{ width: '68%', height: '100%', background: C.green }} /></div>
                </Card>
                <Card style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: C.text2 }}>Avg Japa (Batch)</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8, color: C.gold }}>14.2</div>
                    <div style={{ fontSize: 12, color: C.text3, marginTop: 4 }}>Compared to 16.0 Target</div>
                </Card>
            </div>

            <Card>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${C.border}`, color: C.text2 }}>
                                <th style={{ padding: '12px 0' }}>Devotee</th>
                                <th style={{ padding: '12px 0' }}>Japa Avg (7d)</th>
                                <th style={{ padding: '12px 0' }}>Streak</th>
                                <th style={{ padding: '12px 0' }}>Mangala Arati</th>
                                <th style={{ padding: '12px 0' }}>Shastra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {S_DATA.map((u, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                                    <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{u.name}</td>
                                    <td style={{ padding: '16px 0', color: u.roundAvg < 16 ? C.gold : C.green }}>{u.roundAvg}</td>
                                    <td style={{ padding: '16px 0' }}>{u.streak > 10 ? `🔥 ${u.streak}` : u.streak}</td>
                                    <td style={{ padding: '16px 0' }}>{u.mangala}</td>
                                    <td style={{ padding: '16px 0' }}>{u.shastra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

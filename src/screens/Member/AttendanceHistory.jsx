import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, Tag } from '../../UI';

const RECORDS = [
    { event: 'Mangala Arati Satsang', date: 'Mon, 10 Mar 2026', time: '5:02 AM', status: 'Present', points: 10, mode: 'QR Scan' },
    { event: 'Sunday Program', date: 'Sun, 09 Mar 2026', time: '4:45 PM', status: 'Present', points: 20, mode: 'QR Scan' },
    { event: 'Bhakti Shastri Class', date: 'Sat, 08 Mar 2026', time: '9:00 AM', status: 'Late', points: 5, mode: 'Manual' },
    { event: 'Mangala Arati Satsang', date: 'Fri, 07 Mar 2026', time: '-', status: 'Absent', points: 0, mode: '-' },
    { event: 'Kirtan Workshop', date: 'Thu, 06 Mar 2026', time: '6:00 PM', status: 'Present', points: 15, mode: 'QR Scan' },
];

const STATUS_COLORS = { Present: '#6B8F47', Late: '#F4C430', Absent: '#E8738A' };

export default function AttendanceHistory() {
    const [filter, setFilter] = useState('All');

    const totalPoints = RECORDS.reduce((s, r) => s + r.points, 0);
    const presentCount = RECORDS.filter(r => r.status === 'Present').length;

    const filtered = filter === 'All' ? RECORDS : RECORDS.filter(r => r.status === filter);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Attendance History</h2>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Present', val: presentCount, color: C.green },
                    { label: 'Total Events', val: RECORDS.length, color: C.saffron },
                    { label: 'Points Earned', val: totalPoints, color: C.gold },
                ].map(s => (
                    <Card key={s.label} style={{ textAlign: 'center', padding: 12, borderTop: `4px solid ${s.color}` }}>
                        <div style={{ fontSize: 22, fontWeight: 'bold', color: s.color }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>{s.label}</div>
                    </Card>
                ))}
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['All', 'Present', 'Late', 'Absent'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '6px 14px', borderRadius: C.radiusPill, fontSize: 13,
                            background: filter === f ? C.saffron : C.surface2,
                            color: filter === f ? '#000' : C.text,
                            fontWeight: filter === f ? 'bold' : 'normal',
                            border: `1px solid ${filter === f ? C.saffron : C.border}`,
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Records Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {filtered.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                        {/* Timeline dot */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                            <div style={{
                                width: 14, height: 14, borderRadius: '50%',
                                background: STATUS_COLORS[r.status] || C.text3,
                                flexShrink: 0,
                            }} />
                            {i < filtered.length - 1 && (
                                <div style={{ width: 2, flex: 1, background: C.border, marginTop: 4, minHeight: 24 }} />
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{r.event}</div>
                            <div style={{ fontSize: 13, color: C.text3 }}>{r.date} {r.time !== '-' ? `• ${r.time}` : ''}</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                <Tag color={STATUS_COLORS[r.status] || C.text3}>{r.status}</Tag>
                                {r.mode !== '-' && <Tag color={C.text3}>{r.mode}</Tag>}
                                {r.points > 0 && <Tag color={C.gold}>+{r.points} pts</Tag>}
                            </div>
                        </div>

                        {r.status === 'Absent' && (
                            <button style={{
                                padding: '6px 10px', background: 'transparent', border: `1px solid ${C.border}`,
                                borderRadius: C.radiusPill, fontSize: 11, color: C.text3, cursor: 'pointer', alignSelf: 'flex-start',
                            }}>
                                Dispute
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

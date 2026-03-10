import React, { useState, useEffect, useContext } from 'react';
import { C } from '../../theme';
import { Card, Tag } from '../../UI';
import axios from 'axios';
import { UserContext } from '../../App';
import { createSocket } from '../../api';

const STATUS_COLORS = { Present: '#6B8F47', Late: '#F4C430', Absent: '#E8738A' };

export default function AttendanceHistory() {
    const [filter, setFilter] = useState('All');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchHistory();

        const socket = createSocket();
        socket.on('attendance_update', (update) => {
            if (update.devotee._id === user?._id) {
                setRecords(prev => [update, ...prev]);
            }
        });

        return () => socket.close();
    }, [user?._id]);

    const fetchHistory = async () => {
        const token = localStorage.getItem('folk_token');
        try {
            const res = await axios.get(`/api/attendance/history?devoteeId=${user?._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecords(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const totalPoints = records.length * 10; // Simple points calculation for now
    const presentCount = records.filter(r => r.status === 'Present').length;
    const filtered = filter === 'All' ? records : records.filter(r => r.status === filter);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Attendance History</h2>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Present', val: presentCount, color: C.green },
                    { label: 'Total Events', val: records.length, color: C.saffron },
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
                {loading && <p style={{ textAlign: 'center', color: C.text3 }}>Loading records...</p>}
                {!loading && filtered.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📿</div>
                        <p style={{ color: C.text3 }}>No attendance records found yet.</p>
                    </div>
                )}
                {filtered.map((r, i) => (
                    <div key={r._id || i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                        {/* Timeline dot */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                            <div style={{
                                width: 14, height: 14, borderRadius: '50%',
                                background: STATUS_COLORS[r.status] || C.saffron,
                                flexShrink: 0,
                            }} />
                            {i < filtered.length - 1 && (
                                <div style={{ width: 2, flex: 1, background: C.border, marginTop: 4, minHeight: 24 }} />
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{r.type}</div>
                            <div style={{ fontSize: 13, color: C.text3 }}>
                                {new Date(r.checkInTime).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                {' • '}
                                {new Date(r.checkInTime).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                <Tag color={STATUS_COLORS[r.status] || C.saffron}>{r.status}</Tag>
                                <Tag color={C.text3}>{r.location || 'Main Hall'}</Tag>
                                <Tag color={C.gold}>+10 pts</Tag>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

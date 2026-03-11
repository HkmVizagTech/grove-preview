import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag, Avatar } from '../../UI';

export default function Sankirtan() {
    const [tab, setTab] = useState('Log Form');
    const TABS = ['Log Form', 'Leaderboard'];
    const [points, setPoints] = useState({ gita: 0, big: 0, medium: 0, small: 0 });
    const [location, setLocation] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const totalPoints = (points.gita * 20) + (points.big * 10) + (points.medium * 5) + (points.small * 2);

    useEffect(() => {
        if (tab === 'Leaderboard') {
            const token = localStorage.getItem('folk_token');
            axios.get('/api/sankirtan/leaderboard', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setLeaderboard(res.data))
                .catch(err => console.error(err));
        }
    }, [tab]);

    const submitLog = async () => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;
        setSubmitting(true);
        try {
            await axios.post('/api/sankirtan', {
                mahaBig: points.gita,
                big: points.big,
                medium: points.medium,
                small: points.small,
                location
            }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Sankirtan log submitted for guide verification!");
            setPoints({ gita: 0, big: 0, medium: 0, small: 0 });
            setLocation('');
            setTab('Leaderboard');
        } catch (err) {
            console.error(err);
            alert("Error submitting log");
        }
        setSubmitting(false);
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Book Distribution</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>{0}</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>Monthly<br />Books</div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold', color: C.saffron }}>{0}</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>Monthly<br />Points</div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold', color: C.gold }}>-</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>Batch<br />Rank</div>
                </Card>
            </div>

            <div style={{ display: 'flex', gap: 16, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
                {TABS.map(t => (
                    <div key={t} onClick={() => setTab(t)} style={{
                        paddingBottom: 12, fontWeight: 'bold', cursor: 'pointer',
                        color: tab === t ? C.saffron : C.text3,
                        borderBottom: tab === t ? `2px solid ${C.saffron}` : 'none'
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            {tab === 'Log Form' && (
                <Card>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 13, color: C.text3 }}>Location / Mode</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. RK Beach, Street Preaching" style={{ width: '100%', padding: '12px 0', borderBottom: `2px solid ${C.saffron}`, fontSize: 16, background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                        <PointCounter label="Bhagavad Gita / Maha Big" pts={20} val={points.gita} set={v => setPoints({ ...points, gita: v })} />
                        <PointCounter label="Big Books" pts={10} val={points.big} set={v => setPoints({ ...points, big: v })} />
                        <PointCounter label="Medium Books" pts={5} val={points.medium} set={v => setPoints({ ...points, medium: v })} />
                        <PointCounter label="Small Books" pts={2} val={points.small} set={v => setPoints({ ...points, small: v })} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: 16, background: C.surface2, borderRadius: C.radius }}>
                        <span style={{ fontWeight: 'bold' }}>Estimated Points</span>
                        <span style={{ fontSize: 24, fontWeight: 'bold', color: C.gold }}>{totalPoints}</span>
                    </div>

                    <PrimaryBtn onClick={submitLog} disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Log to Guide'}
                    </PrimaryBtn>
                </Card>
            )}

            {tab === 'Leaderboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Tag color={C.gold}>Global Leaderboard</Tag>
                    {leaderboard.length === 0 && <p style={{ color: C.text3, textAlign: 'center', padding: 16 }}>No approved logs yet.</p>}
                    {leaderboard.map((u, i) => (
                        <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: i === 0 ? C.gold : C.border }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 20, width: 30, color: i === 0 ? C.gold : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : C.text }}>#{i + 1}</span>
                                <Avatar initials={u.name[0]} size={32} />
                                <div>
                                    <span style={{ fontWeight: 'bold', display: 'block' }}>{u.name}</span>
                                    <span style={{ fontSize: 12, color: C.text3 }}>{u.batch || 'Devotee'}</span>
                                </div>
                            </div>
                            <span style={{ color: C.saffron, fontWeight: 'bold' }}>{u.points} pts</span>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

function PointCounter({ label, pts, val, set }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <div style={{ fontWeight: 'bold' }}>{label}</div>
                <div style={{ fontSize: 12, color: C.text3 }}>x{pts} pts</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={() => set(Math.max(0, val - 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: C.surface2, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>-</button>
                <span style={{ width: 24, textAlign: 'center', fontWeight: 'bold' }}>{val}</span>
                <button onClick={() => set(val + 1)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.saffron, color: C.bg, fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>+</button>
            </div>
        </div>
    );
}


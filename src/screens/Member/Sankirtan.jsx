import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag, Avatar } from '../../UI';
import { Book, Trophy, Medal } from 'lucide-react';

export default function Sankirtan() {
    const [tab, setTab] = useState('Log Form');
    const TABS = ['Log Form', 'Leaderboard'];
    const [points, setPoints] = useState({ gita: 0, big: 0, medium: 0, small: 0 });

    const totalPoints = (points.gita * 10) + (points.big * 8) + (points.medium * 5) + (points.small * 2);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Book Distribution</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>14</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>Monthly<br />Books</div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold', color: C.saffron }}>140</div>
                    <div style={{ fontSize: 11, color: C.text3 }}>Monthly<br />Points</div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 'bold', color: C.gold }}>#3</div>
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
                        <input placeholder="e.g. RK Beach, Street Preaching" style={{ width: '100%', padding: '12px 0', borderBottom: `2px solid ${C.saffron}`, fontSize: 16 }} />
                    </div>

                    <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                        <PointCounter label="Bhagavad Gita As It Is" pts={10} val={points.gita} set={v => setPoints({ ...points, gita: v })} />
                        <PointCounter label="Big Books" pts={8} val={points.big} set={v => setPoints({ ...points, big: v })} />
                        <PointCounter label="Medium Books" pts={5} val={points.medium} set={v => setPoints({ ...points, medium: v })} />
                        <PointCounter label="Small Books" pts={2} val={points.small} set={v => setPoints({ ...points, small: v })} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: 16, background: C.surface2, borderRadius: C.radius }}>
                        <span style={{ fontWeight: 'bold' }}>Estimated Points</span>
                        <span style={{ fontSize: 24, fontWeight: 'bold', color: C.gold }}>{totalPoints}</span>
                    </div>

                    <PrimaryBtn>Submit Log to Guide</PrimaryBtn>
                </Card>
            )}

            {tab === 'Leaderboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Tag color={C.gold}>My Batch (This Month)</Tag>
                    {[
                        { name: 'Jagannath Das', pts: 420 },
                        { name: 'Gouranga Das', pts: 380 },
                        { name: 'Krishna Das', pts: 140 },
                    ].map((u, i) => (
                        <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: i === 0 ? C.gold : C.border }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 20, color: i === 0 ? C.gold : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : C.text }}>#{i + 1}</span>
                                <Avatar initials={u.name[0]} size={32} />
                                <span style={{ fontWeight: 'bold' }}>{u.name}</span>
                            </div>
                            <span style={{ color: C.saffron, fontWeight: 'bold' }}>{u.pts} pts</span>
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
                <button onClick={() => set(Math.max(0, val - 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: C.surface2, fontWeight: 'bold' }}>-</button>
                <span style={{ width: 24, textAlign: 'center', fontWeight: 'bold' }}>{val}</span>
                <button onClick={() => set(val + 1)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.saffron, color: C.bg, fontWeight: 'bold' }}>+</button>
            </div>
        </div>
    );
}

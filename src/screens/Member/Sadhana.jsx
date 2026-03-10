import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, OmWatermark, Tag } from '../../UI';
import { Flame, CheckCircle, BookOpen, Sun, Moon } from 'lucide-react';

export default function Sadhana() {
    const [rounds, setRounds] = useState(12);
    const [vows, setVows] = useState({ meat: true, intox: true, gamble: true, illicit: true });

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Sadhana Tracker</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                <Card style={{ background: C.surface, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Flame size={32} color={C.saffron} />
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>7 Days</div>
                    <div style={{ fontSize: 13, color: C.text3 }}>Current Streak</div>
                </Card>
                <Card style={{ background: C.surface, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tag color={C.gold}>🏆 Record</Tag>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>45 Days</div>
                    <div style={{ fontSize: 13, color: C.text3 }}>Longest Streak</div>
                </Card>
            </div>

            <Card style={{ marginBottom: 24, position: 'relative' }}>
                <OmWatermark />
                <h3 className="title-font" style={{ color: C.saffron, fontSize: 20, marginBottom: 16 }}>Today's Log</h3>

                {/* Japa Dial */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <div style={{ width: 120, height: 120, borderRadius: '50%', border: `8px solid ${C.saffron}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 32, color: C.gold }}>
                        {rounds}/16
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button onClick={() => setRounds(r => Math.min(16, r + 1))} style={btnStyle}>+1</button>
                        <button onClick={() => setRounds(r => Math.min(16, r + 4))} style={btnStyle}>+4</button>
                        <button onClick={() => setRounds(r => Math.min(16, r + 8))} style={btnStyle}>+8</button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                    <Toggle icon={<Sun />} label="Mangala Arati Attended" />
                    <Toggle icon={<BookOpen />} label="Read 10 pages Shastra" />
                    <Toggle icon={<CheckCircle />} label="Noon Arati" />
                    <Toggle icon={<Moon />} label="Evening Arati" />
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 16 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 16, color: C.text2 }}>4 Regulative Principles</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {Object.keys(vows).map(k => (
                            <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input type="checkbox" checked={vows[k]} onChange={() => setVows({ ...vows, [k]: !vows[k] })} />
                                <span style={{ fontSize: 14 }}>No {k}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 24 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 8, color: C.text2 }}>Mood: 🙏 Transcendental</div>
                    <textarea placeholder="Notes..." style={{ width: '100%', height: 60, borderBottom: `1px solid ${C.saffron}`, resize: 'none' }} />
                </div>

                <PrimaryBtn style={{ marginTop: 24 }}>Save Daily Log</PrimaryBtn>
            </Card>
        </div>
    );
}

const btnStyle = { background: C.surface2, padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold' };
const Toggle = ({ icon, label }) => {
    const [on, setOn] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: on ? C.saffron : C.text }}>
                {React.cloneElement(icon, { color: on ? C.saffron : C.text2 })}
                <span style={{ fontWeight: 500 }}>{label}</span>
            </div>
            <input type="checkbox" checked={on} onChange={() => setOn(!on)} style={{ transform: 'scale(1.2)' }} />
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, PrimaryBtn, OmWatermark, Tag } from '../../UI';
import { Flame, CheckCircle, BookOpen, Sun, Moon } from 'lucide-react';

export default function Sadhana() {
    const [rounds, setRounds] = useState(0);
    const [principles, setPrinciples] = useState({ meat: true, intox: true, gamble: true, illicit: true });
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ streak: 0, record: 0 });

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        const today = new Date().toISOString().split('T')[0];
        axios.get('/api/sadhana', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                const todayLog = res.data.find(l => l.date.split('T')[0] === today);
                if (todayLog) {
                    setRounds(todayLog.japaRounds || 0);
                    if (todayLog.principlesFollowed) setPrinciples(todayLog.principlesFollowed);
                }
                setStats({ streak: res.data.length, record: Math.max(res.data.length, 7) });
            });
    }, []);

    const handleSave = async () => {
        setLoading(true);
        const token = localStorage.getItem('folk_token');
        try {
            await axios.post('/api/sadhana', {
                date: new Date().toISOString(),
                japaRounds: rounds,
                principlesFollowed: principles
            }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Sadhana log saved! Hare Krishna 🙏");
        } catch (err) {
            console.error(err);
            alert("Failed to save log.");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Sadhana Tracker</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                <Card style={{ background: C.surface, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Flame size={32} color={C.saffron} />
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{stats.streak} Days</div>
                    <div style={{ fontSize: 13, color: C.text3 }}>Current Streak</div>
                </Card>
                <Card style={{ background: C.surface, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tag color={C.gold}>🏆 Record</Tag>
                    <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{stats.record} Days</div>
                    <div style={{ fontSize: 13, color: C.text3 }}>Longest Streak</div>
                </Card>
            </div>

            <Card style={{ marginBottom: 24, position: 'relative' }}>
                <OmWatermark />
                <h3 className="title-font" style={{ color: C.saffron, fontSize: 20, marginBottom: 16 }}>Today's Log</h3>

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
                    <Toggle icon={<Sun />} label="Mangala Arati" />
                    <Toggle icon={<BookOpen />} label="Reading Sastra" />
                    <Toggle icon={<CheckCircle />} label="Hearing Vani" />
                    <Toggle icon={<Moon />} label="Night Kirtan" />
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 16 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 16, color: C.text2, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>4 Regulative Principles</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <Principle label="No Meat/Egg/Fish" checked={principles.meat} onChange={() => setPrinciples({ ...principles, meat: !principles.meat })} />
                        <Principle label="No Intoxication" checked={principles.intox} onChange={() => setPrinciples({ ...principles, intox: !principles.intox })} />
                        <Principle label="No Gambling" checked={principles.gamble} onChange={() => setPrinciples({ ...principles, gamble: !principles.gamble })} />
                        <Principle label="No Illicit Sex" checked={principles.illicit} onChange={() => setPrinciples({ ...principles, illicit: !principles.illicit })} />
                    </div>
                </div>

                <PrimaryBtn style={{ marginTop: 32 }} onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Daily Log 🙏'}
                </PrimaryBtn>
            </Card>
        </div>
    );
}

const btnStyle = { background: C.surface2, padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: 'none', cursor: 'pointer' };

const Principle = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ transform: 'scale(1.2)' }} />
        <span style={{ fontSize: 13, color: checked ? C.text : C.text3 }}>{label}</span>
    </label>
);

const Toggle = ({ icon, label }) => {
    const [on, setOn] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: on ? C.saffron : C.text }}>
                {React.cloneElement(icon, { size: 20, color: on ? C.saffron : C.text2 })}
                <span style={{ fontWeight: 500, fontSize: 14 }}>{label}</span>
            </div>
            <input type="checkbox" checked={on} onChange={() => setOn(!on)} style={{ transform: 'scale(1.2)', cursor: 'pointer' }} />
        </div>
    );
};

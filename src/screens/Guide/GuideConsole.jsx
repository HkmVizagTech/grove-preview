import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Users, QrCode, AlertCircle, FileText, CheckCircle, Flame } from 'lucide-react';

export default function GuideConsole() {
    const [qrRefresh, setQrRefresh] = useState(60);
    const [present, setPresent] = useState(24);

    useEffect(() => {
        const t = setInterval(() => {
            setQrRefresh(v => (v > 0 ? v - 1 : 60));
        }, 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>Seva Console</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>

                {/* Live Attendance */}
                <Card style={{ background: `linear-gradient(135deg, ${C.surface}, ${C.surface2})`, border: `2px solid ${C.green}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: C.green, fontWeight: 'bold' }}>Live Attendance</div>
                        <Users color={C.green} />
                    </div>
                    <div style={{ fontSize: 48, fontWeight: 'bold', margin: '16px 0', color: C.text }}>
                        {present} <span style={{ fontSize: 16, color: C.text3, fontWeight: 'normal' }}>Present</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                        <div><span style={{ color: C.saffron }}>1</span> Late</div>
                        <div><span style={{ color: C.text2 }}>35</span> Registered</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button onClick={() => setPresent(p => p + 1)} style={{ background: C.green, color: '#fff', padding: '6px 12px', borderRadius: C.radiusPill }}>+ Manual</button>
                        <button style={{ background: C.surface2, color: C.text, padding: '6px 12px', borderRadius: C.radiusPill }}>Mark Absent</button>
                    </div>
                </Card>

                {/* Presenter QR */}
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>Today: Mangala Arati Satsang</div>
                    <div style={{ width: 160, height: 160, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
                        <QrCode size={120} color="#000" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <div style={{ width: 100, height: 4, background: C.surface2, borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ width: `${(qrRefresh / 60) * 100}%`, height: '100%', background: C.saffron }} />
                        </div>
                        <div style={{ fontSize: 12, color: C.text3 }}>{qrRefresh}s</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <Tag color={C.gold}>Full Screen</Tag>
                        <Tag color={C.saffron}>Copy Link</Tag>
                    </div>
                </Card>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
                <Card style={{ borderLeft: `4px solid ${C.saffron}` }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>My Batch Overview</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ color: C.text2 }}>Total Members</span>
                        <span style={{ fontWeight: 'bold' }}>35</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ color: C.text2 }}>Avg Japa (Today)</span>
                        <span style={{ fontWeight: 'bold', color: C.gold }}>12.4</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: C.lotus, fontWeight: 'bold' }}>
                        <span>Needs Attention</span>
                        <span>3 members</span>
                    </div>
                </Card>

                <Card style={{ borderLeft: `4px solid ${C.gold}` }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Pending Queue</div>
                    <QueueItem icon={<Book color={C.saffron} />} count={4} label="Sankirtan logs to verify" />
                    <QueueItem icon={<AlertCircle color={C.lotus} />} count={1} label="Attendance disputes" />
                    <QueueItem icon={<FileText color={C.text2} />} count={3} label="Course reflections" />
                </Card>
            </div>

        </div>
    );
}

const QueueItem = ({ icon, count, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
        {icon}
        <div style={{ flex: 1, fontWeight: 500 }}>{label}</div>
        <div style={{ background: C.gold, color: '#000', fontWeight: 'bold', borderRadius: 12, padding: '2px 8px', fontSize: 12 }}>{count}</div>
    </div>
);

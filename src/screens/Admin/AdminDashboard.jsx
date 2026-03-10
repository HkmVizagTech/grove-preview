import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, Tag } from '../../UI';
import { Users, AlertCircle, TrendingUp, Calendar, HelpCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ devotees: 0, events: 0, posts: 0 });

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;
        const h = { headers: { Authorization: `Bearer ${token}` } };
        Promise.all([
            axios.get('/api/community/devotees', h),
            axios.get('/api/events', h),
            axios.get('/api/posts', h),
        ]).then(([devs, evs, posts]) => {
            setStats({
                devotees: devs.data.length,
                events: evs.data.length,
                posts: posts.data.length,
            });
        }).catch(console.error);
    }, []);

    const KPIS = [
        { label: 'Total Devotees', val: stats.devotees || '—', color: C.saffron },
        { label: 'Events Scheduled', val: stats.events || '—', color: C.green },
        { label: 'Posts This Week', val: stats.posts || '—', color: C.gold },
        { label: 'Avg Japa Rounds', val: '12.4', color: C.lotus },
        { label: 'Sankirtan Pts', val: '8,420', color: C.saffron },
        { label: 'Beds Occupied', val: '84%', color: C.green },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>Admin Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
                {KPIS.map(k => (
                    <Card key={k.label} style={{ borderLeft: `6px solid ${k.color}` }}>
                        <div style={{ fontSize: 13, color: C.text3 }}>{k.label}</div>
                        <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>{k.val}</div>
                    </Card>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginBottom: 24 }}>

                {/* Mock Chart Area */}
                <Card>
                    <div style={{ fontWeight: 'bold', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingUp size={18} color={C.saffron} /> Attendance Trend (30d)
                    </div>
                    <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                        {[30, 45, 60, 40, 70, 85, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, background: C.saffronLight, height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${h * 0.8}%`, background: C.saffron, borderRadius: '4px 4px 0 0' }} />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: C.text3 }}>
                        <span>Week 1</span>
                        <span>Week 4</span>
                    </div>
                </Card>

                {/* Funnel Chart Mock */}
                <Card>
                    <div style={{ fontWeight: 'bold', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Calendar size={18} color={C.gold} /> RSVP Funnel
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                        <FunnelBar pct={100} label="Sent" val="500" color="#333" />
                        <FunnelBar pct={60} label="Clicked Coming" val="300" color={C.saffronLight} />
                        <FunnelBar pct={50} label="Coupon Issued" val="250" color={C.saffron} />
                        <FunnelBar pct={45} label="Redeemed" val="225" color={C.green} />
                    </div>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
                <Card style={{ borderLeft: `4px solid ${C.lotus}` }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Quick Alerts</div>
                    <QueueItem icon={<Calendar color={C.saffron} />} count={3} label="Events today" />
                    <QueueItem icon={<HelpCircle color={C.lotus} />} count={42} label="Pending sankirtan verifications" />
                    <QueueItem icon={<AlertCircle color={C.text2} />} count={8} label="Open accommodation requests" />
                    <QueueItem icon={<AlertCircle color={C.text2} />} count={2} label="Reported content" />
                </Card>
            </div>
        </div>
    );
}

const FunnelBar = ({ pct, label, val, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: C.text2 }}>{label}</span>
            <span style={{ fontWeight: 'bold' }}>{val}</span>
        </div>
        <div style={{ background: C.surface2, height: 8, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: color }} />
        </div>
    </div>
);

const QueueItem = ({ icon, count, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
        {icon}
        <div style={{ flex: 1, fontSize: 14 }}>{label}</div>
        <div style={{ background: C.surface2, color: C.text, fontWeight: 'bold', borderRadius: 12, padding: '2px 8px', fontSize: 12 }}>{count}</div>
    </div>
);

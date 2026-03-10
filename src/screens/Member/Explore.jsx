import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, Avatar, Chip, PrimaryBtn, Tag } from '../../UI';
import { Search, MapPin, Users, Video } from 'lucide-react';

export default function Explore() {
    const [tab, setTab] = useState('Devotees');
    const TABS = ['Devotees', 'Seva Circles', 'Ashrams', 'Reels', 'Calendar'];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ position: 'relative', marginBottom: 24 }}>
                <input
                    placeholder="Search devotees, circles, ashrams..."
                    style={{ width: '100%', padding: '12px 16px', paddingLeft: 40, borderRadius: C.radiusPill, background: C.surface2, border: `1px solid ${C.border}` }}
                />
                <Search size={18} color={C.text3} style={{ position: 'absolute', top: 12, left: 14 }} />
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Chip>
                ))}
            </div>

            {tab === 'Devotees' && <DevoteesTab />}
            {tab === 'Calendar' && <CalendarTab />}
            {tab === 'Reels' && <ReelsTab />}
        </div>
    );
}

function DevoteesTab() {
    const DEVOTEES = [
        { name: 'Karthik Sharma', spName: 'Krishna Das', guide: 'Vaishnava Das', interests: ['Kirtan', 'Book Dist'], avatar: 'K' },
        { name: 'Priya Raj', spName: 'Radha Priya Dasi', guide: 'Gopinath Das', interests: ['Deity Seva', 'Cooking'], avatar: 'P' },
    ];

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            {DEVOTEES.map((dev, i) => (
                <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Avatar initials={dev.avatar} size={48} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{dev.spName}</div>
                            <div style={{ fontSize: 13, color: C.text3 }}>{dev.name}</div>
                            <div style={{ fontSize: 12, color: C.saffron, marginTop: 4 }}>Guide: HG {dev.guide}</div>
                        </div>
                    </div>
                    <button style={{ background: C.saffronLight, color: C.saffron, padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 600 }}>
                        Take Shelter 🙏
                    </button>
                </Card>
            ))}
        </div>
    );
}

function CalendarTab() {
    const FESTIVALS = [
        { name: 'Gaura Purnima', date: 'March 23, 2026', type: 'Festival' },
        { name: 'Rama Navami', date: 'April 6, 2026', type: 'Festival' },
        { name: 'Nrisimha Chaturdasi', date: 'May 20, 2026', type: 'Festival' }
    ];

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            <h3 className="title-font" style={{ color: C.gold }}>Vaishnava Calendar</h3>
            {FESTIVALS.map((fest, i) => (
                <Card key={i} style={{ borderLeft: `4px solid ${C.saffron}` }}>
                    <div style={{ fontWeight: 'bold' }}>{fest.name}</div>
                    <div style={{ color: C.text3, fontSize: 13, marginTop: 4 }}>{fest.date}</div>
                </Card>
            ))}
        </div>
    );
}

function ReelsTab() {
    return (
        <div style={{ height: '60vh', background: C.surface, borderRadius: C.radius, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
            <div>
                <Video size={48} color={C.text3} style={{ marginBottom: 16 }} />
                <h3 className="title-font">Reels (Demo)</h3>
                <p style={{ color: C.text2, fontSize: 14 }}>Swipe up for next short kirtan clip.</p>
            </div>
        </div>
    );
}

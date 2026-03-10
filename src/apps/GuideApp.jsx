import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { C } from '../theme';
import { LayoutDashboard, Users, Calendar, Flame, BookOpen, LogOut } from 'lucide-react';

import GuideConsole from '../screens/Guide/GuideConsole';
import GuideMentees from '../screens/Guide/GuideMentees';
import GuideEvents from '../screens/Guide/GuideEvents';
import GuideSadhana from '../screens/Guide/GuideSadhana';
import GuideSankirtan from '../screens/Guide/GuideSankirtan';

const NAV = [
    { path: '/guide/console', icon: LayoutDashboard, label: 'Console', emoji: '🎛️' },
    { path: '/guide/mentees', icon: Users, label: 'My Folks', emoji: '👥' },
    { path: '/guide/events', icon: Calendar, label: 'Events', emoji: '📅' },
    { path: '/guide/sadhana', icon: Flame, label: 'Sadhana', emoji: '📿' },
    { path: '/guide/sankirtan', icon: BookOpen, label: 'Sankirtan', emoji: '📖' },
];

export default function GuideApp() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>

            {/* ── Desktop Sidebar ── */}
            <div className="guide-sidebar" style={{
                width: 260, background: '#1a0505',
                borderRight: `1px solid ${C.gold}`,
                display: 'flex', flexDirection: 'column', color: C.text,
                position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
            }}>
                {/* Header */}
                <div style={{ padding: '24px 24px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, color: C.text3, letterSpacing: 2, marginBottom: 4 }}>FOLK</div>
                    <h2 className="title-font" style={{ color: C.saffron, margin: 0, fontSize: 22 }}>Guide Console</h2>
                    <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>FOLK-Vizag-Students</div>
                </div>

                {/* Nav items */}
                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {NAV.map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                background: active ? `rgba(255,159,28,0.12)` : 'transparent',
                                color: active ? C.saffron : C.text2,
                                borderRadius: C.radius, cursor: 'pointer',
                                fontWeight: active ? 700 : 400, fontSize: 14,
                                borderLeft: active ? `3px solid ${C.saffron}` : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}>
                                <Icon size={18} /> {n.label}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div style={{ padding: 16, borderTop: `1px solid ${C.border}` }}>
                    <div onClick={() => navigate('/app/home')} style={{
                        display: 'flex', gap: 10, alignItems: 'center', fontSize: 13,
                        color: C.text3, cursor: 'pointer', padding: '8px 12px', borderRadius: C.radius,
                    }}>
                        <LogOut size={16} /> Back to FOLK Feed
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>

                {/* Mobile top bar */}
                <div className="guide-mobile-nav" style={{
                    background: '#1a0505', borderBottom: `1px solid ${C.gold}`,
                    padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    position: 'sticky', top: 0, zIndex: 100,
                }}>
                    <h2 className="title-font" style={{ color: C.saffron, margin: 0, fontSize: 18 }}>Guide Console</h2>
                    <LogOut size={20} color={C.text3} onClick={() => navigate('/app/home')} style={{ cursor: 'pointer' }} />
                </div>

                <Routes>
                    <Route path="/console" element={<GuideConsole />} />
                    <Route path="/mentees" element={<GuideMentees />} />
                    <Route path="/events" element={<GuideEvents />} />
                    <Route path="/sadhana" element={<GuideSadhana />} />
                    <Route path="/sankirtan" element={<GuideSankirtan />} />
                    <Route path="*" element={<GuideConsole />} />
                </Routes>
            </div>

            {/* ── Mobile Bottom Tab ── */}
            <div className="guide-mobile-nav" style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                background: '#1a0505', borderTop: `1px solid ${C.gold}`,
                display: 'flex', justifyContent: 'space-around',
                padding: '8px 0 16px 0', zIndex: 200,
            }}>
                {NAV.map(n => {
                    const active = location.pathname.startsWith(n.path);
                    return (
                        <button key={n.path} onClick={() => navigate(n.path)} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: active ? C.gold : C.text3,
                        }}>
                            <span style={{ fontSize: 20 }}>{n.emoji}</span>
                            <span style={{ fontSize: 10, fontWeight: active ? 'bold' : 'normal' }}>{n.label}</span>
                        </button>
                    );
                })}
            </div>

            <style>{`
        @media (max-width: 768px) { .guide-sidebar { display: none !important; } }
        @media (min-width: 769px) { .guide-mobile-nav { display: none !important; } }
      `}</style>
        </div>
    );
}

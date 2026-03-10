import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { C } from '../theme';
import { LayoutDashboard, Users, Calendar, Flame, Book, Menu } from 'lucide-react';

import GuideConsole from '../screens/Guide/GuideConsole';
import GuideMentees from '../screens/Guide/GuideMentees';
import GuideEvents from '../screens/Guide/GuideEvents';
import GuideSadhana from '../screens/Guide/GuideSadhana';
import GuideSankirtan from '../screens/Guide/GuideSankirtan';

export default function GuideApp() {
    const navigate = useNavigate();
    const location = useLocation();

    const NAV = [
        { path: '/guide/console', icon: LayoutDashboard, label: 'Seva Console' },
        { path: '/guide/mentees', icon: Users, label: 'My Folks' },
        { path: '/guide/events', icon: Calendar, label: 'Events' },
        { path: '/guide/sadhana', icon: Flame, label: 'Sadhana' },
        { path: '/guide/sankirtan', icon: Book, label: 'Sankirtan' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
            {/* Desktop Sidebar (hidden on mobile, assumed responsive CSS class would do it, using inline for demo) */}
            <div className="guide-sidebar" style={{
                width: 260, background: '#1a0505', borderRight: `1px solid ${C.gold}`,
                display: 'flex', flexDirection: 'column', color: C.text
            }}>
                <div style={{ padding: 24, borderBottom: `1px solid ${C.border}` }}>
                    <h2 className="title-font" style={{ color: C.saffron }}>Guide Console</h2>
                    <div style={{ fontSize: 13, color: C.gold, marginTop: 4 }}>FOLK-Vizag-Students</div>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {NAV.map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                background: active ? 'rgba(244,196,48,0.1)' : 'transparent',
                                color: active ? C.gold : C.text2,
                                borderRadius: C.radius, cursor: 'pointer', fontWeight: active ? 'bold' : 'normal'
                            }}>
                                <Icon size={20} /> {n.label}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ flex: 1, paddingBottom: 80, overflowY: 'auto', position: 'relative' }}>
                <Routes>
                    <Route path="/console" element={<GuideConsole />} />
                    <Route path="/mentees" element={<GuideMentees />} />
                    <Route path="/events" element={<GuideEvents />} />
                    <Route path="/sadhana" element={<GuideSadhana />} />
                    <Route path="/sankirtan" element={<GuideSankirtan />} />
                    <Route path="*" element={<GuideConsole />} />
                </Routes>

                {/* Mobile Bottom Tab */}
                <div className="guide-mobile-nav" style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: '#1a0505', borderTop: `1px solid ${C.gold}`,
                    display: 'flex', justifyContent: 'space-around', padding: '12px 0 24px 0',
                    zIndex: 100
                }}>
                    {NAV.slice(0, 5).map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                                color: active ? C.gold : C.text3
                            }}>
                                <Icon size={24} style={{ marginBottom: 4 }} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 768px) { .guide-sidebar { display: none !important; } }
        @media (min-width: 769px) { .guide-mobile-nav { display: none !important; } }
      `}} />
        </div>
    );
}

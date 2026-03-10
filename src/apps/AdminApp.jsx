import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { C } from '../theme';
import { LayoutDashboard, Calendar, Users, Settings, Lock, MapPin, Ticket, Layers, LogOut } from 'lucide-react';

import AdminDashboard from '../screens/Admin/AdminDashboard';
import AdminEvents from '../screens/Admin/AdminEvents';
import AdminDevotees from '../screens/Admin/AdminDevotees';
import AdminSandbox from '../screens/Admin/AdminSandbox';
import AdminConfig from '../screens/Admin/AdminConfig';

const NAV = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', emoji: '📊' },
    { path: '/admin/events', icon: Calendar, label: 'Events', emoji: '📅' },
    { path: '/admin/devotees', icon: Users, label: 'Devotees', emoji: '👥' },
    { path: '/admin/residencies', icon: MapPin, label: 'Residencies', emoji: '🏛️' },
    { path: '/admin/coupons', icon: Ticket, label: 'Coupons', emoji: '🎫' },
    { path: '/admin/config', icon: Settings, label: 'Config', emoji: '⚙️' },
    { path: '/admin/sandbox', icon: Lock, label: 'Sandbox', emoji: '🔒' },
];

export default function AdminApp() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>

            {/* ── Desktop Sidebar ── */}
            <div className="admin-sidebar" style={{
                width: 280, background: '#100800',
                borderRight: `1px solid ${C.gold}`,
                display: 'flex', flexDirection: 'column', color: C.text,
                position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
            }}>
                <div style={{ padding: '24px 24px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, color: C.text3, letterSpacing: 2, marginBottom: 4 }}>ISKCON VISAKHAPATNAM</div>
                    <h2 className="title-font" style={{ color: C.gold, margin: 0, fontSize: 22 }}>FOLK Admin</h2>
                    <div style={{ fontSize: 12, color: C.saffron, marginTop: 4 }}>Head / Administrative Panel</div>
                </div>

                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                    {NAV.map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
                                background: active ? `rgba(244,196,48,0.12)` : 'transparent',
                                color: active ? C.gold : C.text2,
                                borderRadius: C.radius, cursor: 'pointer',
                                fontWeight: active ? 700 : 400, fontSize: 14,
                                borderLeft: active ? `3px solid ${C.gold}` : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}>
                                <Icon size={18} /> {n.label}
                            </div>
                        );
                    })}
                </div>

                {/* Separator + links */}
                <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div onClick={() => navigate('/guide/console')} style={{
                        display: 'flex', gap: 10, alignItems: 'center', fontSize: 13,
                        color: C.saffron, cursor: 'pointer', padding: '8px 12px', borderRadius: C.radius,
                    }}>
                        🎛️ Guide Console
                    </div>
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
                <div className="admin-mobile-nav" style={{
                    background: '#100800', borderBottom: `1px solid ${C.gold}`,
                    padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    position: 'sticky', top: 0, zIndex: 100,
                }}>
                    <h2 className="title-font" style={{ color: C.gold, margin: 0, fontSize: 18 }}>FOLK Admin</h2>
                    <LogOut size={20} color={C.text3} onClick={() => navigate('/app/home')} style={{ cursor: 'pointer' }} />
                </div>

                <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/events" element={<AdminEvents />} />
                    <Route path="/devotees" element={<AdminDevotees />} />
                    <Route path="/sandbox" element={<AdminSandbox />} />
                    <Route path="/config" element={<AdminConfig />} />
                    <Route path="*" element={<AdminDashboard />} />
                </Routes>
            </div>

            {/* ── Mobile Bottom Tab ── */}
            <div className="admin-mobile-nav" style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                background: '#100800', borderTop: `1px solid ${C.gold}`,
                display: 'flex', justifyContent: 'space-around',
                padding: '8px 0 16px 0', zIndex: 200,
                overflowX: 'auto',
            }}>
                {NAV.slice(0, 5).map(n => {
                    const active = location.pathname.startsWith(n.path);
                    return (
                        <button key={n.path} onClick={() => navigate(n.path)} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: active ? C.gold : C.text3, minWidth: 52,
                        }}>
                            <span style={{ fontSize: 20 }}>{n.emoji}</span>
                            <span style={{ fontSize: 9, fontWeight: active ? 'bold' : 'normal' }}>{n.label}</span>
                        </button>
                    );
                })}
            </div>

            <style>{`
        @media (max-width: 768px) { .admin-sidebar { display: none !important; } }
        @media (min-width: 769px) { .admin-mobile-nav { display: none !important; } }
      `}</style>
        </div>
    );
}

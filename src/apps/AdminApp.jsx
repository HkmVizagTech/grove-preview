import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { C } from '../theme';
import { LayoutDashboard, Calendar, Users, Briefcase, Book, Settings, Layers, Lock, MapPin, Ticket } from 'lucide-react';

import AdminDashboard from '../screens/Admin/AdminDashboard';
import AdminEvents from '../screens/Admin/AdminEvents';
import AdminDevotees from '../screens/Admin/AdminDevotees';
import AdminSandbox from '../screens/Admin/AdminSandbox';
import AdminConfig from '../screens/Admin/AdminConfig';

export default function AdminApp() {
    const navigate = useNavigate();
    const location = useLocation();

    const NAV = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dash' },
        { path: '/admin/events', icon: Calendar, label: 'Events' },
        { path: '/admin/devotees', icon: Users, label: 'Devotees' },
        { path: '/admin/batches', icon: Layers, label: 'Batches' },
        { path: '/admin/residencies', icon: MapPin, label: 'Residencies' },
        { path: '/admin/coupons', icon: Ticket, label: 'Coupons' },
        { path: '/admin/config', icon: Settings, label: 'Config' },
        { path: '/admin/sandbox', icon: Lock, label: 'Sandbox' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
            {/* Desktop Sidebar */}
            <div className="admin-sidebar" style={{
                width: 280, background: '#1c1004', borderRight: `1px solid ${C.gold}`,
                display: 'flex', flexDirection: 'column', color: C.text
            }}>
                <div style={{ padding: 24, borderBottom: `1px solid ${C.border}` }}>
                    <h2 className="title-font" style={{ color: C.saffron }}>FOLK Admin</h2>
                    <div style={{ fontSize: 13, color: C.gold, marginTop: 4 }}>ISKCON Visakhapatnam</div>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                    {NAV.map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                                background: active ? 'rgba(244,196,48,0.1)' : 'transparent',
                                color: active ? C.gold : C.text2,
                                borderRadius: C.radius, cursor: 'pointer', fontWeight: active ? 'bold' : 'normal',
                                fontSize: 14
                            }}>
                                <Icon size={18} /> {n.label}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ flex: 1, paddingBottom: 60, overflowY: 'auto', position: 'relative' }}>
                <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/events" element={<AdminEvents />} />
                    <Route path="/devotees" element={<AdminDevotees />} />
                    <Route path="/sandbox" element={<AdminSandbox />} />
                    <Route path="/config" element={<AdminConfig />} />
                    <Route path="*" element={<AdminDashboard />} />
                </Routes>

                {/* Mobile Top Nav */}
                <div className="admin-mobile-nav" style={{
                    position: 'sticky', top: 0, left: 0, right: 0,
                    background: '#1c1004', borderBottom: `1px solid ${C.gold}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px',
                    zIndex: 100
                }}>
                    <h2 className="title-font" style={{ color: C.saffron, margin: 0, fontSize: 18 }}>FOLK Admin</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <Calendar color={C.saffron} onClick={() => navigate('/admin/events')} />
                        <Users color={C.saffron} onClick={() => navigate('/admin/devotees')} />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 768px) { .admin-sidebar { display: none !important; } }
        @media (min-width: 769px) { .admin-mobile-nav { display: none !important; } }
      `}} />
        </div>
    );
}

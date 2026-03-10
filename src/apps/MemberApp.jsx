import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { C } from '../theme';
import { UserContext } from '../App';

// Import all member screens
import HomeFeed from '../screens/Member/HomeFeed';
import Sadhana from '../screens/Member/Sadhana';
import Explore from '../screens/Member/Explore';
import PostComposer from '../screens/Member/PostComposer';
import Profile from '../screens/Member/Profile';
import Events from '../screens/Member/Events';
import Sankirtan from '../screens/Member/Sankirtan';
import Courses from '../screens/Member/Courses';
import Trips from '../screens/Member/Trips';
import Residencies from '../screens/Member/Residencies';
import Coupons from '../screens/Member/Coupons';
import QRScanner from '../screens/Member/QRScanner';
import AttendanceHistory from '../screens/Member/AttendanceHistory';
import Notifications from '../screens/Member/Notifications';

// Icons (emoji-based for simplicity, no import errors)
const BOTTOM_NAV = [
    { path: '/app/home', emoji: '🏠', label: 'Home' },
    { path: '/app/explore', emoji: '🔍', label: 'Explore' },
    { path: '/app/post', emoji: '➕', label: 'Post' },
    { path: '/app/features', emoji: '⚡', label: 'Features' },
    { path: '/app/profile', emoji: '👤', label: 'Profile' },
];

// All feature tiles for the "Features" tab
const FEATURES = [
    { emoji: '📿', label: 'Sadhana Tracker', path: '/app/sadhana' },
    { emoji: '📅', label: 'Events & Festivals', path: '/app/events' },
    { emoji: '📖', label: 'Sankirtan Log', path: '/app/sankirtan' },
    { emoji: '🎓', label: 'Shiksha Courses', path: '/app/courses' },
    { emoji: '🎫', label: 'Coupon Wallet', path: '/app/coupons' },
    { emoji: '🚌', label: 'Trips & Yatras', path: '/app/trips' },
    { emoji: '🏛️', label: 'Ashram Stay', path: '/app/residencies' },
    { emoji: '📷', label: 'Scan QR', path: '/app/scan' },
    { emoji: '📋', label: 'Attendance', path: '/app/attendance' },
];

function FeaturesTab() {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
            {/* Spiritual greeting */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'Tiro Devanagari Sanskrit', fontSize: 22, color: C.saffron }}>
                    हरे कृष्ण, {user?.name?.split(' ')[0] || 'Devotee'} 🙏
                </div>
                <div style={{ fontSize: 14, color: C.text3, marginTop: 4 }}>All FOLK Features</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {FEATURES.map(f => (
                    <div
                        key={f.path}
                        onClick={() => navigate(f.path)}
                        style={{
                            background: C.surface,
                            border: `1px solid ${C.border}`,
                            borderRadius: C.radius,
                            padding: '20px 12px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                            cursor: 'pointer', textAlign: 'center',
                            transition: 'border-color 0.2s, transform 0.2s',
                            boxShadow: C.shadow,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.saffron; e.currentTarget.style.transform = 'scale(1.04)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <div style={{ fontSize: 32 }}>{f.emoji}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text2, lineHeight: 1.3 }}>{f.label}</div>
                    </div>
                ))}
            </div>

            {/* Role switcher quick links */}
            {user && ['admin', 'head'].includes(user.role) && (
                <div style={{ marginTop: 32 }}>
                    <div style={{ fontSize: 13, color: C.text3, marginBottom: 12 }}>Switch Interface</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => navigate('/guide/console')}
                            style={{ flex: 1, padding: '10px 0', background: C.saffronLight, color: C.saffron, borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid ${C.saffron}` }}>
                            Guide Console
                        </button>
                        <button onClick={() => navigate('/admin/dashboard')}
                            style={{ flex: 1, padding: '10px 0', background: C.goldLight, color: C.gold, borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid ${C.gold}` }}>
                            Admin Dashboard
                        </button>
                    </div>
                </div>
            )}
            {user && user.role === 'guide' && (
                <div style={{ marginTop: 32 }}>
                    <div style={{ fontSize: 13, color: C.text3, marginBottom: 12 }}>Switch Interface</div>
                    <button onClick={() => navigate('/guide/console')}
                        style={{ width: '100%', padding: '10px 0', background: C.saffronLight, color: C.saffron, borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid ${C.saffron}` }}>
                        Open Guide Console →
                    </button>
                </div>
            )}
        </div>
    );
}


export default function MemberApp() {
    const navigate = useNavigate();
    const location = useLocation();

    const hideNav = ['/app/scan', '/app/post'].includes(location.pathname);
    const activeTab = BOTTOM_NAV.find(n => location.pathname.startsWith(n.path));

    return (
        <div style={{ paddingBottom: hideNav ? 0 : 72, minHeight: '100vh', background: C.bg, color: C.text }}>
            <Routes>
                <Route path="/home" element={<HomeFeed />} />
                <Route path="/sadhana" element={<Sadhana />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/post" element={<PostComposer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sankirtan" element={<Sankirtan />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/residencies" element={<Residencies />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/scan" element={<QRScanner />} />
                <Route path="/attendance" element={<AttendanceHistory />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/features" element={<FeaturesTab />} />
                <Route path="*" element={<HomeFeed />} />
            </Routes>

            {/* Bottom Tab Bar */}
            {!hideNav && (
                <nav style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: C.surface,
                    borderTop: `1px solid ${C.border}`,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '8px 0 16px 0',
                    zIndex: 200,
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
                }}>
                    {BOTTOM_NAV.map(n => {
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <button
                                key={n.path}
                                onClick={() => navigate(n.path)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: active ? C.saffron : C.text3,
                                    padding: '4px 12px',
                                    position: 'relative',
                                }}
                            >
                                {active && (
                                    <div style={{
                                        position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                                        width: 32, height: 3, background: C.saffron, borderRadius: 2,
                                    }} />
                                )}
                                <span style={{ fontSize: n.path === '/app/post' ? 28 : 22 }}>
                                    {n.path === '/app/post'
                                        ? <span style={{ display: 'block', width: 40, height: 40, background: C.gradient, borderRadius: '50%', lineHeight: '40px', textAlign: 'center', boxShadow: C.shadowMd }}>➕</span>
                                        : n.emoji}
                                </span>
                                <span style={{ fontSize: 10, fontWeight: active ? 'bold' : 'normal' }}>
                                    {n.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}

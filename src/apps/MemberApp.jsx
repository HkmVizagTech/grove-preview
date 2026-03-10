import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, PlusSquare, Bell, User, Camera, Calendar, BookOpen, GraduationCap, Plane, MapPin, Grid, Ticket } from 'lucide-react';
import { C } from '../theme';

// Import screens (to be created)
import HomeFeed from '../screens/Member/HomeFeed';
import Sadhana from '../screens/Member/Sadhana';
import Explore from '../screens/Member/Explore';
import PostComposer from '../screens/Member/PostComposer';
import Notifications from '../screens/Member/Notifications';
import Profile from '../screens/Member/Profile';
import Events from '../screens/Member/Events';
import Sankirtan from '../screens/Member/Sankirtan';
import Courses from '../screens/Member/Courses';
import Trips from '../screens/Member/Trips';
import Residencies from '../screens/Member/Residencies';
import Coupons from '../screens/Member/Coupons';
import QRScanner from '../screens/Member/QRScanner';

export default function MemberApp() {
    const navigate = useNavigate();
    const location = useLocation();

    const NAV = [
        { path: '/app/home', icon: Home, label: 'Home' },
        { path: '/app/explore', icon: Compass, label: 'Explore' },
        { path: '/app/post', icon: PlusSquare, label: 'Share' },
        { path: '/app/notifications', icon: Bell, label: 'Alerts' },
        { path: '/app/profile', icon: User, label: 'Profile' },
    ];

    const hideNav = ['/app/scan', '/app/post'].includes(location.pathname);

    return (
        <div style={{ paddingBottom: hideNav ? 0 : 80, minHeight: '100vh' }}>
            <Routes>
                <Route path="/home" element={<HomeFeed />} />
                <Route path="/sadhana" element={<Sadhana />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/post" element={<PostComposer />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sankirtan" element={<Sankirtan />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/residencies" element={<Residencies />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/scan" element={<QRScanner />} />
                {/* Default fallback */}
                <Route path="*" element={<HomeFeed />} />
            </Routes>

            {!hideNav && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: C.surface, borderTop: `1px solid ${C.border}`,
                    display: 'flex', justifyContent: 'space-around', padding: '12px 0 24px 0',
                    zIndex: 100
                }}>
                    {NAV.map(n => {
                        const Icon = n.icon;
                        const active = location.pathname.startsWith(n.path);
                        return (
                            <div key={n.path} onClick={() => navigate(n.path)} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                                color: active ? C.saffron : C.text3
                            }}>
                                <Icon size={24} style={{ marginBottom: 4 }} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

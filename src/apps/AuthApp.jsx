import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { C } from '../theme';
import { Card, PrimaryBtn, OmWatermark } from '../UI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthApp() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (!identifier || !password) return setError("Please enter email and password");
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/auth/login', { email: identifier, password });
            const { token, user } = res.data;
            localStorage.setItem('folk_token', token);
            setUser(user);

            if (["admin", "head", "folk_admin"].includes(user.role)) navigate("/admin/dashboard");
            else if (["guide", "folk_guide"].includes(user.role)) navigate("/guide/console");
            else if (user.role === "security") navigate("/security/scan");
            else navigate("/app/home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 60, background: C.bg }}>
            <Card style={{ width: '100%', maxWidth: 400 }}>
                <OmWatermark />
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ color: C.saffron, margin: 0, fontSize: 32 }} className="app-name">FOLK</h1>
                    <p style={{ color: C.text2, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Hare Krishna Movement Vizag</p>
                </div>

                {error && (
                    <div style={{ padding: '12px 16px', background: `${C.lotus}15`, color: C.lotus, borderRadius: C.radius, fontSize: 13, marginBottom: 24, border: `1px solid ${C.lotus}33` }}>
                        {error}
                    </div>
                )}

                <div>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: 13, color: C.text3 }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: `2px solid ${C.saffron}`, fontSize: 16, background: 'transparent', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <label style={{ fontSize: 13, color: C.text3 }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: `2px solid ${C.saffron}`, fontSize: 16, background: 'transparent', outline: 'none' }}
                        />
                    </div>

                    <PrimaryBtn onClick={handleLogin}>{loading ? 'Logging in...' : 'Sign In'}</PrimaryBtn>
                </div>

                <div style={{ marginTop: 40, fontSize: 11, color: C.text3, textAlign: 'center', fontStyle: 'italic' }}>
                    By joining, you agree to take shelter of <br />
                    the Hare Krishna Movement Visakhapatnam.
                    <br /><br />
                    <div style={{ opacity: 0.6 }}>
                        Authorized access for devotees only.
                    </div>
                </div>
            </Card>
        </div>
    );
}


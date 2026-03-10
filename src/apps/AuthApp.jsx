import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { C } from '../theme';
import { Card, PrimaryBtn, OmWatermark } from '../UI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthApp() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('member@folk-vizag.org');
    const [otp, setOtp] = useState('123456'); // Using OTP field for password right now
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Note: Our seed script uses `username` inside the db, not email.
            // But we seeded `username` with the email.
            const res = await axios.post('/api/auth/login', { username: email, password: otp });
            const { token, user } = res.data;
            localStorage.setItem('folk_token', token);
            setUser(user);

            if (["admin", "head"].includes(user.role)) navigate("/admin/dashboard");
            else if (user.role === "guide") navigate("/guide/console");
            else if (user.role === "security") navigate("/security/scan");
            else navigate("/app/home");
        } catch (err) {
            console.error(err);
            alert("Invalid credentials or server error");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 60 }}>
            <Card style={{ width: '100%', maxWidth: 400 }}>
                <OmWatermark />
                <h1 style={{ color: C.saffron, textAlign: 'center', marginBottom: 8 }} className="app-name">FOLK</h1>
                <p style={{ textAlign: 'center', color: C.text2, fontSize: 14 }}>Friends Of Lord Krishna</p>
                <div style={{ marginTop: 32 }}>
                    <label style={{ fontSize: 13, color: C.text3 }}>Email/Phone</label>
                    <input
                        type="text" value={email} onChange={e => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px 0', borderBottom: `2px solid ${C.saffron}`, marginBottom: 24 }}
                    />
                    <label style={{ fontSize: 13, color: C.text3 }}>OTP</label>
                    <input
                        type="text" value={otp} onChange={e => setOtp(e.target.value)}
                        style={{ width: '100%', padding: '12px 0', borderBottom: `2px solid ${C.saffron}`, marginBottom: 32 }}
                    />
                    <PrimaryBtn onClick={handleLogin}>{loading ? 'Authenticating...' : 'Jai Srila Prabhupada 🙏'}</PrimaryBtn>
                </div>

                <div style={{ marginTop: 24, fontSize: 12, color: C.text3, textAlign: 'center' }}>
                    Seed Users: <br />
                    member@folk-vizag.org | guide@folk-vizag.org | admin@folk-vizag.org
                </div>
            </Card>
        </div>
    );
}

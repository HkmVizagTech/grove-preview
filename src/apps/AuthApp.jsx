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
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Identifier, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequestOTP = async () => {
        if (!identifier) return setError("Please enter email or phone");
        setLoading(true);
        setError(null);
        try {
            await axios.post('/api/auth/otp/start', { identifier });
            setStep(2);

            // Fetch Dev OTP if in dev mode
            if (import.meta.env.VITE_API_URL?.includes('localhost')) {
                setTimeout(async () => {
                    try {
                        const res = await axios.get(`/api/dev/otp/${identifier}`);
                        if (res.data?.otp) {
                            alert(`DEV MODE: Your OTP is ${res.data.otp}`);
                            setOtp(res.data.otp);
                        }
                    } catch (e) {
                        console.log('Dev OTP fetch failed', e);
                    }
                }, 1000);
            }

        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
        }
        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        if (!otp) return setError("Please enter OTP");
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/auth/otp/verify', { identifier, otp });
            const { token, user } = res.data;
            localStorage.setItem('folk_token', token);
            setUser(user);

            if (["admin", "head", "folk_admin"].includes(user.role)) navigate("/admin/dashboard");
            else if (["guide", "folk_guide"].includes(user.role)) navigate("/guide/console");
            else if (user.role === "security") navigate("/security/scan");
            else navigate("/app/home");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
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

                {step === 1 ? (
                    <div>
                        <label style={{ fontSize: 13, color: C.text3 }}>Email or Phone Number</label>
                        <input
                            type="text"
                            placeholder="e.g. 9988776655"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: `2px solid ${C.saffron}`, marginBottom: 32, fontSize: 18, background: 'transparent', outline: 'none' }}
                        />
                        <PrimaryBtn onClick={handleRequestOTP}>{loading ? 'Sending...' : 'Get OTP'}</PrimaryBtn>
                    </div>
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <label style={{ fontSize: 13, color: C.text3 }}>Enter 6-digit OTP</label>
                            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: C.saffron, fontSize: 12, cursor: 'pointer' }}>Change</button>
                        </div>
                        <input
                            type="text"
                            placeholder="000000"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: `2px solid ${C.saffron}`, marginBottom: 32, fontSize: 24, textAlign: 'center', letterSpacing: 8, background: 'transparent', outline: 'none' }}
                        />
                        <PrimaryBtn onClick={handleVerifyOTP}>{loading ? 'Verifying...' : 'Jai Srila Prabhupada 🙏'}</PrimaryBtn>
                    </div>
                )}

                <div style={{ marginTop: 40, fontSize: 11, color: C.text3, textAlign: 'center', fontStyle: 'italic' }}>
                    By joining, you agree to take shelter of <br />
                    the Hare Krishna Movement Visakhapatnam.
                </div>
            </Card>
        </div>
    );
}


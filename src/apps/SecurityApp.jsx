import React, { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { C } from '../theme';
import { Card, Tag } from '../UI';
import { QrCode, LogOut, Search, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { UserContext } from '../App';

export default function SecurityApp() {
    return (
        <Routes>
            <Route path="/scan" element={<UniversalScanner />} />
            <Route path="*" element={<UniversalScanner />} />
        </Routes>
    );
}

function UniversalScanner() {
    const [scanState, setScanState] = useState('scanning'); // scanning, processing, matched, error
    const [scanData, setScanData] = useState(null);
    const [manualId, setManualId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('folk_token');
        localStorage.removeItem('folk_user');
        setUser(null);
        navigate('/login');
    };

    const processScan = async (id) => {
        if (!id) return;
        setLoading(true);
        setScanState('processing');
        const token = localStorage.getItem('folk_token');

        try {
            // First, find the devotee
            const res = await axios.get(`/api/community/devotees`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const devotees = res.data;
            const target = devotees.find(d => d._id === id || d.username === id);

            if (!target) {
                setScanState('error');
                setMessage('Devotee not found in system.');
                setLoading(false);
                return;
            }

            setScanData(target);
            setScanState('matched');
        } catch (err) {
            setScanState('error');
            setMessage('Server error during scan.');
        }
        setLoading(false);
    };

    const confirmAttendance = async (type = 'Daily') => {
        setLoading(true);
        const token = localStorage.getItem('folk_token');
        try {
            await axios.post('/api/attendance/check-in', {
                devoteeId: scanData._id,
                type: type,
                location: 'Main Gate'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-scanner-id': user?._id
                }
            });
            setScanState('success');
            setTimeout(() => {
                setScanState('scanning');
                setScanData(null);
                setManualId('');
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.message || 'Check-in failed');
            setScanState('scanning');
        }
        setLoading(false);
    };

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20, zIndex: 10, borderBottom: '1px solid #222' }}>
                <div>
                    <h2 className="title-font" style={{ color: C.saffron, margin: 0 }}>Security Desk</h2>
                    <div style={{ fontSize: 10, color: '#666' }}>Logged in as: {user?.name}</div>
                </div>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.lotus }}>
                    <LogOut size={20} />
                </button>
            </div>

            {scanState === 'scanning' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{
                        width: 280, height: 280, border: `4px dashed ${C.green}`,
                        borderRadius: 32, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                            background: C.green, boxShadow: '0 0 15px #4ade80',
                            animation: 'scanLine 2s infinite ease-in-out'
                        }} />
                        <QrCode size={80} color={C.green} opacity={0.5} />
                    </div>

                    <p style={{ marginTop: 32, fontSize: 16, color: '#888' }}>Ready to Scan Pass</p>

                    <div style={{ marginTop: 40, width: '100%', maxWidth: 300 }}>
                        <div style={{ fontSize: 11, color: '#555', marginBottom: 8, textAlign: 'center' }}>MANUAL ENTRY (FOR DEMO)</div>
                        <div style={{ position: 'relative' }}>
                            <input
                                value={manualId}
                                onChange={e => setManualId(e.target.value)}
                                placeholder="Enter Devotee ID or Username"
                                style={{
                                    width: '100%', padding: '12px 16px', background: '#1a1a1a',
                                    border: '1px solid #333', borderRadius: C.radius, color: '#fff'
                                }}
                            />
                            <button
                                onClick={() => processScan(manualId)}
                                style={{
                                    position: 'absolute', right: 8, top: 8, background: C.saffron,
                                    border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer'
                                }}
                            >
                                <Search size={16} color="#000" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {scanState === 'processing' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #333', borderTopColor: C.saffron, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <p style={{ marginTop: 16 }}>Validating Pass...</p>
                </div>
            )}

            {scanState === 'matched' && scanData && (
                <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ width: '100%', maxWidth: 400, textAlign: 'center', background: C.surface, color: C.text }}>
                        <div style={{
                            width: 80, height: 80, background: C.surface2, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px', fontSize: 24, fontWeight: 'bold'
                        }}>
                            {scanData.name[0]}
                        </div>
                        <h2 style={{ fontSize: 22, margin: '0 0 4px 0' }}>{scanData.spiritualName || scanData.name}</h2>
                        <div style={{ color: C.text3, fontSize: 14, marginBottom: 20 }}>{scanData.batch || 'General Batch'}</div>

                        <div style={{ background: C.surface2, padding: 16, borderRadius: C.radius, marginBottom: 24, textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 12, color: C.text3 }}>STATUS</span>
                                <Tag color={C.green}>ACTIVE PASS</Tag>
                            </div>
                            <div style={{ fontSize: 13, color: C.text2 }}>Role: {scanData.role}</div>
                            <div style={{ fontSize: 13, color: C.text2 }}>Center: {scanData.center || 'Main Center'}</div>
                        </div>

                        <div style={{ display: 'flex', gap: 12 }}>
                            <button
                                onClick={() => setScanState('scanning')}
                                style={{
                                    flex: 1, padding: '14px', background: '#333', color: '#fff',
                                    border: 'none', borderRadius: C.radius, fontWeight: 'bold'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => confirmAttendance('Daily')}
                                disabled={loading}
                                style={{
                                    flex: 1, padding: '14px', background: C.green, color: '#fff',
                                    border: 'none', borderRadius: C.radius, fontWeight: 'bold'
                                }}
                            >
                                {loading ? 'Saving...' : 'Confirm ✅'}
                            </button>
                        </div>
                    </Card>
                </div>
            )}

            {scanState === 'success' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={80} color={C.green} />
                    <h2 style={{ marginTop: 16, color: C.green }}>Check-in Successful!</h2>
                </div>
            )}

            {scanState === 'error' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <XCircle size={80} color="#ef4444" />
                    <h2 style={{ marginTop: 16, color: '#ef4444' }}>Scan Error</h2>
                    <p style={{ color: '#888', textAlign: 'center' }}>{message}</p>
                    <button
                        onClick={() => setScanState('scanning')}
                        style={{ marginTop: 24, padding: '10px 24px', background: '#333', color: '#fff', border: 'none', borderRadius: C.radiusPill }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            <style>{`
                @keyframes scanLine {
                    0% { top: 0; }
                    50% { top: 280px; }
                    100% { top: 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

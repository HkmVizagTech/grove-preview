import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { C } from '../theme';
import { Card, PrimaryBtn, Tag } from '../UI';
import { QrCode, CheckCircle, XCircle, LogOut } from 'lucide-react';

export default function SecurityApp() {
    return (
        <Routes>
            <Route path="/scan" element={<UniversalScanner />} />
            <Route path="/scan-trip" element={<TripScanner />} />
            <Route path="*" element={<UniversalScanner />} />
        </Routes>
    );
}

function UniversalScanner() {
    const [scanState, setScanState] = useState('scanning'); // scanning, matched
    const navigate = useNavigate();

    useEffect(() => {
        if (scanState === 'scanning') {
            const t = setTimeout(() => setScanState('matched'), 2000);
            return () => clearTimeout(t);
        }
    }, [scanState]);

    return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 24, zIndex: 10 }}>
                <h2 className="title-font" style={{ color: C.saffron }}>Security Scanner</h2>
                <LogOut color={C.text} onClick={() => navigate('/login')} />
            </div>

            {scanState === 'scanning' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 300, height: 300, border: `4px dashed ${C.green}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <QrCode size={80} color={C.green} />
                    </div>
                    <p style={{ color: '#fff', marginTop: 24 }}>Scan Event, Ashram, or Trip Pass</p>
                </div>
            )}

            {scanState === 'matched' && (
                <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ width: '100%', maxWidth: 400, textAlign: 'center', background: C.surface, borderColor: C.saffron }}>
                        <div style={{ width: 80, height: 80, background: C.surface2, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
                            K
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Krishna Das</h2>
                        <div style={{ color: C.text3, marginBottom: 16 }}>Batch: FOLK-Vizag-Students</div>

                        <div style={{ background: C.surface2, padding: 16, borderRadius: C.radius, marginBottom: 24 }}>
                            <Tag color={C.green}>EVENT ENTRY</Tag>
                            <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>Mangala Arati Satsang</div>
                            <div style={{ fontSize: 13, color: C.text2, marginTop: 4 }}>Registered: Yes</div>
                        </div>

                        <div style={{ display: 'flex', gap: 16 }}>
                            <button
                                onClick={() => setScanState('scanning')}
                                style={{ flex: 1, padding: '16px 0', background: 'transparent', border: `2px solid #ef4444`, color: '#ef4444', borderRadius: C.radius, fontWeight: 'bold', fontSize: 18 }}>
                                Deny ❌
                            </button>
                            <button
                                onClick={() => setScanState('scanning')}
                                style={{ flex: 1, padding: '16px 0', background: C.green, color: '#fff', borderRadius: C.radius, fontWeight: 'bold', fontSize: 18 }}>
                                Allow ✅
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

function TripScanner() {
    return <div style={{ color: '#fff', padding: 24 }}>Trip Boarding Scanner</div>;
}

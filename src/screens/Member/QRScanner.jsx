import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, OmWatermark, Tag } from '../../UI';
import { QrCode, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QRScanner() {
    const navigate = useNavigate();
    const [scanState, setScanState] = useState('scanning'); // scanning, success, fail

    // Mock scanner
    useEffect(() => {
        if (scanState === 'scanning') {
            const timer = setTimeout(() => {
                setScanState('success');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanState]);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, zIndex: 10 }}>
                <X size={28} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: C.text }} />
                <h2 className="title-font" style={{ color: C.gold }}>FOLK Scanner</h2>
                <div style={{ width: 28 }} />
            </div>

            {scanState === 'scanning' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 280, height: 280, border: `4px dashed ${C.saffron}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 159, 28, 0.1)' }} />
                        <QrCode size={64} color={C.saffron} />
                    </div>
                    <div style={{ color: C.text3, marginTop: 24, fontSize: 16 }}>Scanning code...</div>

                    <div style={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center' }}>
                        <button style={{ color: C.text2, textDecoration: 'underline' }}>Enter code manually</button>
                    </div>
                </div>
            )}

            {scanState === 'success' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ textAlign: 'center', padding: 32, width: '100%', maxWidth: 320, borderColor: C.green }}>
                        <CheckCircle size={64} color={C.green} style={{ margin: '0 auto 16px auto' }} />
                        <h2 className="title-font" style={{ color: C.green, marginBottom: 8 }}>Scanned!</h2>
                        <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 16 }}>Mangala Arati Satsang</div>
                        <Tag color={C.green}>Present (On Time)</Tag>
                        <div style={{ marginTop: 24, fontSize: 13, color: C.text3 }}>Attendance marked successfully.</div>

                        <PrimaryBtn onClick={() => navigate('/app/home')} style={{ marginTop: 24 }}>Done</PrimaryBtn>
                        <button onClick={() => setScanState('scanning')} style={{ marginTop: 16, color: C.text2 }}>Scan Again</button>
                    </Card>
                </div>
            )}
        </div>
    );
}

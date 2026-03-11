import React, { useState, useContext } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { X, CheckCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function QRScanner() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [scanState, setScanState] = useState('scanning'); // scanning, processing, success
    const [loading, setLoading] = useState(false);

    const handleSelfCheckIn = async (data) => {
        // Prevent multiple fires
        if (scanState !== 'scanning') return;

        setLoading(true);
        setScanState('processing');
        const token = localStorage.getItem('folk_token');
        try {
            // Depending on architecture, we assume member is scanning a booth QR code,
            // or another devotee's QR code (if they have permissions). 
            // In either case, we send the checkin request based on their identity right now.
            await axios.post('/api/attendance/check-in', {
                devoteeId: user?.id,
                type: 'Daily',
                location: data || 'Self Scan Booth'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setScanState('success');
        } catch (err) {
            alert(err.response?.data?.message || 'Check-in failed');
            setScanState('scanning');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, zIndex: 10 }}>
                <X size={28} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: C.text }} />
                <h2 className="title-font" style={{ color: C.gold }}>Self Check-in Scanner</h2>
                <div style={{ width: 28 }} />
            </div>

            {scanState === 'scanning' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                    <div style={{ width: 300, height: 300, borderRadius: 24, overflow: 'hidden', border: `4px dashed ${C.saffron}`, position: 'relative' }}>
                        <Scanner
                            onScan={(result) => handleSelfCheckIn(result[0]?.rawValue || result)}
                            formats={['qr_code']}
                            components={{ audio: false, finder: false }}
                            styles={{ container: { width: '100%', height: '100%' } }}
                        />
                    </div>

                    <div style={{ color: C.text3, marginTop: 24, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Camera size={20} color={C.saffron} />
                        Point at Booth QR Code
                    </div>

                    <div style={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center' }}>
                        <PrimaryBtn onClick={() => handleSelfCheckIn('Manual Override')} style={{ width: '80%', background: C.surface2, color: C.text }}>
                            Skip & Trigger Check-in Manually
                        </PrimaryBtn>
                    </div>
                </div>
            )}

            {scanState === 'processing' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #333', borderTopColor: C.saffron, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <p style={{ marginTop: 16, color: C.text2 }}>Recording check-in...</p>
                </div>
            )}

            {scanState === 'success' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ textAlign: 'center', padding: 32, width: '100%', maxWidth: 320, borderColor: C.green }}>
                        <CheckCircle size={64} color={C.green} style={{ margin: '0 auto 16px auto' }} />
                        <h2 className="title-font" style={{ color: C.green, marginBottom: 8 }}>Success!</h2>
                        <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 16 }}>Check-in Recorded</div>
                        <Tag color={C.green}>Present</Tag>
                        <div style={{ marginTop: 24, fontSize: 13, color: C.text3 }}>Your attendance has been updated in real-time.</div>

                        <PrimaryBtn onClick={() => navigate('/app/attendance')} style={{ marginTop: 24 }}>View History</PrimaryBtn>
                        <button onClick={() => setScanState('scanning')} style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: C.text3, marginTop: 12, fontWeight: 'bold', cursor: 'pointer' }}>
                            Scan Again
                        </button>
                    </Card>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

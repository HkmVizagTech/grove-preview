import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, Tag, OmWatermark } from '../../UI';
import { QrCode, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createSocket } from '../../api';

export default function Coupons() {
    const [tab, setTab] = useState('Active');
    const [coupons, setCoupons] = useState([]);
    const [socket, setSocket] = useState(null);
    const TABS = ['Active', 'History'];
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (token) {
            axios.get('/api/coupons', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setCoupons(res.data))
                .catch(err => console.error(err));
        }

        const newSocket = createSocket();
        setSocket(newSocket);

        newSocket.on('new_coupon', (coupon) => {
            setCoupons(prev => [coupon, ...prev]);
        });

        newSocket.on('coupon_used', (coupon) => {
            setCoupons(prev => prev.map(c => c._id === coupon._id ? coupon : c));
        });

        return () => newSocket.close();
    }, []);

    const activeCoupons = coupons.filter(c => !c.isUsed);
    const historyCoupons = coupons.filter(c => c.isUsed);

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold, margin: 0 }}>Coupon Wallet</h2>
                <Ticket color={C.saffron} />
            </div>

            <div style={{ display: 'flex', gap: 16, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
                {TABS.map(t => (
                    <div key={t} onClick={() => setTab(t)} style={{
                        paddingBottom: 12, fontWeight: 'bold', cursor: 'pointer',
                        color: tab === t ? C.saffron : C.text3,
                        borderBottom: tab === t ? `2px solid ${C.saffron}` : 'none'
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            {tab === 'Active' && (
                <div style={{ display: 'grid', gap: 16 }}>
                    {activeCoupons.length === 0 && <p style={{ color: C.text3, textAlign: 'center' }}>No active coupons.</p>}
                    {activeCoupons.map(c => (
                        <CouponCard key={c._id} type={c.type} event={c.event} code={c.code} expiry={`Valid until ${new Date(c.expiryDate).toLocaleDateString()}`} color={c.type === 'Prasadam' ? C.green : C.saffron} isUsed={c.isUsed} />
                    ))}
                </div>
            )}

            {tab === 'History' && (
                <div style={{ display: 'grid', gap: 16 }}>
                    {historyCoupons.length === 0 && <p style={{ color: C.text3, textAlign: 'center' }}>No past coupons.</p>}
                    {historyCoupons.map(c => (
                        <CouponCard key={c._id} type={c.type} event={c.event} code={c.code} expiry={`Used on ${new Date(c.updatedAt || c.expiryDate).toLocaleDateString()}`} color={C.surface2} isUsed={c.isUsed} />
                    ))}
                </div>
            )}
        </div>
    );
}

function CouponCard({ type, event, code, expiry, color, isUsed }) {
    return (
        <Card style={{ padding: 0, overflow: 'hidden', border: `1px solid ${C.border}` }} className="card-decoration">
            <OmWatermark />
            <div style={{ background: color, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', color: isUsed ? C.text2 : '#000' }}>{type} Coupon</div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: C.radiusPill, fontSize: 12, color: '#fff' }}>
                    {isUsed ? 'Used' : 'Unused'}
                </div>
            </div>

            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: 18, marginBottom: 4 }}>{event}</h3>
                    <div style={{ color: C.text3, fontSize: 13, marginBottom: 16 }}>{expiry} • HKM Vizag</div>

                    <div style={{ fontFamily: 'monospace', letterSpacing: 4, fontSize: 16, fontWeight: 'bold', background: C.surface2, padding: '8px 12px', borderRadius: C.radius, display: 'inline-block' }}>
                        {code}
                    </div>
                </div>

                <div style={{ width: 80, height: 80, background: C.surface2, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={48} color={C.text} />
                </div>
            </div>
        </Card>
    );
}

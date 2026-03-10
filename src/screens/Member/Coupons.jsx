import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, Tag, OmWatermark } from '../../UI';
import { QrCode, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Coupons() {
    const [tab, setTab] = useState('Active');
    const TABS = ['Active', 'History'];
    const navigate = useNavigate();

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold }}>Coupon Wallet</h2>
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
                    <CouponCard
                        type="Prasadam" event="Sunday Love Feast" code="PRSDM-X9W2"
                        expiry="Valid until March 15" color={C.green}
                    />
                    <CouponCard
                        type="Book Fest" event="Gita Marathon" code="BOKFS-L4P8"
                        expiry="Valid until April 10" color={C.saffron}
                    />
                </div>
            )}

            {tab === 'History' && (
                <div style={{ color: C.text3, textAlign: 'center', marginTop: 40 }}>
                    No past coupons.
                </div>
            )}
        </div>
    );
}

function CouponCard({ type, event, code, expiry, color }) {
    return (
        <Card style={{ padding: 0, overflow: 'hidden', border: `1px solid ${C.border}` }} className="card-decoration">
            <OmWatermark />
            <div style={{ background: color, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#000' }}>{type} Coupon</div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: C.radiusPill, fontSize: 12, color: '#fff' }}>Unused</div>
            </div>

            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: 18, marginBottom: 4 }}>{event}</h3>
                    <div style={{ color: C.text3, fontSize: 13, marginBottom: 16 }}>{expiry} • ISKCON Vizag</div>

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

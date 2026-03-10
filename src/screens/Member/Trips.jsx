import React from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Plane, Users, MapPin, Bus } from 'lucide-react';

export default function Trips() {
    const TRIPS = [
        { title: 'Simhachalam Darshan', dates: '12 Apr, 2026', type: 'Local', color: C.green, price: '₹200', registered: 45, cap: 50, status: 'Register' },
        { title: 'Vrindavan Yatra 2026', dates: '10-20 Nov, 2026', type: 'Yatra', color: C.saffron, price: '₹12,500', registered: 23, cap: 40, status: 'Waitlist' },
    ];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Trips & Yatras</h2>

            <div style={{ display: 'grid', gap: 16 }}>
                {TRIPS.map(t => (
                    <Card key={t.title} style={{ borderLeft: `6px solid ${t.color}` }} className="card-decoration">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={t.color}>{t.type}</Tag>
                            <Tag color={C.gold}>{t.price}</Tag>
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 4 }}>{t.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text3, marginBottom: 4 }}>
                            <Bus size={14} /> {t.dates}
                        </div>

                        <div style={{ background: C.surface2, height: 6, borderRadius: C.radiusPill, overflow: 'hidden', marginBottom: 12, marginTop: 12 }}>
                            <div style={{ width: `${(t.registered / t.cap) * 100}%`, height: '100%', background: t.color }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 13, color: C.text3 }}>{t.registered} / {t.cap} registered</div>
                            <PrimaryBtn style={{ width: 'auto', padding: '6px 16px', borderRadius: C.radiusPill, opacity: t.status === 'Waitlist' ? 0.6 : 1 }}>
                                {t.status}
                            </PrimaryBtn>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

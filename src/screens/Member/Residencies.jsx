import React from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Home, User, Calendar, MapPin } from 'lucide-react';

export default function Residencies() {
    const ROOMS = [
        { title: 'Youth Hostel Block A', type: 'Dorm', color: C.saffron, price: 'Free Seva', avail: 12, cap: 40, distance: 'Campus' },
        { title: 'Guest House B', type: 'Private', color: C.gold, price: '₹400/day', avail: 2, cap: 10, distance: 'Near Temple' },
    ];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Ashram Residencies</h2>

            <Card style={{ marginBottom: 24, borderLeft: `4px solid ${C.green}` }} className="card-decoration">
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>My Application</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.text3 }}>Status</span>
                    <Tag color={C.green}>Approved ✅</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span style={{ color: C.text3 }}>Bed Assigned</span>
                    <span style={{ fontWeight: 'bold' }}>Block A, Bed 14</span>
                </div>
                <PrimaryBtn style={{ marginTop: 12 }}>View Accommodation Pass (QR)</PrimaryBtn>
            </Card>

            <div style={{ display: 'grid', gap: 16 }}>
                {ROOMS.map(r => (
                    <Card key={r.title} style={{ borderLeft: `4px solid ${r.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={r.color}>{r.type}</Tag>
                            <Tag color={C.saffron}>{r.price}</Tag>
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 4 }}>{r.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text3, marginBottom: 4 }}>
                            <MapPin size={14} /> {r.distance}
                        </div>

                        <div style={{ background: C.surface2, height: 6, borderRadius: C.radiusPill, overflow: 'hidden', marginBottom: 12, marginTop: 12 }}>
                            <div style={{ width: `${((r.cap - r.avail) / r.cap) * 100}%`, height: '100%', background: r.color }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 13, color: C.text3 }}>{r.avail} beds available</div>
                            <PrimaryBtn style={{ width: 'auto', padding: '6px 16px', borderRadius: C.radiusPill }}>
                                Request Stay
                            </PrimaryBtn>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

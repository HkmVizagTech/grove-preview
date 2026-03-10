import React, { useState } from 'react';
import { C } from '../../theme';
import { Card } from '../../UI';

export default function AdminConfig() {
    const [flags, setFlags] = useState({ reels: true, payments: false, leaderboard: true, geo: false });

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>Config & Feature Flags</h2>

            <div style={{ display: 'grid', gap: 24 }}>
                <Card>
                    <h3 style={{ marginBottom: 16 }}>Center Features</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Toggle label="Feed Reels" checked={flags.reels} onChange={() => setFlags({ ...flags, reels: !flags.reels })} />
                        <Toggle label="Geofencing for QR Scans" checked={flags.geo} onChange={() => setFlags({ ...flags, geo: !flags.geo })} />
                        <Toggle label="Sankirtan Leaderboard" checked={flags.leaderboard} onChange={() => setFlags({ ...flags, leaderboard: !flags.leaderboard })} />
                        <Toggle label="Live Payments (Razorpay)" checked={flags.payments} onChange={() => setFlags({ ...flags, payments: !flags.payments })} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

const Toggle = ({ label, checked, onChange }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <div onClick={onChange} style={{
            width: 48, height: 24, background: checked ? C.green : C.surface2,
            borderRadius: 12, position: 'relative', cursor: 'pointer', transition: '0.3s'
        }}>
            <div style={{
                width: 20, height: 20, background: '#fff', borderRadius: '50%',
                position: 'absolute', top: 2, left: checked ? 26 : 2, transition: '0.3s', boxShadow: C.shadow
            }} />
        </div>
    </div>
);

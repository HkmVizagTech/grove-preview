import React from 'react';
import { C } from '../../theme';
import { Card } from '../../UI';

export default function AdminSandbox() {
    const OUTBOX = [
        { type: 'Push', time: '10:02 AM', to: 'All FOLK', msg: 'Reminder: Janmashtami Kirtan starts today at 4 PM!' },
        { type: 'WhatsApp', time: '09:15 AM', to: 'Krishna Das', msg: 'Hare Krishna! Your accommodation pass is approved.' },
        { type: 'Payment', time: '08:00 AM', to: 'Gopinath Das', msg: '₹12,500 for Vrindavan Yatra registered successfully.' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 8 }}>Sandbox Outbox</h2>
            <p style={{ color: C.text3, marginBottom: 24, fontSize: 14 }}>View all simulated outgoing events, pushes, and webhooks in Demo Mode.</p>

            <div style={{ display: 'grid', gap: 16 }}>
                {OUTBOX.map((o, i) => (
                    <Card key={i} style={{ borderLeft: `6px solid ${o.type === 'WhatsApp' ? C.green : o.type === 'Push' ? C.saffron : C.gold}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: C.text3 }}>
                            <span>{o.type} to: <span style={{ color: C.text, fontWeight: 'bold' }}>{o.to}</span></span>
                            <span>{o.time}</span>
                        </div>
                        <div style={{ fontSize: 16, fontFamily: 'monospace', color: C.text2 }}>
                            {o.msg}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

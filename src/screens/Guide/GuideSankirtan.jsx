import React from 'react';
import { C } from '../../theme';
import { Card, Avatar, PrimaryBtn, Tag } from '../../UI';
import { Book, CheckCircle, XCircle } from 'lucide-react';

export default function GuideSankirtan() {
    const LOGS = [
        { name: 'Karthik', spName: 'Krishna Das', date: '10 Mar 2026', loc: 'RK Beach', points: 140, photos: 2 },
        { name: 'Ramesh', spName: 'Radhanath Das', date: '08 Mar 2026', loc: 'RTC Complex', points: 280, photos: 1 },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.saffron }}>Sankirtan Verify Queue</h2>
                <Tag color={C.gold}>4 Pending</Tag>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
                {LOGS.map((log, i) => (
                    <Card key={i} style={{ borderLeft: `6px solid ${C.gold}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 200 }}>
                                <Avatar initials={log.name[0]} size={48} />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{log.spName}</div>
                                    <div style={{ fontSize: 13, color: C.text3 }}>{log.date} • {log.loc}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
                                    <div style={{ fontSize: 24, fontWeight: 'bold', color: C.gold }}>{log.points}</div>
                                    <div style={{ fontSize: 11, color: C.text3 }}>Calc Points</div>
                                </div>

                                <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.greenLight, color: C.green, padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid ${C.green}` }}>
                                    <CheckCircle size={16} /> Verify
                                </button>
                                <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid #ef4444` }}>
                                    <XCircle size={16} /> Return
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                            {[...Array(log.photos)].map((_, j) => (
                                <div key={j} style={{ width: 80, height: 60, background: C.surface2, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Book size={20} color={C.text3} />
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

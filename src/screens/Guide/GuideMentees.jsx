import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, Avatar, Tag } from '../../UI';
import { MessageCircle, Phone, FileText } from 'lucide-react';

export default function GuideMentees() {
    const [mentees, setMentees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;

        axios.get('/api/community/devotees', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setMentees(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ padding: 24, textAlign: 'center', color: C.text3 }}>Loading folks...</div>;

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <h2 className="title-font" style={{ color: C.saffron, marginBottom: 24 }}>My Folks ({mentees.length})</h2>

            {mentees.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 48, color: C.text3 }}>No devotees assigned to you yet.</Card>
            ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                    {mentees.map((m, i) => {
                        const japa = m.todayJapa || 0;
                        const status = japa >= 16 ? 'Active 🟢' : (japa > 0 ? 'Chanting 🟡' : 'Pending 🔴');
                        const displayName = m.spiritualName || m.displayName;

                        return (
                            <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 200 }}>
                                    <Avatar initials={(displayName || 'D')[0]} size={48} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{displayName}</div>
                                        {m.spiritualName && <div style={{ fontSize: 13, color: C.text3 }}>{m.displayName}</div>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ color: C.text3 }}>Japa</span>
                                        <span style={{ fontWeight: 'bold', color: japa >= 16 ? C.green : C.gold }}>{japa}/16</span>
                                    </div>
                                </div>
                                <div>
                                    <Tag color={status.includes('Active') ? C.green : (status.includes('Pending') ? '#ef4444' : C.gold)}>{status}</Tag>
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {m.phone && (
                                        <button
                                            onClick={() => window.open(`tel:${m.phone}`)}
                                            style={{ padding: 8, background: C.surface2, borderRadius: C.radiusPill, cursor: 'pointer', border: 'none' }}
                                        >
                                            <Phone size={18} color={C.text2} />
                                        </button>
                                    )}
                                    <button style={{ padding: 8, background: C.surface2, borderRadius: C.radiusPill, cursor: 'pointer', border: 'none' }}><MessageCircle size={18} color={C.text2} /></button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

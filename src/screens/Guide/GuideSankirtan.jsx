import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { C } from '../../theme';
import { Card, Avatar, Tag } from '../../UI';
import { Book, CheckCircle, XCircle } from 'lucide-react';

export default function GuideSankirtan() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = () => {
        const token = localStorage.getItem('folk_token');
        if (!token) return;
        axios.get('/api/sankirtan/pending', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setLogs(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleVerify = async (id, action) => {
        const token = localStorage.getItem('folk_token');
        try {
            await axios.post(`/api/sankirtan/approve/${id}`, { action }, { headers: { Authorization: `Bearer ${token}` } });
            setLogs(logs.filter(l => l.id !== id));
        } catch (err) {
            console.error(err);
            alert("Error updating log.");
        }
    };

    if (loading) return <div style={{ padding: 24, textAlign: 'center', color: C.text3 }}>Loading pending logs...</div>;

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.saffron }}>Sankirtan Verify Queue</h2>
                <Tag color={logs.length > 0 ? C.gold : C.text3}>{logs.length} Pending</Tag>
            </div>

            {logs.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 32, color: C.text3 }}>No pending sankirtan logs!</Card>
            ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                    {logs.map((log) => {
                        const name = log.user?.spiritualName || log.user?.displayName || 'Devotee';
                        return (
                            <Card key={log.id} style={{ borderLeft: `6px solid ${C.gold}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 200 }}>
                                        <Avatar initials={name[0]} size={48} />
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{name}</div>
                                            <div style={{ fontSize: 13, color: C.text3 }}>{new Date(log.createdAt).toLocaleDateString()} • {log.location || 'Unknown'}</div>
                                            <div style={{ fontSize: 12, color: C.text2, marginTop: 4 }}>
                                                {log.mahaBig} MB • {log.big} B • {log.medium} M • {log.small} S
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
                                            <div style={{ fontSize: 24, fontWeight: 'bold', color: C.gold }}>{log.points}</div>
                                            <div style={{ fontSize: 11, color: C.text3 }}>Calc Points</div>
                                        </div>

                                        <button onClick={() => handleVerify(log.id, 'approve')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.greenLight, color: C.green, padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid ${C.green}`, cursor: 'pointer' }}>
                                            <CheckCircle size={16} /> Verify
                                        </button>
                                        <button onClick={() => handleVerify(log.id, 'reject')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '8px 16px', borderRadius: C.radiusPill, fontWeight: 'bold', border: `1px solid #ef4444`, cursor: 'pointer' }}>
                                            <XCircle size={16} /> Return
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

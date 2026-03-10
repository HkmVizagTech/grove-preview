import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, Tag, PrimaryBtn } from '../../UI';
import { Ticket, Plus, Check } from 'lucide-react';
import axios from 'axios';
import { createSocket } from '../../api';

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({ code: '', type: 'Prasadam', event: '', expiryDate: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (token) {
            axios.get('/api/coupons', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setCoupons(res.data))
                .catch(err => console.error(err));
        }

        const socket = createSocket();
        socket.on('new_coupon', (c) => setCoupons(prev => [c, ...prev]));
        socket.on('coupon_used', (c) => setCoupons(prev => prev.map(x => x._id === c._id ? c : x)));
        return () => socket.close();
    }, []);

    const handleCreate = async () => {
        if (!form.code || !form.event || !form.expiryDate) return;
        setLoading(true);
        const token = localStorage.getItem('folk_token');
        try {
            await axios.post('/api/coupons', form, { headers: { Authorization: `Bearer ${token}` } });
            setForm({ code: '', type: 'Prasadam', event: '', expiryDate: '' });
            setShowCreate(false);
        } catch (err) {
            alert(err.response?.data?.message || "Error creating coupon");
        }
        setLoading(false);
    };

    const handleMarkUsed = async (id) => {
        const token = localStorage.getItem('folk_token');
        try {
            await axios.put(`/api/coupons/${id}/use`, {}, { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            console.error(err);
        }
    };

    const inputStyle = { width: '100%', padding: '10px', background: C.surface2, border: `1px solid ${C.border}`, borderRadius: C.radius, color: C.text, marginBottom: 12 };

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold, margin: 0 }}>Coupon Management</h2>
                <button onClick={() => setShowCreate(!showCreate)} style={{
                    display: 'flex', gap: 8, alignItems: 'center', background: C.saffron, color: '#000',
                    fontWeight: 'bold', padding: '10px 16px', borderRadius: C.radiusPill, border: 'none', cursor: 'pointer'
                }}>
                    <Plus size={16} /> Issue Coupon
                </button>
            </div>

            {showCreate && (
                <Card style={{ marginBottom: 24, borderLeft: `4px solid ${C.gold}` }}>
                    <h3 style={{ marginBottom: 16, color: C.saffron }}>Issue New Coupon</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={{ fontSize: 12, color: C.text3 }}>Code (Unique)</label>
                            <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })}
                                placeholder="e.g. FEST-2026-XYZ" style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: C.text3 }}>Type</label>
                            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                                <option>Prasadam</option>
                                <option>Book Fest</option>
                                <option>Event</option>
                                <option>Seva</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: C.text3 }}>Event Name</label>
                            <input value={form.event} onChange={e => setForm({ ...form, event: e.target.value })}
                                placeholder="e.g. Sunday Love Feast" style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: C.text3 }}>Expiry Date</label>
                            <input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} style={inputStyle} />
                        </div>
                    </div>
                    <PrimaryBtn onClick={handleCreate} style={{ marginTop: 8 }}>{loading ? 'Issuing...' : 'Issue Coupon 🎫'}</PrimaryBtn>
                </Card>
            )}

            <div style={{ display: 'grid', gap: 12 }}>
                {coupons.length === 0 && <p style={{ color: C.text3, textAlign: 'center' }}>No coupons issued yet.</p>}
                {coupons.map(c => (
                    <Card key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${c.isUsed ? C.surface2 : C.green}` }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <Ticket color={c.isUsed ? C.text3 : C.saffron} size={28} />
                            <div>
                                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 2 }}>{c.code}</div>
                                <div style={{ fontSize: 13, color: C.text2 }}>{c.type} • {c.event}</div>
                                <div style={{ fontSize: 12, color: C.text3 }}>Expires: {new Date(c.expiryDate).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <Tag color={c.isUsed ? C.text3 : C.green}>{c.isUsed ? 'Used' : 'Active'}</Tag>
                            {!c.isUsed && (
                                <button onClick={() => handleMarkUsed(c._id)} style={{
                                    display: 'flex', gap: 6, alignItems: 'center',
                                    padding: '6px 12px', background: C.surface2,
                                    borderRadius: C.radiusPill, border: `1px solid ${C.border}`,
                                    color: C.text, cursor: 'pointer', fontSize: 13
                                }}>
                                    <Check size={14} /> Mark Used
                                </button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

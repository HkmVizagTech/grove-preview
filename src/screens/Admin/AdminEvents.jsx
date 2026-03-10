import React, { useState, useEffect } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Users } from 'lucide-react';
import axios from 'axios';
import { createSocket } from '../../api';

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('folk_token');
        if (token) {
            axios.get('/api/events', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setEvents(res.data))
                .catch(err => console.error(err));
        }

        const newSocket = createSocket();
        setSocket(newSocket);

        newSocket.on('new_event', (event) => {
            setEvents(prev => [event, ...prev]);
        });

        return () => newSocket.close();
    }, []);

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.saffron, margin: 0 }}>All Events</h2>
                <PrimaryBtn style={{ width: 'auto' }} onClick={() => alert("Admin Event creation UI would go here!")}>+ Admin Event</PrimaryBtn>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {events.length === 0 && <p style={{ color: C.text3, textAlign: 'center' }}>No events found.</p>}
                {events.map((ev) => (
                    <Card key={ev._id} style={{ borderLeft: `6px solid ${C.saffron}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Tag color={C.green}>Published</Tag>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Tag color={C.gold}>Global</Tag>
                                <Tag color={C.saffron}>{ev.type}</Tag>
                            </div>
                        </div>

                        <h3 style={{ fontSize: 18, marginBottom: 8 }}>{ev.title}</h3>
                        <div style={{ color: C.text2, marginBottom: 12, fontSize: 14 }}>
                            Date: {new Date(ev.date).toLocaleString()} • {ev.location}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                                <Users size={16} /> <span style={{ fontWeight: 'bold' }}>{ev.registeredUsers?.length || 0}</span> <span style={{ color: C.text3 }}>Registrations</span>
                            </div>
                            <button style={{ padding: '6px 12px', background: C.surface2, borderRadius: C.radiusPill, fontSize: 13, border: 'none', color: C.text, cursor: 'pointer' }}>Manage Event</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

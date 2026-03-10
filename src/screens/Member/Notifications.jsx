import React from 'react';
import { C } from '../../theme';
import { Tag } from '../../UI';

const NOTIFS = [
    { emoji: '📅', title: 'Event Reminder: Mangala Arati Satsang', sub: 'Tomorrow at 5:00 AM', time: '2h ago', color: '#6B8F47' },
    { emoji: '🙏', title: 'Krishna Das gave a Pranam on your post', sub: '"Beautiful darshan of Sri Sri Radha Madanmohan..."', time: '3h ago', color: '#FF9F1C' },
    { emoji: '📿', title: 'Sadhana streak at risk!', sub: 'Log today\'s rounds to maintain your 32-day streak 🔥', time: '4h ago', color: '#E8738A' },
    { emoji: '🏆', title: 'Sankirtan Leaderboard Updated', sub: 'You are #4 in your batch — only 120 pts from #3!', time: '1d ago', color: '#F4C430' },
    { emoji: '🎫', title: 'Your coupon is expiring soon!', sub: 'Sunday Program • Expires in 24 hours', time: '2d ago', color: '#FF9F1C' },
    { emoji: '🎓', title: 'Course completed!', sub: 'Bhakti Sastri Module 2 — Certificate ready to download', time: '3d ago', color: '#6B8F47' },
];

export default function Notifications() {
    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="title-font" style={{ color: C.gold }}>Notifications</h2>
                <button style={{ fontSize: 13, color: C.text3, background: 'none', border: 'none', cursor: 'pointer' }}>
                    Mark all read
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {NOTIFS.map((n, i) => (
                    <div key={i} style={{
                        display: 'flex', gap: 16, padding: '16px 0',
                        borderBottom: `1px solid ${C.border}`,
                        cursor: 'pointer',
                    }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                            background: `${n.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, border: `1px solid ${n.color}40`,
                        }}>
                            {n.emoji}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{n.title}</div>
                            <div style={{ fontSize: 13, color: C.text2, marginTop: 4 }}>{n.sub}</div>
                            <div style={{ fontSize: 12, color: C.text3, marginTop: 6 }}>{n.time}</div>
                        </div>

                        {/* Unread dot for first 3 */}
                        {i < 3 && (
                            <div style={{
                                width: 10, height: 10, borderRadius: '50%',
                                background: C.saffron, flexShrink: 0, marginTop: 6,
                            }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

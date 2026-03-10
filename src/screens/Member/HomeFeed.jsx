import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../../theme';
import { Card, Avatar, Chip, Tag, DailyShloka, OmWatermark } from '../../UI';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const POSTS = [
    { id: 1, author: 'Radha Priya Dasi', tag: 'Bhakti Sangha Vizag', type: '🌸 Seva Moment', text: 'Beautiful darshan of Sri Sri Radha Madanmohan today morning! The flower decorations are exquisite.', img: 'https://images.unsplash.com/photo-1610486518118-243fd6fde4cc', pranams: 108, comments: 24, time: '2h ago' },
    { id: 2, author: 'Chaitanya Das', tag: 'Japa Warriors', type: '💭 Realization', text: '"Chanting the holy name is the only way in this age..." Just finished my 16 rounds before 6 AM. The peaceful atmosphere really helps focus the mind.', pranams: 54, comments: 12, time: '5h ago' }
];

export default function HomeFeed() {
    const navigate = useNavigate();
    const [japaLog, setJapaLog] = useState(12);
    const [filter, setFilter] = useState('All');

    const TABS = ['All', 'Posts', '🏛️ Ashrams', '🎵 Kirtan', '📖 Realizations'];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>

            {/* Top Banner (Shloka) */}
            <DailyShloka />

            {/* Quick Access Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                <QuickAccessItem icon="📿" label="Sadhana" path="/app/sadhana" />
                <QuickAccessItem icon="📅" label="Events" path="/app/events" />
                <QuickAccessItem icon="📖" label="Sankirtan" path="/app/sankirtan" />
                <QuickAccessItem icon="🎓" label="Courses" path="/app/courses" />
                <QuickAccessItem icon="🎫" label="Coupons" path="/app/coupons" />
                <QuickAccessItem icon="🚌" label="Trips" path="/app/trips" />
                <QuickAccessItem icon="🏛️" label="Ashrams" path="/app/residencies" />
                <QuickAccessItem icon="📷" label="Scan QR" path="/app/scan" />
            </div>

            {/* Japa Quick-Log */}
            <Card style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 24 }}>📿</div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>Today: {japaLog}/16 rounds 🔥</div>
                        <div style={{ fontSize: 13, color: C.text3 }}>Keep chanting!</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 4].map(n => (
                        <button key={n} onClick={() => setJapaLog(Math.min(16, japaLog + n))} style={{
                            background: C.surface2, padding: '6px 10px', borderRadius: C.radiusPill, border: `1px solid ${C.border}`
                        }}>+{n}</button>
                    ))}
                </div>
            </Card>

            {/* Stories mock */}
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {['My Day', 'Festivals', 'Kirtan', 'Seva'].map((lbl, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 64 }}>
                        <Avatar initials={lbl[0]} size={64} lotusRing={i > 0} />
                        <span style={{ fontSize: 12 }}>{lbl}</span>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === filter} onClick={() => setFilter(t)}>{t}</Chip>
                ))}
            </div>

            {/* Feed Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

function QuickAccessItem({ icon, label, path }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(path)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: C.shadow }}>
                {icon}
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, textAlign: 'center' }}>{label}</span>
        </div>
    );
}

function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const handleLike = () => setLiked(!liked);

    return (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: C.radius, overflow: 'hidden' }} className="card-decoration">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Avatar initials={post.author[0]} size={40} />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{post.author}</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginTop: 2 }}>
                            <span style={{ color: C.text3 }}>{post.time}</span>
                            <span>•</span>
                            <span style={{ color: C.saffron }}>{post.tag}</span>
                        </div>
                    </div>
                </div>
                <MoreHorizontal color={C.text3} />
            </div>

            {/* Image if any */}
            {post.img && (
                <div onDoubleClick={handleLike} style={{ width: '100%', height: 300, background: C.surface2, position: 'relative', overflow: 'hidden' }}>
                    <img src={post.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    {/* Mock double tap heart burst layer would go here */}
                </div>
            )}

            {/* Content & Actions */}
            <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Heart onClick={handleLike} fill={liked ? C.lotus : 'transparent'} color={liked ? C.lotus : C.text} style={{ cursor: 'pointer' }} />
                        <MessageCircle />
                        <Send />
                    </div>
                    <Bookmark />
                </div>

                <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                    🙏 {post.pranams + (liked ? 1 : 0)} Pranams
                </div>

                <div style={{ marginBottom: 4 }}>
                    <Tag color={C.green}>{post.type}</Tag>
                </div>

                <div style={{ fontSize: 14, lineHeight: 1.5, color: C.text2 }}>
                    <span style={{ fontWeight: 'bold', color: C.text, marginRight: 8 }}>{post.author}</span>
                    {post.text}
                </div>
            </div>
        </div>
    );
}

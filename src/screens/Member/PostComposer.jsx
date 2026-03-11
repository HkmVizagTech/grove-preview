import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Chip, Tag, Avatar } from '../../UI';
import { X, Image, BookOpen, Music, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostComposer() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('💭 Realization');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const TABS = ['💭 Realization', '🏛️ Ashram', '📿 Sadhana Update'];

    const handleShare = async () => {
        if (!text.trim() && !imageUrl.trim()) return;
        setLoading(true);
        const token = localStorage.getItem('folk_token');
        try {
            await axios.post('/api/posts', {
                content: text,
                tag: tab === '💭 Realization' ? 'Realization' : 'Update',
                imageUrl: imageUrl || null
            }, { headers: { Authorization: `Bearer ${token}` } });
            navigate('/app/home');
        } catch (err) {
            console.error(err);
            alert("Error posting");
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <X size={28} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <h2 className="title-font" style={{ color: C.gold, margin: 0 }}>Share Realization</h2>
                <div style={{ width: 28 }} /> {/* Spacer */}
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Chip>
                ))}
            </div>

            <Card>
                {tab === '💭 Realization' && <RealizationMode text={text} setText={setText} imageUrl={imageUrl} setImageUrl={setImageUrl} />}
                {tab === '📿 Sadhana Update' && <SadhanaMode />}
                {tab === '🏛️ Ashram' && <div style={{ minHeight: 150, padding: 12 }}>Ashram form...</div>}
            </Card>

            <PrimaryBtn style={{ marginTop: 24 }} onClick={handleShare}>
                {loading ? 'Sharing...' : 'Share Now'}
            </PrimaryBtn>
        </div>
    );
}

function RealizationMode({ text, setText, imageUrl, setImageUrl }) {
    const HASHTAGS = ['#HareKrishna', '#FOLK', '#HKMVizag', '#Sadhana', '#Kirtan', '#Prasadam'];
    const [showImageInput, setShowImageInput] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Avatar initials="M" size={40} />
                <textarea
                    placeholder="Share a verse, realization, or seva experience... Hare Krishna 🙏"
                    style={{ width: '100%', minHeight: 120, fontSize: 16, lineHeight: 1.5, resize: 'none', background: 'transparent', color: C.text, border: 'none', outline: 'none' }}
                    value={text} onChange={e => setText(e.target.value)}
                />
            </div>

            {showImageInput && (
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder="Paste Image URL here (Optional)..."
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        style={{ width: '100%', padding: '12px 0', borderBottom: `2px solid ${C.saffron}`, background: 'transparent', color: C.text, borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }}
                    />
                    {imageUrl && (
                        <div style={{ marginTop: 8, height: 120, borderRadius: C.radius, overflow: 'hidden' }}>
                            <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', gap: 16, borderTop: `1px solid ${C.border}`, paddingTop: 16, marginBottom: 16 }}>
                <Image size={24} color={C.saffron} style={{ cursor: 'pointer' }} onClick={() => setShowImageInput(!showImageInput)} />
                <BookOpen size={24} color={C.gold} style={{ cursor: 'pointer' }} />
                <Music size={24} color={C.green} style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {HASHTAGS.map(h => (
                    <Tag key={h} color={C.text2}><span onClick={() => setText(text + ' ' + h)} style={{ cursor: 'pointer' }}>{h}</span></Tag>
                ))}
            </div>
        </>
    );
}

function SadhanaMode() {
    return (
        <div style={{ padding: 12 }}>
            <h3>Quick Sadhana Share</h3>
            <p style={{ color: C.text2, fontSize: 13, marginBottom: 16 }}>This will auto-generate a beautiful shareable card with your daily stats.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Completed 16 Rounds Japa</span>
                </label>
                <label style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Attended Mangala Arati</span>
                </label>
                <label style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input type="checkbox" />
                    <span>Read 10 pages Bhagavad Gita</span>
                </label>
            </div>

            <div style={{ marginTop: 24, padding: 16, background: C.gradient, borderRadius: C.radius, color: '#000', textAlign: 'center', fontWeight: 'bold' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🔥 16 Rounds Done!</div>
                Mangala Arati Attended
            </div>
        </div>
    );
}

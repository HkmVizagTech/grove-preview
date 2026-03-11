import React, { useState } from 'react';
import { C } from '../../theme';
import { Card, Avatar, PrimaryBtn, Chip, Tag, OmWatermark } from '../../UI';
import { Settings, PenTool, CheckCircle, Medal, Heart, LogOut } from 'lucide-react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, setUser } = React.useContext(UserContext);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [tab, setTab] = useState('Realizations');
    const TABS = ['Realizations', 'Bookmarks', 'Certificates 🎓', 'Seva 🌸'];

    const handleLogout = () => {
        localStorage.removeItem('folk_token');
        setUser(null);
        navigate('/login');
    };

    if (editMode) return <EditProfile onClose={() => setEditMode(false)} />;

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <LogOut size={24} onClick={handleLogout} style={{ cursor: 'pointer', color: C.lotus }} />
                <Settings size={28} onClick={() => setEditMode(true)} style={{ cursor: 'pointer', color: C.text2 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
                <OmWatermark />
                <Avatar initials="K" size={120} lotusRing />

                <h2 className="title-font" style={{ marginTop: 16, fontSize: 24 }}>{user?.spiritualName || user?.name || 'Krishna Das'}</h2>
                <div style={{ color: C.text2, marginBottom: 8 }}>@{user?.username || 'krishnadas'} · {user?.center || 'HKM Vizag'}</div>
                <Tag color={C.gold}>{user?.role?.toUpperCase() || 'MEMBER'}</Tag>

                <div
                    onClick={() => setShowQR(!showQR)}
                    style={{
                        marginTop: 16, padding: '8px 16px', background: C.surface2,
                        borderRadius: C.radiusPill, display: 'flex', alignItems: 'center', gap: 8,
                        cursor: 'pointer', border: `1px solid ${C.border}`
                    }}
                >
                    <Settings size={14} color={C.saffron} /> {showQR ? 'Hide QR' : 'Show My QR Pass'}
                </div>

                {showQR && (
                    <Card style={{ marginTop: 16, padding: 16, textAlign: 'center', border: `2px solid ${C.saffron}` }}>
                        <div style={{ background: '#fff', padding: 12, borderRadius: 12, display: 'inline-block' }}>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${user?._id}`}
                                alt="QR Code"
                                style={{ width: 180, height: 180 }}
                            />
                        </div>
                        <div style={{ fontSize: 12, color: C.text3, marginTop: 12 }}>
                            Show this to Security for Attendance
                        </div>
                    </Card>
                )}

                <div style={{ fontSize: 10, letterSpacing: 1, marginTop: 12, textTransform: 'uppercase', color: C.saffron }}>
                    All Glories to Srila Prabhupada 🙏
                </div>
            </div>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
                <Stat label="Realizations" count={42} />
                <Stat label="Followers" count={108} />
                <Stat label="Following" count={32} />
                <Stat label="Seva Hrs" count={150} />
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 8 }}>
                {TABS.map(t => (
                    <Chip key={t} active={t === tab} onClick={() => setTab(t)}>{t}</Chip>
                ))}
            </div>

            <div style={{ minHeight: 400 }}>
                {tab === 'Realizations' && <div style={{ color: C.text3, textAlign: 'center', marginTop: 40, fontStyle: 'italic' }}>"Be the first to share a realization. Hare Krishna! 🌺"</div>}
                {tab === 'Certificates 🎓' && <CertificatesTab />}
                {tab === 'Seva 🌸' && <SevaTab />}
            </div>
        </div>
    );
}

const Stat = ({ label, count }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, color: C.gold }}>{count}</div>
        <div style={{ fontSize: 12, color: C.text3 }}>{label}</div>
    </div>
);

function CertificatesTab() {
    return (
        <div style={{ display: 'grid', gap: 16 }}>
            <Card style={{ borderLeft: `4px solid ${C.saffron}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: 16 }}>Yoga for Happiness (YFH-101)</div>
                        <div style={{ fontSize: 12, color: C.text3, marginTop: 4 }}>Completed on 12 Jan 2026</div>
                    </div>
                    <Medal color={C.saffron} />
                </div>
            </Card>
            <Card style={{ borderLeft: `4px solid ${C.gold}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: 16 }}>Temple Seva Training</div>
                        <div style={{ fontSize: 12, color: C.text3, marginTop: 4 }}>Completed on 04 Feb 2026</div>
                    </div>
                    <Medal color={C.gold} />
                </div>
            </Card>
        </div>
    );
}

function SevaTab() {
    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Heart fill={C.lotus} color={C.lotus} />
                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Seva Stats</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.text2 }}>Temple Volunteer</span>
                <span style={{ fontWeight: 'bold' }}>40 hours</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.text2 }}>Kitchen Seva</span>
                <span style={{ fontWeight: 'bold' }}>20 hours</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: C.text2 }}>Total Sankirtan Points</span>
                <span style={{ fontWeight: 'bold', color: C.gold }}>350</span>
            </div>
        </Card>
    );
}

function EditProfile({ onClose }) {
    const [openSection, setOpenSection] = useState('A');
    const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
    const NAMES = {
        'A': 'Devotional Identity', 'B': 'Personal Information', 'C': 'Education & Career',
        'D': 'Family & Grihastha', 'E': 'Seva Preferences', 'F': 'Goals & Aspirations'
    };

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <button onClick={onClose} style={{ color: C.saffron }}>Back</button>
                <h2 className="title-font" style={{ flex: 1, textAlign: 'center', color: C.gold }}>Edit Profile</h2>
                <div style={{ width: 40 }} />
            </div>

            {SECTIONS.map(sec => (
                <Card key={sec} style={{ marginBottom: 16 }}>
                    <div
                        onClick={() => setOpenSection(openSection === sec ? null : sec)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: openSection === sec ? 16 : 0, borderBottom: openSection === sec ? `1px solid ${C.border}` : 'none' }}>
                        <span style={{ fontWeight: 'bold', color: openSection === sec ? C.saffron : C.text }}>{NAMES[sec]}</span>
                        {openSection === sec ? <span style={{ color: C.saffron }}>▼</span> : <span>▶</span>}
                    </div>
                    {openSection === sec && (
                        <div style={{ paddingTop: 16 }}>
                            {sec === 'A' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ borderRadius: 12, border: `1px solid ${C.gold}4D`, backgroundColor: `${C.gold}0D`, padding: 16 }}>
                                        <p style={{ fontSize: 12, color: '#A08E70', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>🙏 Guru — Founder Acharya</p>
                                        <p style={{ fontFamily: '"Tiro Devanagari Sanskrit", serif', color: C.gold, fontSize: 18, lineHeight: 1.3 }}>His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</p>
                                        <p style={{ fontSize: 12, color: '#A08E70', marginTop: 4 }}>Founder-Acharya, International Society for Krishna Consciousness</p>
                                    </div>
                                    <Input label="Spiritual Name" val="Krishna Das" />
                                    <Input label="Home Temple" val="HKM Visakhapatnam" />
                                    <Input label="Chanting Rounds" val="16" />
                                </div>
                            )}
                            {sec !== 'A' && <div style={{ color: C.text2 }}>All fields for Section {sec}...</div>}

                            <PrimaryBtn style={{ marginTop: 24 }}>Save Section {sec}</PrimaryBtn>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}

const Input = ({ label, val }) => (
    <div>
        <label style={{ fontSize: 13, color: C.text3 }}>{label}</label>
        <input defaultValue={val} style={{ width: '100%', padding: '8px 0', borderBottom: `2px solid ${C.saffron}`, fontSize: 16 }} />
    </div>
);

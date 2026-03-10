import React from 'react';
import { C } from '../../theme';
import { Card, PrimaryBtn, Tag } from '../../UI';
import { Book, Award, FileText } from 'lucide-react';

export default function Courses() {
    const COURSES = [
        { title: 'Yoga for Happiness', code: 'YFH-101', progress: 100, cert: true },
        { title: 'Bhakti-Shastri Prep', code: 'BSP-201', progress: 40, cert: false },
        { title: 'Temple Seva Training', code: 'TST-101', progress: 0, cert: false },
    ];

    return (
        <div style={{ padding: '24px 16px', maxWidth: 600, margin: '0 auto', minHeight: '100vh', background: C.bg }}>
            <h2 className="title-font" style={{ color: C.gold, marginBottom: 24 }}>Shiksha Library</h2>
            <div style={{ display: 'grid', gap: 16 }}>
                {COURSES.map(c => (
                    <Card key={c.code} style={{ borderLeft: c.progress === 100 ? `4px solid ${C.saffron}` : `4px solid ${C.surface2}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Tag color={c.progress === 100 ? C.saffron : C.text3}>{c.code}</Tag>
                                <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>{c.title}</div>
                                <div style={{ color: C.text2, fontSize: 14 }}>{c.progress}% Completed</div>
                            </div>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', border: `4px solid ${C.surface2}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: C.gold, fontWeight: 'bold' }}>{c.progress}%</div>
                            </div>
                        </div>
                        {c.cert && (
                            <PrimaryBtn style={{ marginTop: 16, padding: '8px', fontSize: 14 }}>
                                <Award size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> View Certificate
                            </PrimaryBtn>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

import React from "react";
import { C } from "./theme";
import { Link, useNavigate } from "react-router-dom";

export const Card = ({ children, style = {}, onClick, className = "" }) => (
    <div onClick={onClick} className={`card-decoration ${className}`} style={{
        background: C.surface,
        borderRadius: C.radius,
        padding: 16,
        boxShadow: C.shadow,
        border: `1px solid ${C.border}`,
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        ...style
    }}>
        {children}
    </div>
);

export const Avatar = ({ initials, size = 40, lotusRing = false }) => (
    <div style={{
        width: size, height: size,
        borderRadius: "50%",
        background: lotusRing ? C.gradient : C.surface2,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: lotusRing ? 2 : 0, // ring border effect
    }}>
        <div style={{
            width: lotusRing ? size - 4 : size,
            height: lotusRing ? size - 4 : size,
            background: C.surface,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold",
            color: C.saffron
        }}>
            {initials}
        </div>
    </div>
);

export const Chip = ({ children, active, onClick }) => (
    <button onClick={onClick} style={{
        background: active ? C.saffron : C.surface2,
        color: active ? C.bg : C.text,
        padding: "6px 14px",
        borderRadius: C.radiusPill,
        fontWeight: 500,
        fontSize: 14,
        border: `1px solid ${active ? C.saffron : C.border}`
    }}>
        {children}
    </button>
);

export const Tag = ({ children, color = C.saffron }) => (
    <span style={{
        background: `${color}20`,
        color,
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600
    }}>{children}</span>
);

export const ProgressBar = ({ pct, color = C.saffron, height = 6 }) => (
    <div style={{ width: "100%", height, background: C.surface2, borderRadius: C.radiusPill, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: C.radiusPill }} />
    </div>
);

export const PrimaryBtn = ({ children, onClick, style = {} }) => (
    <button onClick={onClick} style={{
        background: C.gradient,
        color: "#000",
        fontWeight: "bold",
        padding: "12px 24px",
        borderRadius: C.radius,
        boxShadow: C.shadow,
        width: "100%",
        ...style
    }}>{children}</button>
);

export const OmWatermark = () => (
    <div className="om-watermark">ॐ</div>
);

export const DailyShloka = () => (
    <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${C.surface2}, ${C.surface})`, borderColor: C.gold }} className="fade-up">
        <OmWatermark />
        <Tag color={C.gold}>Daily Darshan</Tag>
        <div style={{ marginTop: 8, fontFamily: "Tiro Devanagari Sanskrit", fontSize: 18, color: C.saffron }}>
            मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।<br />
            मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥
        </div>
        <div style={{ fontSize: 13, color: C.text2, marginTop: 4, fontStyle: "italic" }}>
            man-manā bhava mad-bhakto...
        </div>
        <div style={{ fontSize: 14, marginTop: 8 }}>
            Always think of Me, become My devotee, worship Me and offer your homage unto Me...
        </div>
        <div style={{ fontSize: 12, color: C.text3, marginTop: 8, fontWeight: 'bold' }}>
            — Srila Prabhupada, BG 18.65
        </div>
    </Card>
);

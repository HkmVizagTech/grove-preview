import { C } from "../theme";

const bgs = [
  "linear-gradient(135deg,#FF9F1C,#FF7A00)",
  "linear-gradient(135deg,#0B72B9,#1A9FE8)",
  "linear-gradient(135deg,#39A66F,#22C676)",
  "linear-gradient(135deg,#E8738A,#C44D6E)",
  "linear-gradient(135deg,#7C3AED,#A855F7)",
];
const initials = ["PD","AK","RV","SM","GN","LD","BK","VR"];

export const Avatar = ({ seed = 0, size = 36, ring, src }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: src ? "transparent" : bgs[seed % bgs.length],
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.33, fontWeight: 700, color: "#fff", flexShrink: 0,
    outline: ring ? `3px solid ${C.saffron}` : "none",
    outlineOffset: 2,
    overflow: "hidden",
  }}>
    {src ? <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials[seed % initials.length]}
  </div>
);

export const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: C.surface, borderRadius: 20, padding: 16,
    border: `1px solid ${C.border}`, boxShadow: C.shadow,
    cursor: onClick ? "pointer" : "default", ...style,
  }}>{children}</div>
);

export const Btn = ({ children, variant = "primary", onClick, style = {}, small }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg,${C.saffron},#FF7A00)`, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.saffron, border: `1.5px solid ${C.saffron}` },
    ghost: { background: C.surface2, color: C.text2, border: `1px solid ${C.border}` },
    danger: { background: "#FEE2E2", color: "#EF4444", border: "1px solid #FECACA" },
    success: { background: C.basilLight, color: C.basil, border: `1px solid #BBF7D0` },
  };
  return (
    <button onClick={onClick} style={{
      ...styles[variant],
      borderRadius: 12, padding: small ? "6px 14px" : "11px 20px",
      fontSize: small ? 12 : 14, fontWeight: 700, cursor: "pointer",
      fontFamily: "Inter, sans-serif", transition: "opacity 0.2s", ...style,
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >{children}</button>
  );
};

export const Tag = ({ children, color = C.saffron }) => (
  <span style={{
    background: `${color}18`, color, border: `1px solid ${color}33`,
    borderRadius: 8, padding: "3px 9px", fontSize: 11, fontWeight: 600,
    fontFamily: "Inter, sans-serif",
  }}>{children}</span>
);

export const Bar = ({ pct = 0, color = C.saffron, h = 6 }) => (
  <div style={{ background: C.surface2, borderRadius: 99, height: h, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s" }} />
  </div>
);

export const NavBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    gap: 3, padding: "8px 4px", background: "none", border: "none", cursor: "pointer",
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <span style={{ fontSize: 9, fontWeight: 700, color: active ? C.saffron : C.text3, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</span>
    {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.saffron }} />}
  </button>
);

export const SectionRow = ({ title, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>{title}</h3>
    {action && <button onClick={onAction} style={{ background: "none", border: "none", color: C.saffron, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{action}</button>}
  </div>
);

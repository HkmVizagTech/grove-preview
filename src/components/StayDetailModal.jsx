import React from 'react';
import { Avatar } from '../App.jsx'; // Avatar defined in App.jsx

const StayDetailModal = ({ stay, onClose, onRequest }) => (
  <div style={{ position:"absolute", inset:0, background:"#0e0e18", zIndex:300, overflowY:"auto", scrollbarWidth:"none" }}>
    <div style={{ height:220, background:stay.gradient, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", flexShrink:0 }}>
      <div style={{ fontSize:72, filter:`drop-shadow(0 8px 30px ${stay.accentColor}66)` }}>{stay.emoji}</div>
      <button onClick={onClose} style={{ position:"absolute", top:16, left:16, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:12, padding:"6px 14px", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>← Back</button>
      <div style={{ position:"absolute", top:16, right:16 }}><Badge color={stay.available?"#6BCB77":"#FF6B6B"}>{stay.available?"OPEN":"FULL"}</Badge></div>
    </div>
    <div style={{ padding:"20px 20px 48px" }}>
      <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", margin:"0 0 4px" }}>{stay.name}</h2>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:14 }}>Hosted by <span style={{ color:stay.accentColor, fontWeight:700 }}>{stay.host}</span> · 📍 {stay.location}</div>
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {stay.tags.map(t=><div key={t} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"5px 12px", fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>{t}</div>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:18 }}>
        {[["🛏",`${stay.beds} beds`],["👥",`Max ${stay.maxGuests}`],["📅",stay.nights]].map(([icon,val],i)=>(
          <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"12px", textAlign:"center" }}>
            <div style={{ fontSize:20, marginBottom:4 }}>{icon}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:600 }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"16px", marginBottom:18 }}>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontWeight:700, letterSpacing:0.5, marginBottom:8 }}>ABOUT THIS SPACE</div>
        <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:0 }}>{stay.description}</p>
      </div>
      <div style={{ marginBottom:22 }}>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontWeight:700, letterSpacing:0.5, marginBottom:12 }}>AMENITIES</div>
        {stay.amenities.map((a,i)=><div key={i} style={{ fontSize:13, color:"rgba(255,255,255,0.6)", padding:"5px 0" }}>{a}</div>)}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"12px 14px" }}>
        <Avatar seed={stay.hostSeed} size={44} ring />
        <div><div style={{ color:"#fff", fontWeight:700, fontSize:14 }}>{stay.host}</div><div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>Host · {stay.community} · {stay.requests} requests</div></div>
      </div>
      <button onClick={()=>stay.available&&onRequest(stay)} style={{ width:"100%", background:stay.available?`linear-gradient(135deg,${stay.accentColor},${stay.accentColor}bb)`:"rgba(255,255,255,0.06)", border:"none", borderRadius:16, padding:"16px", color:stay.available?"#000":"rgba(255,255,255,0.25)", fontSize:16, fontWeight:800, cursor:stay.available?"pointer":"default" }}>
        {stay.available?"🙏 Request to Stay":"⏳ Waitlist Full"}
      </button>
    </div>
  </div>
);

export default StayDetailModal;

import { useState } from "react";

// â”€â”€â”€ DESIGN TOKENS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const C = {
  peacock: "#0F4C81",
  peacockLight: "#1A6BB5",
  saffron: "#FFB000",
  mango: "#FF7A00",
  cream: "#FFF8EB",
  basil: "#108A00",
  ink: "#0B1021",
  inkLight: "#162040",
  inkMid: "#1E2D52",
  white: "#FFFFFF",
  dimWhite: "rgba(255,248,235,0.7)",
  dimmer: "rgba(255,248,235,0.35)",
  dimmest: "rgba(255,248,235,0.12)",
  overlay: "rgba(11,16,33,0.85)",
};

// â”€â”€â”€ FONTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const fontLink = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap";

// â”€â”€â”€ SHARED COMPONENTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const Lotus = ({ size = 24, color = C.saffron }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="14" rx="3" ry="5" fill={color} opacity="0.9"/>
    <ellipse cx="12" cy="14" rx="3" ry="5" fill={color} opacity="0.9" transform="rotate(45 12 14)"/>
    <ellipse cx="12" cy="14" rx="3" ry="5" fill={color} opacity="0.9" transform="rotate(-45 12 14)"/>
    <ellipse cx="12" cy="14" rx="3" ry="5" fill={color} opacity="0.7" transform="rotate(90 12 14)"/>
    <circle cx="12" cy="13" r="2.5" fill={color}/>
  </svg>
);

const Chip = ({ children, active, onClick, small }) => (
  <button onClick={onClick} style={{
    background: active ? `linear-gradient(135deg, ${C.saffron}, ${C.mango})` : C.dimmest,
    border: `1px solid ${active ? "transparent" : C.dimmest}`,
    borderRadius: 20, padding: small ? "4px 12px" : "7px 16px",
    color: active ? C.ink : C.dimWhite, fontSize: small ? 11 : 13,
    fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif",
    letterSpacing: 0.2, transition: "all 0.2s",
  }}>{children}</button>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: C.inkMid, border: `1px solid ${C.dimmest}`,
    borderRadius: 20, padding: 16, ...style,
    cursor: onClick ? "pointer" : "default",
  }}>{children}</div>
);

const Avatar = ({ seed = 0, size = 36, ring = false, label }) => {
  const bgs = ["linear-gradient(135deg,#FFB000,#FF7A00)","linear-gradient(135deg,#0F4C81,#1A6BB5)","linear-gradient(135deg,#108A00,#1DB800)","linear-gradient(135deg,#C44D00,#FF7A00)","linear-gradient(135deg,#6B0F4C,#B01A7A)"];
  const names = ["PD","AK","RV","SM","GN","LD","BK","VR","KM","SP"];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bgs[seed % bgs.length],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 800, color: "#fff", flexShrink: 0,
      fontFamily: "Poppins, sans-serif",
      boxShadow: ring ? `0 0 0 2px ${C.saffron}, 0 0 0 4px ${C.ink}` : "none",
    }}>{label || names[seed % names.length]}</div>
  );
};

const StatPill = ({ value, label, color = C.saffron }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 20, fontWeight: 900, color, fontFamily: "Poppins, sans-serif" }}>{value}</div>
    <div style={{ fontSize: 10, color: C.dimmer, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
  </div>
);

const Tag = ({ children, color = C.saffron }) => (
  <span style={{
    background: `${color}22`, border: `1px solid ${color}44`,
    color, borderRadius: 8, padding: "3px 9px", fontSize: 11, fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
  }}>{children}</span>
);

const ProgressBar = ({ pct, color = C.saffron, height = 6 }) => (
  <div style={{ background: C.dimmest, borderRadius: 99, height, overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${C.mango})`, borderRadius: 99, transition: "width 0.5s" }} />
  </div>
);

const SectionTitle = ({ children, action, onAction }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif", letterSpacing: -0.3 }}>{children}</h3>
    {action && <button onClick={onAction} style={{ background: "none", border: "none", color: C.saffron, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>{action}</button>}
  </div>
);

const NavBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    background: "none", border: "none", cursor: "pointer", padding: "6px 12px",
    flex: 1,
  }}>
    <span style={{ fontSize: 20, opacity: active ? 1 : 0.4, transition: "opacity 0.2s" }}>{icon}</span>
    <span style={{ fontSize: 9, fontWeight: 700, color: active ? C.saffron : C.dimmer, letterSpacing: 0.3, fontFamily: "Poppins, sans-serif", textTransform: "uppercase" }}>{label}</span>
    {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.saffron }} />}
  </button>
);

//  SCREEN: LANDING 
const LandingScreen = ({ onNav }) => (
  <div style={{ minHeight: 700, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
    {/* BG mandala */}
    <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", border: `60px solid ${C.saffron}18`, pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", border: `30px solid ${C.mango}15`, pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: 100, left: -60, width: 240, height: 240, borderRadius: "50%", border: `40px solid ${C.peacock}20`, pointerEvents: "none" }} />

    {/* Header */}
    <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lotus size={22} color={C.ink} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif", letterSpacing: -0.5, lineHeight: 1 }}>FOLK</div>
          <div style={{ fontSize: 9, color: C.saffron, fontWeight: 700, letterSpacing: 1 }}>HKM VISAKHAPATNAM</div>
        </div>
      </div>
      <div style={{ background: C.dimmest, borderRadius: 10, padding: "5px 14px", fontSize: 11, color: C.saffron, fontWeight: 700, border: `1px solid ${C.saffron}33`, fontFamily: "Poppins, sans-serif" }}>DEMO</div>
    </div>

    {/* Hero */}
    <div style={{ padding: "40px 20px 24px", flex: 1 }}>
      <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 2, marginBottom: 8, fontFamily: "Poppins, sans-serif" }}>HARE KRISHNA MOVEMENT</div>
      <h1 style={{ fontSize: 38, fontWeight: 900, color: C.cream, margin: "0 0 6px", lineHeight: 1.1, fontFamily: "Poppins, sans-serif", letterSpacing: -1.5 }}>
        Empower.<br /><span style={{ color: C.saffron }}>Connect.</span><br />Grow.
      </h1>
      <p style={{ fontSize: 14, color: C.dimWhite, margin: "12px 0 32px", lineHeight: 1.7, fontFamily: "Poppins, sans-serif" }}>
        Your complete spiritual growth companion — sadhana, events, community, and more. Built for Vizag's FOLK youth.
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 0, background: C.inkMid, borderRadius: 18, padding: "16px", marginBottom: 28, border: `1px solid ${C.dimmest}` }}>
        {[["120+","Youth"],["6","Events"],["4","Batches"],["40","Beds"]].map(([v,l], i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? `1px solid ${C.dimmest}` : "none" }}>
            <StatPill value={v} label={l} />
          </div>
        ))}
      </div>

      <button onClick={() => onNav("youth-home")} style={{
        width: "100%", background: `linear-gradient(135deg, ${C.saffron}, ${C.mango})`,
        border: "none", borderRadius: 16, padding: "16px", color: C.ink,
        fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif",
        letterSpacing: 0.3, boxShadow: `0 8px 32px ${C.saffron}44`, marginBottom: 12,
      }}> Enter as Youth</button>
      <div style={{ display: "flex", gap: 10 }}>
        {[["Guide Console","guide-dashboard"],["Admin","admin-dashboard"],["Security","security-scan"]].map(([l,r]) => (
          <button key={r} onClick={() => onNav(r)} style={{
            flex: 1, background: C.dimmest, border: `1px solid ${C.dimmest}`,
            borderRadius: 12, padding: "10px 8px", color: C.dimWhite,
            fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif",
          }}>{l}</button>
        ))}
      </div>
    </div>

    {/* Bottom feature chips */}
    <div style={{ padding: "0 20px 28px", display: "flex", gap: 8, flexWrap: "wrap" }}>
      {["Sadhana","Smart QR","Coupons","Trips","Social Feed","DMs","Courses"].map(f => (
        <div key={f} style={{ background: C.dimmest, borderRadius: 20, padding: "5px 12px", fontSize: 11, color: C.dimmer, fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>{f}</div>
      ))}
    </div>
  </div>
);

//  SCREEN: YOUTH HOME 
const YouthHome = ({ onNav }) => {
  const [japaCount, setJapa] = useState(8);
  return (
    <div style={{ paddingBottom: 8 }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1 }}>JAI SRILA PRABHUPADA </p>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif", letterSpacing: -0.5 }}>Good Morning, Prabhu</h2>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onNav("profile")}>
          <Avatar seed={0} size={44} ring />
          <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, background: C.mango, borderRadius: "50%", border: `2px solid ${C.ink}`, fontSize: 8, color: C.ink, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
        </div>
      </div>

      {/* Today's Sadhana Card */}
      <div style={{ margin: "16px 16px 0", background: `linear-gradient(135deg, ${C.peacock}, ${C.inkMid})`, borderRadius: 22, padding: "20px", border: `1px solid ${C.peacockLight}44`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.07 }}><Lotus size={120} color={C.cream} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TODAY'S SADHANA</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}> Day 14 Streak</div>
          </div>
          <Tag children="On Track" color={C.basil} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Japa Rounds","8/16","50%"],["Sastra Reading","20/30 min","67%"],["Arati Attended","1/2","50%"],["Vows"," Kept","100%"]].map(([label, val, pct]) => (
            <div key={label} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: C.dimmer, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.cream, marginBottom: 6, fontFamily: "Poppins, sans-serif" }}>{val}</div>
              <ProgressBar pct={parseInt(pct)} />
            </div>
          ))}
        </div>
        <button onClick={() => onNav("sadhana")} style={{ width: "100%", marginTop: 14, background: `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, border: "none", borderRadius: 12, padding: "11px", color: C.ink, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Log Today's Sadhana +</button>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "16px 16px 0" }}>
        <SectionTitle>Quick Actions</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[["","Scan QR","scan"],["","Wallet","coupons"],["","Events","events"],["","Trips","trips"],["","Courses","courses"],["","Sankirtan","sankirtan"],["","Chat","chat"],["","Stay","residency"]].map(([icon, label, route]) => (
            <button key={route} onClick={() => onNav(route)} style={{ background: C.inkMid, border: `1px solid ${C.dimmest}`, borderRadius: 16, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <span style={{ fontSize: 10, color: C.dimWhite, fontWeight: 700, fontFamily: "Poppins, sans-serif", textAlign: "center", letterSpacing: 0.2 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Event */}
      <div style={{ padding: "16px 16px 0" }}>
        <SectionTitle action="See all" onAction={() => onNav("events")}>Upcoming Events</SectionTitle>
        {[["Bhagavad Gita Study Circle","Today, 6:00 PM","ISKCON Hall A","satsang"],["Yoga for Happiness — Session 3","Tomorrow, 7:00 AM","Meditation Hall","course_session"]].map(([title, time, venue, type], i) => (
          <Card key={i} style={{ marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }} onClick={() => onNav("events")}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: i === 0 ? `linear-gradient(135deg,${C.saffron},${C.mango})` : `linear-gradient(135deg,${C.peacock},${C.peacockLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{i === 0 ? "" : ""}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 11, color: C.dimmer }}>{time}  {venue}</div>
            </div>
            <Tag children={type} color={C.saffron} />
          </Card>
        ))}
      </div>

      {/* Notification */}
      <div style={{ margin: "16px 16px 8px" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.basil}22, ${C.basil}11)`, border: `1px solid ${C.basil}44`, borderRadius: 18, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 28 }}></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Prasadam Coupon Available!</div>
            <div style={{ fontSize: 11, color: C.dimmer, marginTop: 2 }}>Saturday feast  200 spots  RSVP now</div>
          </div>
          <button onClick={() => onNav("coupons")} style={{ background: `linear-gradient(135deg, ${C.basil}, #1DB800)`, border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Coming!</button>
        </div>
      </div>
    </div>
  );
};

//  SCREEN: SADHANA 
const SadhanaScreen = () => {
  const days = ["M","T","W","T","F","S","S"];
  const done = [true,true,true,false,true,true,false];
  const [japa, setJapa] = useState(8);
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 16px" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}> Sadhana Tracker</h2>
      </div>

      {/* Streak */}
      <div style={{ background: `linear-gradient(135deg, ${C.saffron}22, ${C.mango}11)`, border: `1px solid ${C.saffron}33`, borderRadius: 20, padding: "16px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: C.saffron, fontFamily: "Poppins, sans-serif", lineHeight: 1 }}>14</div>
        <div style={{ fontSize: 12, color: C.dimWhite, fontWeight: 700, letterSpacing: 1 }}>DAY STREAK </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          {days.map((d, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: done[i] ? `linear-gradient(135deg, ${C.saffron}, ${C.mango})` : C.dimmest, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done[i] ? C.ink : C.dimmer, fontFamily: "Poppins, sans-serif" }}>{d}</div>
          ))}
        </div>
      </div>

      {/* Log Today */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Log Today</SectionTitle>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: C.dimmer, fontWeight: 600, marginBottom: 6 }}>JAPA ROUNDS (0–64)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setJapa(Math.max(0, japa-1))} style={{ width: 36, height: 36, borderRadius: 10, background: C.dimmest, border: "none", color: C.cream, fontSize: 18, cursor: "pointer" }}></button>
            <div style={{ flex: 1, textAlign: "center", fontSize: 32, fontWeight: 900, color: C.saffron, fontFamily: "Poppins, sans-serif" }}>{japa}</div>
            <button onClick={() => setJapa(Math.min(64, japa+1))} style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", color: C.ink, fontSize: 18, cursor: "pointer", fontWeight: 900 }}>+</button>
          </div>
          <ProgressBar pct={(japa/16)*100} height={8} />
          <div style={{ fontSize: 10, color: C.dimmer, marginTop: 4 }}>Target: 16 rounds/day</div>
        </div>
        {[["","Sastra Reading","30 min"],["","Arati / Temple Visit","Morning arati"],["","Vows","Maintained today"]].map(([icon, label, sub]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${C.dimmest}` }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{label}</div>
              <div style={{ fontSize: 11, color: C.dimmer }}>{sub}</div>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: `linear-gradient(135deg,${C.basil},#1DB800)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}></div>
          </div>
        ))}
        <button style={{ width: "100%", marginTop: 14, background: `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, border: "none", borderRadius: 14, padding: "13px", color: C.ink, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Save Today's Log </button>
      </Card>

      {/* Badges */}
      <SectionTitle>Badges Earned</SectionTitle>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[["","7-Day","Lotus"],["","First Arati","Early Bird"],["","100 Rounds","Japa Hero"]].map(([icon, val, name]) => (
          <div key={name} style={{ background: C.inkMid, borderRadius: 14, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", border: `1px solid ${C.saffron}22` }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{name}</div>
              <div style={{ fontSize: 10, color: C.saffron }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//  SCREEN: EVENTS 
const EventsScreen = ({ onNav }) => {
  const [tab, setTab] = useState("upcoming");
  const events = [
    { title: "Bhagavad Gita Study Circle", date: "Today  6:00 PM", venue: "ISKCON Hall A", type: "satsang", spots: 40, icon: "", color: C.saffron },
    { title: "Yoga for Happiness - Session 3", date: "Tomorrow  7:00 AM", venue: "Meditation Hall", type: "course", spots: 25, icon: "", color: C.peacock },
    { title: "Simhachalam Darshan & Seva", date: "12 Jul  5:00 AM", venue: "Temple Entrance", type: "trip", spots: 35, icon: "", color: C.mango },
    { title: "Book Distribution Drive", date: "15 Jul  9:00 AM", venue: "RK Beach", type: "book_drive", spots: 60, icon: "", color: C.basil },
    { title: "Ratha Yatra Festival", date: "20 Jul  8:00 AM", venue: "MVP Colony", type: "festival", spots: 200, icon: "", color: "#C44D00" },
    { title: "Ekadasi Fasting Circle", date: "22 Jul  6:00 PM", venue: "Online + Hall", type: "satsang", spots: 80, icon: "", color: "#6B0F4C" },
  ];
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Events</h2>
        <button onClick={() => onNav("scan")} style={{ background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", borderRadius: 12, padding: "8px 16px", color: C.ink, fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Scan QR</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["upcoming","registered","past"].map(t => <Chip key={t} active={tab===t} onClick={() => setTab(t)} small>{t.charAt(0).toUpperCase()+t.slice(1)}</Chip>)}
      </div>
      {events.map((e, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${e.color}cc, ${e.color}66)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1px solid ${e.color}44` }}>{e.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif", marginBottom: 3 }}>{e.title}</div>
              <div style={{ fontSize: 11, color: C.dimmer, marginBottom: 6 }}>{e.date}  {e.venue}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Tag children={e.type} color={e.color} />
                <span style={{ fontSize: 11, color: C.dimmer }}>{e.spots} spots left</span>
              </div>
            </div>
          </div>
          <button style={{ width: "100%", marginTop: 12, background: `${e.color}22`, border: `1px solid ${e.color}44`, borderRadius: 10, padding: "9px", color: e.color, fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Register &rarr;</button>
        </Card>
      ))}
    </div>
  );
};

//  SCREEN: SCAN QR 
const ScanScreen = ({ onNav }) => {
  const [scanned, setScanned] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px", minHeight: 680 }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif", alignSelf: "flex-start" }}>Smart QR Scan</h2>
      <p style={{ margin: "0 0 24px", fontSize: 13, color: C.dimmer, alignSelf: "flex-start", fontFamily: "Poppins, sans-serif" }}>Point at any event QR to check-in instantly</p>

      {/* Viewfinder */}
      <div style={{ width: 260, height: 260, borderRadius: 28, background: C.inkMid, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, overflow: "hidden", border: `2px solid ${C.saffron}33` }}>
        <div style={{ position: "absolute", inset: 0, background: scanned ? `${C.basil}22` : "transparent", transition: "background 0.3s" }} />
        {/* Corner brackets */}
        {[[0,0],[0,1],[1,0],[1,1]].map(([t,r], i) => (
          <div key={i} style={{ position: "absolute", top: t ? "auto" : 20, bottom: t ? 20 : "auto", left: r ? "auto" : 20, right: r ? 20 : "auto", width: 32, height: 32, borderTop: !t ? `3px solid ${C.saffron}` : "none", borderBottom: t ? `3px solid ${C.saffron}` : "none", borderLeft: !r ? `3px solid ${C.saffron}` : "none", borderRight: r ? `3px solid ${C.saffron}` : "none" }} />
        ))}
        {scanned
          ? <div style={{ textAlign: "center" }}><div style={{ fontSize: 48 }}></div><div style={{ fontSize: 13, color: C.basil, fontWeight: 800, fontFamily: "Poppins, sans-serif", marginTop: 8 }}>Checked In!</div></div>
          : <div style={{ opacity: 0.15 }}><Lotus size={80} color={C.saffron} /></div>
        }
        {/* Scan line animation */}
        {!scanned && <div style={{ position: "absolute", left: 20, right: 20, height: 2, background: `linear-gradient(90deg, transparent, ${C.saffron}, transparent)`, animation: "scanline 2s infinite", top: "50%" }} />}
      </div>

      {!scanned ? (
        <>
          <div style={{ fontSize: 13, color: C.dimmer, textAlign: "center", marginBottom: 24, fontFamily: "Poppins, sans-serif" }}>QR rotates every 30s  Secured by JWT</div>
          <button onClick={() => setScanned(true)} style={{ background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", borderRadius: 16, padding: "14px 40px", color: C.ink, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Simulate Scan</button>
        </>
      ) : (
        <Card style={{ width: "100%", maxWidth: 320 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <Avatar seed={0} size={48} ring />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Prabhu Das</div>
              <div style={{ fontSize: 11, color: C.saffron }}>FOLK-Vizag-Students-Sat</div>
            </div>
          </div>
          <div style={{ background: `${C.basil}22`, borderRadius: 12, padding: "12px", border: `1px solid ${C.basil}33` }}>
            <div style={{ fontSize: 12, color: C.basil, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}> Attendance Marked &mdash; Present</div>
            <div style={{ fontSize: 11, color: C.dimmer, marginTop: 4 }}>Bhagavad Gita Study Circle  6:03 PM</div>
            <div style={{ fontSize: 11, color: C.dimmer }}>Auto-registered (was not enrolled)</div>
          </div>
          <button onClick={() => setScanned(false)} style={{ width: "100%", marginTop: 12, background: C.dimmest, border: "none", borderRadius: 12, padding: "10px", color: C.dimWhite, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Scan Another</button>
        </Card>
      )}
    </div>
  );
};

//  SCREEN: COUPONS WALLET 
const CouponsScreen = () => {
  const [rsvpDone, setRsvp] = useState(false);
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 16px" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}> Coupon Wallet</h2>
      </div>

      {/* RSVP Banner */}
      {!rsvpDone && (
        <div style={{ background: `linear-gradient(135deg, ${C.mango}22, ${C.saffron}11)`, border: `1px solid ${C.mango}44`, borderRadius: 20, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.mango, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>NEW INVITATION</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 36 }}></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Saturday Prasadam Feast</div>
              <div style={{ fontSize: 12, color: C.dimmer }}>200 spots  Sat 12:30 PM  ISKCON Hall</div>
            </div>
          </div>
          <button onClick={() => setRsvp(true)} style={{ width: "100%", marginTop: 12, background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", borderRadius: 12, padding: "12px", color: C.ink, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Coming! &mdash; Claim Coupon</button>
        </div>
      )}

      {/* Active Coupons */}
      <SectionTitle>Active Coupons ({rsvpDone ? 2 : 1})</SectionTitle>
      {rsvpDone && (
        <div style={{ background: `linear-gradient(135deg, ${C.basil}, #1a6e00)`, borderRadius: 20, padding: "20px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.1 }}><Lotus size={100} color={C.cream} /></div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>PRASADAM COUPON  ACTIVE</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>Saturday Prasadam Feast </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 80, height: 80, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>Scan at counter  Valid Sat 12:00-2:00 PM</div>
          </div>
        </div>
      )}

      {/* Existing coupon */}
      <div style={{ background: `linear-gradient(135deg, ${C.peacock}, ${C.inkMid})`, borderRadius: 20, padding: "20px", marginBottom: 16, position: "relative", overflow: "hidden", border: `1px solid ${C.peacockLight}33` }}>
        <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.08 }}><Lotus size={100} color={C.cream} /></div>
        <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TRIP PASS  ACTIVE</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>Simhachalam Darshan </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 80, height: 80, background: C.cream, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}></div>
          <div style={{ fontSize: 11, color: C.dimmer, marginTop: 8 }}>Bus 2  Seat 14  Assembly: MVP Bus Stand 4:45 AM</div>
        </div>
      </div>

      <SectionTitle>Used / Expired</SectionTitle>
      {[["Ekadasi Fasting Kit","Jun 15","Used"],["Course Materials","Jun 5","Expired"]].map(([name, date, status]) => (
        <div key={name} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.dimmest}` }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.dimmest, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dimWhite, fontFamily: "Poppins, sans-serif" }}>{name}</div>
            <div style={{ fontSize: 11, color: C.dimmer }}>{date}</div>
          </div>
          <Tag children={status} color={status === "Used" ? C.basil : "#666"} />
        </div>
      ))}
    </div>
  );
};

// ─── SCREEN: COMMUNITY ────────────────────────────────────────
const CommunityScreen = ({ onNav }) => {
  const [tab, setTab] = useState("circles");
  const [search, setSearch] = useState("");
  
  const circles = [
    { name: "Bhakti Sangha Vizag", members: 120, tags: ["chanting", "satsang"], joined: true },
    { name: "Gītā Study Group (Sat)", members: 45, tags: ["study", "philosophy"], joined: false },
    { name: "Weekend Sankīrtan", members: 80, tags: ["outreach", "books"], joined: false },
    { name: "Youth Hostel Block A", members: 40, tags: ["residency"], joined: true },
  ];
  
  const devotees = [
    { name: "Radha Madhuri", role: "Youth Leader", seed: 1, following: true },
    { name: "Arjun Vyas", role: "Sankīrtan Champ", seed: 2, following: false },
    { name: "Priya Sharma", role: "Regular", seed: 3, following: false },
  ];

  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ padding: "12px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>🌍 Community</h2>
        <button onClick={() => onNav("chat")} style={{ background: 'rgba(255,248,235,0.12)', border: "none", borderRadius: 10, width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>💬</button>
      </div>

      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ background: 'rgba(255,248,235,0.12)', borderRadius: 14, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 16, color: 'rgba(255,248,235,0.35)' }}>🔍</span>
          <input 
            placeholder="Search circles, devotees..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", color: C.cream, fontSize: 13, flex: 1, outline: "none", fontFamily: "Poppins, sans-serif" }} 
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 16px", marginBottom: 16 }}>
        {["circles", "devotees"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? `linear-gradient(135deg, ${C.saffron}, ${C.mango})` : 'rgba(255,248,235,0.12)',
            border: "none", borderRadius: 20, padding: "7px 16px",
            color: tab === t ? C.ink : 'rgba(255,248,235,0.7)', fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", textTransform: "capitalize"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        {tab === "circles" ? (
          circles.map((c, i) => (
            <div key={i} style={{ background: C.inkMid, border: `1px solid ${C.dimmest}`, borderRadius: 20, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{c.name}</div>
                <button style={{ background: c.joined ? 'rgba(255,248,235,0.12)' : C.saffron, border: "none", borderRadius: 12, padding: "6px 14px", color: c.joined ? 'rgba(255,248,235,0.7)' : C.ink, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                  {c.joined ? "Joined" : "Join"}
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,248,235,0.35)', marginBottom: 8 }}>{c.members} members</div>
              <div style={{ display: "flex", gap: 6 }}>
                {c.tags.map(tag => (
                  <span key={tag} style={{ background: `${C.saffron}22`, border: `1px solid ${C.saffron}44`, color: C.saffron, borderRadius: 8, padding: "3px 9px", fontSize: 11, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>#{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          devotees.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: C.inkMid, border: `1px solid ${C.dimmest}`, borderRadius: 20, padding: 16, marginBottom: 12 }}>
              <Avatar seed={d.seed} size={44} ring />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{d.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,248,235,0.35)' }}>{d.role}</div>
              </div>
              <button style={{ background: d.following ? 'rgba(255,248,235,0.12)' : `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, border: "none", borderRadius: 12, padding: "6px 14px", color: d.following ? 'rgba(255,248,235,0.7)' : C.ink, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                {d.following ? "Following" : "Follow"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── SCREEN: SOCIAL FEED ──────────────────────────────────────
const FeedScreen = ({ onNav }) => {
  const stories = [["You",0,true],["Radha M",1,false],["Arjun V",2,false],["Priya S",3,false],["Govind R",4,false]];
  const [posts, setPosts] = useState([
    { id: 1, user: "Radha Madhuri", seed: 1, time: "5m", tag: "kīrtan", content: "What a beautiful Gaurā Ārati this morning 🙏 The energy in the temple hall was transcendental! Hare Krishna! 🌸", hasImg: true, likes: 42, comments: 8, liked: false },
    { id: 2, user: "Arjun Vyas", seed: 2, time: "2h", tag: "sankīrtan", content: "Distributed 12 Bhagavad Gītā copies today at Jagadamba Junction 📚 These devotional books change lives. Hari bol!", hasImg: false, likes: 67, comments: 14, liked: true },
    { id: 3, user: "Priya Sharma", seed: 3, time: "4h", tag: "trip", content: "Just returned from Tirupati with our FOLK batch! The seva was unforgettable 🏔️ Jai Venkateshwara!", hasImg: true, likes: 89, comments: 21, liked: false },
  ]);

  const [activeStory, setActiveStory] = useState(null);

  const toggleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <div style={{ paddingBottom: 8, position: "relative", minHeight: 600 }}>
      {/* Header */}
      <div style={{ padding: "12px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>🌸 Youth Feed</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => onNav("chat")} style={{ background: C.dimmest, border: "none", borderRadius: 10, width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>💬</button>
          <button style={{ background: C.dimmest, border: "none", borderRadius: 10, width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>🔔</button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ overflowX: "auto", scrollbarWidth: "none", paddingLeft: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, paddingRight: 16 }}>
          {stories.map(([name, seed, isMe], i) => (
            <div key={i} onClick={() => setActiveStory(name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", flexShrink: 0 }}>
              <div style={{ padding: 3, borderRadius: "50%", background: isMe ? C.dimmest : `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isMe
                  ? <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.dimmest, border: `3px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.cream }}>+</div>
                  : <div style={{ border: `3px solid ${C.ink}`, borderRadius: "50%" }}><Avatar seed={seed} size={56} /></div>
                }
              </div>
              <span style={{ fontSize: 10, color: C.dimmer, fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>{name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div style={{ padding: "0 16px" }}>
        {posts.map((p) => (
          <Card key={p.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <Avatar seed={p.seed} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{p.user}</div>
                <div style={{ fontSize: 11, color: C.dimmer }}>{p.time} · <span style={{ color: C.saffron }}>#{p.tag}</span></div>
              </div>
              <button style={{ background: "none", border: "none", fontSize: 18, color: C.dimmer, cursor: "pointer" }}>⋯</button>
            </div>
            <p style={{ fontSize: 14, color: C.dimWhite, margin: "0 0 12px", lineHeight: 1.65, fontFamily: "Poppins, sans-serif" }}>{p.content}</p>
            {p.hasImg && <div style={{ height: 180, borderRadius: 14, background: `linear-gradient(135deg, ${C.peacock}66, ${C.inkMid})`, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, border: `1px solid ${C.dimmest}` }}>🌸 🏞️</div>}
            
            <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: `1px solid rgba(255,248,235,0.08)`, marginTop: 6 }}>
              <button onClick={() => toggleLike(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: p.liked ? '#E83F5B' : C.dimmer, fontSize: 13, fontWeight: 700, padding: 0, fontFamily: "Poppins, sans-serif", transition: "color 0.2s" }}>
                <span style={{ fontSize: 18, transform: p.liked ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>{p.liked ? "❤️" : "🤍"}</span>{p.likes}
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: C.dimmer, fontSize: 13, fontWeight: 700, padding: 0, fontFamily: "Poppins, sans-serif" }}>
                <span style={{ fontSize: 18 }}>💬</span>{p.comments}
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: C.dimmer, fontSize: 13, fontWeight: 700, padding: 0, fontFamily: "Poppins, sans-serif", marginLeft: "auto" }}>
                <span style={{ fontSize: 18 }}>↗️</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Button for New Post */}
      <button style={{ position: "absolute", bottom: 16, right: 16, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.saffron}, ${C.mango})`, border: "none", boxShadow: `0 8px 24px ${C.saffron}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: C.ink, cursor: "pointer", zIndex: 10 }}>
        ✍️
      </button>

      {/* Story Modal (Placeholder) */}
      {activeStory && (
        <div onClick={() => setActiveStory(null)} style={{ position: "absolute", inset: 0, background: C.overlay, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "90%", height: "80%", background: C.inkMid, borderRadius: 24, padding: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 3, background: C.saffron, borderRadius: 2 }} />
              <div style={{ flex: 1, height: 3, background: "rgba(255,248,235,0.2)", borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🌸</div>
            <div style={{ textAlign: "center", color: C.cream, fontSize: 18, fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 20 }}>{activeStory}'s Story</div>
          </div>
        </div>
      )}
    </div>
  );
};

//  SCREEN: GUIDE DASHBOARD 
const GuideDashboard = ({ onNav }) => {
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1 }}>GUIDE CONSOLE</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Govinda Prabhu</h2>
        </div>
        <div style={{ background: `${C.saffron}22`, border: `1px solid ${C.saffron}44`, borderRadius: 12, padding: "6px 12px", fontSize: 11, color: C.saffron, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>Guide</div>
      </div>

      {/* Live Event + Rotating QR */}
      <div style={{ background: `linear-gradient(135deg, ${C.peacock}, ${C.inkMid})`, borderRadius: 20, padding: "18px", marginBottom: 14, border: `1px solid ${C.peacockLight}33` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1 }}>LIVE NOW </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Bhagavad Gita Study Circle</div>
          </div>
          <div style={{ background: `${C.basil}33`, borderRadius: 10, padding: "6px 12px", fontSize: 12, color: C.basil, fontWeight: 700 }}>28 / 40</div>
        </div>
        {/* QR display */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 72, height: 72, background: C.cream, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Smart QR Active</div>
            <div style={{ fontSize: 11, color: C.dimmer, marginTop: 2 }}>Rotates every 30s  JWT secured</div>
            <div style={{ marginTop: 8 }}>
              <ProgressBar pct={60} color={C.saffron} height={4} />
              <div style={{ fontSize: 10, color: C.dimmer, marginTop: 3 }}>Refreshes in 12s</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button style={{ flex: 1, background: `${C.saffron}22`, border: `1px solid ${C.saffron}44`, borderRadius: 10, padding: "9px", color: C.saffron, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Manual Override</button>
          <button style={{ flex: 1, background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", borderRadius: 10, padding: "9px", color: C.ink, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Share QR</button>
        </div>
      </div>

      {/* Live counters */}
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>RSVP Funnel — Saturday Prasadam</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[["200","Sent",C.dimmer],["60","Coming",C.saffron],["60","Issued",C.mango],["12","Redeemed",C.basil]].map(([v,l,c]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: c, fontFamily: "Poppins, sans-serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: C.dimmer, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 10, height: 8, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: "30%", height: "100%", background: C.saffron }} />
          <div style={{ width: "30%", height: "100%", background: C.mango }} />
          <div style={{ width: "6%", height: "100%", background: C.basil }} />
          <div style={{ flex: 1, height: "100%", background: C.dimmest }} />
        </div>
      </Card>

      {/* Quick Actions */}
      <SectionTitle>Quick Actions</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[["","Broadcast Notification",""],["","Sankirtan Reviews","3 pending"],["","Accommodation Queue","2 new"],["","Mentees","8 assigned"]].map(([icon, label, badge]) => (
          <Card key={label} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{label}</div>
              {badge && <div style={{ fontSize: 10, color: C.mango, fontWeight: 700 }}>{badge}</div>}
            </div>
          </Card>
        ))}
      </div>

      {/* Mentees */}
      <SectionTitle>Today's Mentees</SectionTitle>
      {[["Prabhu Das",0,"2 rounds logged",""],["Radha Madhuri",1,"16 rounds ",""],["Arjun Vyas",2,"Not logged yet",""]].map(([name, seed, status, badge]) => (
        <div key={name} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.dimmest}` }}>
          <Avatar seed={seed} size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{name}</div>
            <div style={{ fontSize: 11, color: C.dimmer }}>{status}</div>
          </div>
          <span style={{ fontSize: 18 }}>{badge}</span>
        </div>
      ))}
    </div>
  );
};

//  SCREEN: ADMIN DASHBOARD 
const AdminDashboard = () => {
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: C.mango, fontWeight: 700, letterSpacing: 1 }}>ADMIN CONSOLE</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>HKM Visakhapatnam</h2>
        </div>
        <div style={{ background: `${C.mango}22`, border: `1px solid ${C.mango}44`, borderRadius: 12, padding: "6px 12px", fontSize: 11, color: C.mango, fontWeight: 700 }}>Admin</div>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 14 }}>
        {[["120","Active Youth",C.saffron," 8 this month"],["78%","Attendance Rate",C.basil," 4% vs last week"],["40/40","Beds Occupied",C.mango,"100% occupancy"],["?0","Payments",C.dimmer,"Demo mode"]].map(([v,l,c,sub]) => (
          <Card key={l}>
            <div style={{ fontSize: 26, fontWeight: 900, color: c, fontFamily: "Poppins, sans-serif", marginBottom: 2 }}>{v}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dimWhite, fontFamily: "Poppins, sans-serif" }}>{l}</div>
            <div style={{ fontSize: 10, color: C.dimmer, marginTop: 2 }}>{sub}</div>
          </Card>
        ))}
      </div>

      {/* Sankirtan Leaderboard */}
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle> Sankirtan Leaderboard — July</SectionTitle>
        {[["Arjun Vyas",2,340,"Gita: 28, Sets: 14"],["Radha Madhuri",1,280,"Gita: 22, Sets: 11"],["Prabhu Das",0,220,"Gita: 18, Sets: 8"]].map(([name, seed, pts, detail], i) => (
          <div key={name} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.dimmest}` : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: [C.saffron,C.dimmer,"rgba(255,255,255,0.1)"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: i === 0 ? C.ink : C.cream, fontFamily: "Poppins, sans-serif" }}>{i+1}</div>
            <Avatar seed={seed} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{name}</div>
              <div style={{ fontSize: 10, color: C.dimmer }}>{detail}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 900, color: C.saffron, fontFamily: "Poppins, sans-serif" }}>{pts}pts</div>
          </div>
        ))}
      </Card>

      {/* Moderation Queue */}
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle> Moderation Queue</SectionTitle>
        {[["Post flagged by 2 users","Review","Feed","5m"],["Sankirtan log unverified","Verify","Sankirtan","1h"],["Attendance dispute","Review","Attendance","3h"]].map(([title, action, type, time]) => (
          <div key={title} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.dimmest}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{title}</div>
              <div style={{ fontSize: 10, color: C.dimmer }}>{type}  {time} ago</div>
            </div>
            <button style={{ background: `${C.mango}22`, border: `1px solid ${C.mango}33`, borderRadius: 8, padding: "5px 12px", color: C.mango, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>{action}</button>
          </div>
        ))}
      </Card>

      {/* Residency */}
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle> Residency — Youth Hostel Block A</SectionTitle>
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: C.dimmer, fontFamily: "Poppins, sans-serif" }}>Beds 40/40 occupied</span>
            <span style={{ fontSize: 12, color: C.mango, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>Full </span>
          </div>
          <ProgressBar pct={100} color={C.mango} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["8","Approved"],["15","Total Apps"],["2","Pending"]].map(([v,l]) => <StatPill key={l} value={v} label={l} />)}
        </div>
      </Card>
    </div>
  );
};

//  SCREEN: SECURITY SCAN 
const SecurityScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [decision, setDecision] = useState(null);
  return (
    <div style={{ minHeight: 700, display: "flex", flexDirection: "column", padding: "0 16px" }}>
      {/* Header */}
      <div style={{ padding: "12px 4px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: "#FF4444", fontWeight: 700, letterSpacing: 1 }}>SECURITY  LOCKED ROLE</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Entry Scanner</h2>
        </div>
        <div style={{ background: "#FF444422", border: "1px solid #FF444444", borderRadius: 12, padding: "6px 12px", fontSize: 11, color: "#FF4444", fontWeight: 700 }}>Scanner</div>
      </div>

      {/* Camera */}
      <div style={{ background: C.inkMid, borderRadius: 24, overflow: "hidden", marginBottom: 16, position: "relative" }}>
        <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {!scanned && <>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)" }} />
            {[[0,0],[0,1],[1,0],[1,1]].map(([t,r], i) => (
              <div key={i} style={{ position: "absolute", top: t ? "auto" : 30, bottom: t ? 30 : "auto", left: r ? "auto" : 30, right: r ? 30 : "auto", width: 40, height: 40, borderTop: !t ? `3px solid #FF4444` : "none", borderBottom: t ? `3px solid #FF4444` : "none", borderLeft: !r ? `3px solid #FF4444` : "none", borderRight: r ? `3px solid #FF4444` : "none" }} />
            ))}
            <div style={{ textAlign: "center", opacity: 0.3 }}>
              <div style={{ fontSize: 48 }}></div>
              <div style={{ fontSize: 12, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Camera Active</div>
            </div>
          </>}
          {scanned && !decision && (
            <div style={{ width: "100%", padding: "20px" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <Avatar seed={3} size={60} ring />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}>Priya Sharma</div>
                  <div style={{ fontSize: 12, color: C.saffron }}>Youth  FOLK-Vizag-Students</div>
                </div>
              </div>
              <div style={{ background: `${C.peacock}44`, borderRadius: 12, padding: "12px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}> Room 3B  Bed 12  Block A</div>
                <div style={{ fontSize: 11, color: C.dimmer, marginTop: 4 }}>Valid: Jul 10–20, 2025  Pass #ACC-0042</div>
              </div>
            </div>
          )}
          {decision && (
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 64 }}>{decision === "allow" ? "" : ""}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: decision === "allow" ? C.basil : "#FF4444", fontFamily: "Poppins, sans-serif", marginTop: 8 }}>{decision === "allow" ? "ACCESS GRANTED" : "ACCESS DENIED"}</div>
              <div style={{ fontSize: 12, color: C.dimmer, marginTop: 4 }}>Logged at {new Date().toLocaleTimeString()}</div>
            </div>
          )}
        </div>
      </div>

      {!scanned && !decision && (
        <button onClick={() => setScanned(true)} style={{ background: "#FF4444", border: "none", borderRadius: 16, padding: "16px", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif", marginBottom: 12 }}>Simulate Pass Scan</button>
      )}
      {scanned && !decision && (
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setDecision("deny")} style={{ flex: 1, background: "#FF444422", border: "1px solid #FF444444", borderRadius: 16, padding: "16px", color: "#FF4444", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Deny</button>
          <button onClick={() => setDecision("allow")} style={{ flex: 2, background: `linear-gradient(135deg, ${C.basil}, #1DB800)`, border: "none", borderRadius: 16, padding: "16px", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Allow Entry</button>
        </div>
      )}
      {decision && (
        <button onClick={() => { setScanned(false); setDecision(null); }} style={{ background: C.dimmest, border: "none", borderRadius: 16, padding: "14px", color: C.dimWhite, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Scan Next</button>
      )}

      {/* Scan log */}
      <Card style={{ marginTop: 16 }}>
        <SectionTitle>Recent Scans</SectionTitle>
        {[["Prabhu Das","Allow","Accommodation","2m ago"],["Arjun Vyas","Allow","Trip Pass","5m ago"],["Guest #021","Deny","Expired coupon","12m ago"]].map(([name, dec, type, time]) => (
          <div key={name} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.dimmest}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dec === "Allow" ? C.basil : "#FF4444", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{name}  {type}</div>
              <div style={{ fontSize: 10, color: C.dimmer }}>{time}</div>
            </div>
            <Tag children={dec} color={dec === "Allow" ? C.basil : "#FF4444"} />
          </div>
        ))}
      </Card>
    </div>
  );
};

//  SCREEN: PROFILE 
const ProfileScreen = ({ onNav }) => {
  const [tab, setTab] = useState("posts");
  return (
    <div style={{ paddingBottom: 16 }}>
      {/* Cover */}
      <div style={{ height: 120, background: `linear-gradient(135deg, ${C.peacock}, ${C.ink}, ${C.saffron}44)`, position: "relative", overflow: "hidden", marginBottom: 52 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}><Lotus size={200} color={C.cream} /></div>
        <div style={{ position: "absolute", bottom: -38, left: 20 }}>
          <Avatar seed={0} size={76} ring label="PD" />
        </div>
        <button style={{ position: "absolute", top: 14, right: 16, background: "rgba(0,0,0,0.4)", border: `1px solid ${C.dimmest}`, borderRadius: 10, padding: "6px 14px", color: C.dimWhite, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Edit Profile</button>
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: C.cream, margin: 0, fontFamily: "Poppins, sans-serif" }}>Prabhu Das</h2>
            <div style={{ fontSize: 13, color: C.saffron, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>Prabodhananda Dasa  @prabhu_das</div>
          </div>
          <Tag children="Youth" color={C.peacock} />
        </div>
        <p style={{ fontSize: 13, color: C.dimWhite, lineHeight: 1.65, margin: "8px 0 16px", fontFamily: "Poppins, sans-serif" }}>FOLK Visakhapatnam  Batch: Students-Sat  Guide: Govinda Pr </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-around", background: C.inkMid, borderRadius: 16, padding: "14px", marginBottom: 16, border: `1px solid ${C.dimmest}` }}>
          {[["14","Streak"],["78%","Attend."],["340","San. Pts"],["3","Coupons"]].map(([v,l]) => <StatPill key={l} value={v} label={l} />)}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.dimmest}`, marginBottom: 14 }}>
          {["posts","sadhana","sankirtan","certificates"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: "none", border: "none", borderBottom: tab === t ? `2px solid ${C.saffron}` : "2px solid transparent", padding: "8px 0", color: tab === t ? C.cream : C.dimmer, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", textTransform: "capitalize", marginBottom: -1 }}>{t.slice(0,4)}</button>
          ))}
        </div>

        {tab === "posts" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[...Array(9)].map((_,i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: `hsl(${i*40+200}, 30%, ${12+i%3*3}%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{["","","","","","","","",""][i]}</div>)}
          </div>
        )}
        {tab === "sadhana" && (
          <div>
            {[["Jul 9","16 rounds  30min reading  Arati ",""],["Jul 8","12 rounds  20min reading",""],["Jul 7","16 rounds  45min reading  Arati ",""]].map(([date, detail, status]) => (
              <div key={date} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.dimmest}` }}>
                <span style={{ fontSize: 18 }}>{status}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{date}</div>
                  <div style={{ fontSize: 11, color: C.dimmer }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {(tab === "sankirtan" || tab === "certificates") && (
          <div style={{ textAlign: "center", padding: "32px 0", color: C.dimmer, fontSize: 13, fontFamily: "Poppins, sans-serif" }}>
            {tab === "sankirtan" ? " 3 logs pending verification" : " 1 certificate earned — Yoga for Happiness"}
          </div>
        )}
      </div>
    </div>
  );
};

//  SCREEN: CHAT 
const ChatScreen = () => {
  const threads = [
    { name: "FOLK Vizag Students ", seed: 1, last: "Govinda Pr: Don't forget arati tomorrow ", time: "2m", unread: 3, isGroup: true },
    { name: "Simhachalam Trip ", seed: 4, last: "Priya: Assembly at 4:45 AM sharp!", time: "1h", unread: 1, isGroup: true },
    { name: "Radha Madhuri", seed: 1, last: "Hare Krishna! See you at study circle", time: "3h", unread: 0, isGroup: false },
    { name: "Arjun Vyas", seed: 2, last: "Can you share the book list?", time: "5h", unread: 0, isGroup: false },
  ];
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "12px 4px 12px" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.cream, fontFamily: "Poppins, sans-serif" }}> Messages</h2>
      </div>
      <div style={{ background: C.dimmest, borderRadius: 14, padding: "10px 14px", display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <span style={{ fontSize: 16, color: C.dimmer }}></span>
        <span style={{ fontSize: 13, color: C.dimmer, fontFamily: "Poppins, sans-serif" }}>Search conversations</span>
      </div>
      {threads.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.dimmest}`, cursor: "pointer" }}>
          <div style={{ position: "relative" }}>
            <Avatar seed={t.seed} size={46} />
            {t.isGroup && <div style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, background: C.saffron, borderRadius: "50%", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}></div>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{t.name}</div>
            <div style={{ fontSize: 12, color: C.dimmer, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>{t.last}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{ fontSize: 10, color: C.dimmer, fontFamily: "Poppins, sans-serif" }}>{t.time}</div>
            {t.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg,${C.saffron},${C.mango})`, fontSize: 10, fontWeight: 900, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif" }}>{t.unread}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────
const YOUTH_NAV = [
  { id: "youth-home", icon: "⌂", label: "Home" },
  { id: "events", icon: "◎", label: "Events" },
  { id: "community", icon: "🌍", label: "Comm." },
  { id: "feed", icon: "🌸", label: "Feed" },
  { id: "sadhana", icon: "🔱", label: "Sādhana" },
  { id: "profile", icon: "◉", label: "Profile" },
];

export default function App() {
  const [screen, setScreen] = useState("landing");

  const isYouthArea = ["youth-home","events","community","feed","sadhana","profile","scan","coupons","trips","courses","sankirtan","chat","residency","attendance"].includes(screen);
  const isGuide = screen === "guide-dashboard";
  const isAdmin = screen === "admin-dashboard";
  const isSecurity = screen === "security-scan";

  const renderScreen = () => {
    switch(screen) {
      case "landing": return <LandingScreen onNav={setScreen} />;
      case "youth-home": return <YouthHome onNav={setScreen} />;
      case "sadhana": return <SadhanaScreen />;
      case "events": return <EventsScreen onNav={setScreen} />;
      case "scan": return <ScanScreen onNav={setScreen} />;
      case "coupons": return <CouponsScreen />;
      case "community": return <CommunityScreen onNav={setScreen} />;
      case "feed": return <FeedScreen onNav={setScreen} />;
      case "profile": return <ProfileScreen onNav={setScreen} />;
      case "chat": return <ChatScreen />;
      case "guide-dashboard": return <GuideDashboard onNav={setScreen} />;
      case "admin-dashboard": return <AdminDashboard />;
      case "security-scan": return <SecurityScanScreen />;
      default: return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}></div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif", marginBottom: 8 }}>{screen.charAt(0).toUpperCase()+screen.slice(1)}</div>
          <div style={{ fontSize: 13, color: C.dimmer, fontFamily: "Poppins, sans-serif", marginBottom: 24 }}>Full module — tap Back to continue</div>
          <button onClick={() => setScreen("youth-home")} style={{ background: `linear-gradient(135deg,${C.saffron},${C.mango})`, border: "none", borderRadius: 12, padding: "12px 24px", color: C.ink, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Back to Home</button>
        </div>
      );
    }
  };

  const headerLabel = isGuide ? "Guide Console" : isAdmin ? "Admin Console" : isSecurity ? "Security" : null;

  return (
    <div style={{ minHeight: "100vh", background: "#050810", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 16px", fontFamily: "Poppins, sans-serif" }}>
      <link href={fontLink} rel="stylesheet" />
      <style>{`
        @keyframes scanline { 0%,100%{top:20%} 50%{top:80%} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Screen nav pills */}
      <div style={{ marginBottom: 16, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", maxWidth: 480 }}>
        {[["landing"," Home"],["youth-home","Youth App"],["sadhana","Sadhana"],["events","Events"],["community","Community"],["scan","QR Scan"],["coupons","Coupons"],["feed","Social"],["chat","Chat"],["guide-dashboard","Guide"],["admin-dashboard","Admin"],["security-scan","Security"]].map(([s,l]) => (
          <button key={s} onClick={() => setScreen(s)} style={{ background: screen === s ? `${C.saffron}22` : "rgba(255,255,255,0.05)", border: `1px solid ${screen === s ? C.saffron+"66" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, padding: "4px 10px", color: screen === s ? C.saffron : "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>{l}</button>
        ))}
      </div>

      {/* Phone */}
      <div style={{ width: 375, borderRadius: 48, overflow: "hidden", background: C.ink, boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,248,235,0.06), inset 0 1px 0 rgba(255,255,255,0.05)` }}>
        {/* Notch */}
        <div style={{ height: 52, background: C.ink, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 8px", position: "relative" }}>
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 110, height: 30, background: "#050810", borderRadius: 20 }} />
          <span style={{ fontSize: 11, color: C.dimmer, fontWeight: 700 }}>9:41</span>
          <span style={{ fontSize: 11, color: C.dimmer }}>  </span>
        </div>

        {/* Role header strip */}
        {headerLabel && (
          <div style={{ background: isGuide ? C.peacock : isAdmin ? C.inkMid : "#1a0505", borderBottom: `1px solid ${C.dimmest}`, padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Lotus size={16} color={C.saffron} />
              <span style={{ fontSize: 12, fontWeight: 800, color: C.cream, fontFamily: "Poppins, sans-serif" }}>FOLK  HKM Visakhapatnam</span>
            </div>
            <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", fontSize: 11, color: C.dimmer, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}> Exit</button>
          </div>
        )}

        {/* Screen content */}
        <div style={{ minHeight: 600, overflowY: "auto", overflowX: "hidden", maxHeight: 650 }}>
          {renderScreen()}
        </div>

        {/* Youth bottom nav */}
        {isYouthArea && (
          <div style={{ height: 76, background: `rgba(11,16,33,0.97)`, backdropFilter: "blur(20px)", borderTop: `1px solid ${C.dimmest}`, display: "flex", alignItems: "center", padding: "0 4px 10px" }}>
            {YOUTH_NAV.map(n => <NavBtn key={n.id} icon={n.icon} label={n.label} active={screen === n.id} onClick={() => setScreen(n.id)} />)}
          </div>
        )}

        {/* Home indicator */}
        <div style={{ height: 28, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 120, height: 5, background: C.dimmest, borderRadius: 99 }} />
        </div>
      </div>

      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 16, textAlign: "center", fontFamily: "Poppins, sans-serif" }}>FOLK  HKM Visakhapatnam  Tap screen labels to switch views  Demo Mode</p>
    </div>
  );
}


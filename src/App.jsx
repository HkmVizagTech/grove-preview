import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SocketProvider, useSocket } from "./context/SocketContext";
import { C } from "./theme";
import { Avatar, Card, Btn, Tag, Bar, NavBtn, SectionRow } from "./components/UI";
import FeedScreen from "./screens/FeedScreen";
import ChatScreen from "./screens/ChatScreen";
import api from "./lib/api";

// ── AUTH GATE ──────────────────────────────────────────────────
function LoginScreen({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try { await login(form.username, form.password); }
    catch (e) { setErr(e.response?.data?.message || "Login failed"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, #FFF8F0 0%, #EBF4FF 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 48, height: 48, background: `linear-gradient(135deg,${C.saffron},#FF7A00)`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 12 }}>🪷</div>
      <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: C.text }}>Hare Krishna Youth</h1>
      <p style={{ margin: "0 0 32px", fontSize: 14, color: C.text2 }}>FOLK · HKM Visakhapatnam</p>
      <div style={{ width: "100%", maxWidth: 360, background: C.surface, borderRadius: 24, padding: 28, boxShadow: C.shadowMd }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: C.text }}>Welcome back 🙏</h2>
        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="Username" required style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text }} />
          <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} type="password" placeholder="Password" required style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text }} />
          {err && <div style={{ color: "#EF4444", fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <Btn style={{ width: "100%", padding: "13px" }}>{loading ? "Logging in..." : "Login"}</Btn>
        </form>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.text3 }}>
          New? <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.saffron, fontWeight: 700, cursor: "pointer" }}>Create account</button>
        </p>
        <hr style={{ margin: "16px 0", border: "none", borderTop: `1px solid ${C.border}` }} />
        <p style={{ textAlign: "center", fontSize: 11, color: C.text3, margin: 0 }}>Demo: skip login below ↓</p>
      </div>
    </div>
  );
}

function RegisterScreen({ onSwitch }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", username: "", password: "", spiritualName: "", role: "youth" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handle = async (ev) => {
    ev.preventDefault(); setErr(""); setLoading(true);
    try { await register(form); } catch (e) { setErr(e.response?.data?.message || "Registration failed"); } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,#FFF8F0,#EBF4FF)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 360, background: C.surface, borderRadius: 24, padding: 28, boxShadow: C.shadowMd }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: C.text }}>Join Hare Krishna Youth 🪷</h2>
        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[["name","Full Name"],["username","Username"],["spiritualName","Spiritual Name (optional)"],["password","Password"]].map(([k,pl]) => (
            <input key={k} value={form[k]} onChange={f(k)} placeholder={pl} type={k === "password" ? "password" : "text"} required={k !== "spiritualName"} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text }} />
          ))}
          <select value={form.role} onChange={f("role")} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: C.text }}>
            <option value="youth">Youth</option>
            <option value="guide">Guide</option>
            <option value="admin">Admin</option>
          </select>
          {err && <div style={{ color: "#EF4444", fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <Btn style={{ width: "100%", padding: "13px" }}>{loading ? "Creating..." : "Create Account"}</Btn>
        </form>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.text3 }}>
          Have an account? <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.saffron, fontWeight: 700, cursor: "pointer" }}>Login</button>
        </p>
      </div>
    </div>
  );
}

// ── SCREENS ────────────────────────────────────────────────────

function HomeScreen({ onNav }) {
  return (
    <div style={{ background: C.bg, minHeight: "100%" }}>
      <div style={{ background: `linear-gradient(135deg,${C.saffron}18,${C.peacockLight})`, borderBottom: `1px solid ${C.border}`, padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>JAI ŚRĪLA PRABHUPĀDA 🙏</div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text }}>Good Morning, Prabhu 👋</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: C.text2 }}>Today's streak: 14 days 🔥</p>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Sadhana card */}
        <Card style={{ marginBottom: 14, background: `linear-gradient(135deg,${C.peacock},#1589D4)`, border: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Today's Sādhana</div>
            <Tag children="On Track ✓" color="#fff" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["Japa","8/16 rounds",50],["Reading","20/30 min",67],["Ārati","1/2",50],["Vows","Kept ✓",100]].map(([label,val,pct]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{val}</div>
                <Bar pct={pct} color="#fff" />
              </div>
            ))}
          </div>
          <button onClick={() => onNav("sadhana")} style={{ width: "100%", marginTop: 12, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: 11, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Log Today's Sādhana →</button>
        </Card>

        {/* Quick actions grid */}
        <SectionRow title="Quick Actions" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
          {[["📷","Scan QR","scan"],["🎟","Wallet","coupons"],["📅","Events","events"],["🚌","Trips","trips"],["📖","Courses","courses"],["🤲","Sankīrtan","sankirtan"],["💬","Chat","chat"],["🏠","Stay","residency"]].map(([icon,label,route]) => (
            <button key={route} onClick={() => onNav(route)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", boxShadow: C.shadow }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <span style={{ fontSize: 10, color: C.text2, fontWeight: 600, textAlign: "center" }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Upcoming */}
        <SectionRow title="Upcoming Events" action="See all" onAction={() => onNav("events")} />
        {[["Bhagavad Gītā Study","Today 6:00 PM","📚"],["Yoga for Happiness","Tomorrow 7:00 AM","🧘"]].map(([title,time,icon],i) => (
          <Card key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }} onClick={() => onNav("events")}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: i === 0 ? C.saffronLight : C.peacockLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</div>
              <div style={{ fontSize: 12, color: C.text3 }}>{time}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EventsScreen({ onNav }) {
  const [tab, setTab] = useState("upcoming");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then(r => setEvents(r.data))
      .catch(() => setEvents([
        { _id: "e1", title: "Bhagavad Gītā Study Circle", date: new Date(Date.now() + 3600000), location: "ISKCON Hall A", type: "satsang", registeredUsers: [], maxCapacity: 40, icon: "📚", color: C.saffron },
        { _id: "e2", title: "Yoga for Happiness — Session 3", date: new Date(Date.now() + 86400000), location: "Meditation Hall", type: "course", registeredUsers: [], maxCapacity: 25, icon: "🧘", color: C.peacock },
        { _id: "e3", title: "Simhachalam Darshan & Seva", date: new Date(Date.now() + 7 * 86400000), location: "Temple Entrance", type: "trip", registeredUsers: [], maxCapacity: 35, icon: "🏔", color: "#7C3AED" },
      ]));
  }, []);

  const register = async (id) => {
    setEvents(ev => ev.map(e => e._id === id ? { ...e, registeredUsers: e.registeredUsers.includes("me") ? e.registeredUsers.filter(u => u !== "me") : [...e.registeredUsers, "me"] } : e));
    api.post(`/api/events/${id}/register`).catch(() => {});
  };

  return (
    <div style={{ background: C.bg, minHeight: "100%" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>📅 Events</h2>
        <button onClick={() => onNav("scan")} style={{ background: `linear-gradient(135deg,${C.saffron},#FF7A00)`, border: "none", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📷 Scan QR</button>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["upcoming","registered","past"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? C.saffron : C.surface, color: tab === t ? "#fff" : C.text2, border: `1px solid ${tab === t ? C.saffron : C.border}`, borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
        {events.map(e => {
          const registered = (e.registeredUsers || []).includes("me");
          return (
            <Card key={e._id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: `${e.color || C.saffron}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{e.icon || "📅"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>{new Date(e.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })} · {e.location}</div>
                  <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>{(e.maxCapacity - (e.registeredUsers?.length || 0))} spots left</div>
                </div>
                <Tag children={e.type} color={e.color || C.saffron} />
              </div>
              <button onClick={() => register(e._id)} style={{ width: "100%", background: registered ? C.basilLight : `${e.color || C.saffron}18`, border: `1px solid ${registered ? C.basil : (e.color || C.saffron)}33`, borderRadius: 12, padding: "10px", color: registered ? C.basil : (e.color || C.saffron), fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {registered ? "✓ Registered" : "Register →"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SadhanaScreen() {
  const [japa, setJapa] = useState(8);
  const [morning, setMorning] = useState(true);
  const [evening, setEvening] = useState(false);
  const [reading, setReading] = useState(20);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaved(true);
    api.post("/api/sadhana", { date: new Date(), japaRounds: japa, readingMinutes: reading, morningArati: morning, eveningArati: evening }).catch(() => {});
    setTimeout(() => setSaved(false), 2000);
  };

  const days = ["M","T","W","T","F","S","S"];
  const done = [true,true,true,false,true,true,false];

  return (
    <div style={{ background: C.bg, minHeight: "100%", padding: "0 0 16px" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>🔱 Sādhana Tracker</h2>
      </div>
      <div style={{ padding: "16px" }}>
        {/* Streak */}
        <Card style={{ textAlign: "center", marginBottom: 14, background: `${C.saffron}10`, border: `1px solid ${C.saffron}22` }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: C.saffron, lineHeight: 1 }}>14</div>
          <div style={{ fontSize: 12, color: C.text2, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>DAY STREAK 🔥</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {days.map((d,i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: done[i] ? C.saffron : C.surface2, border: `1px solid ${done[i] ? C.saffron : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done[i] ? "#fff" : C.text3 }}>{d}</div>
            ))}
          </div>
        </Card>

        {/* Japa counter */}
        <Card style={{ marginBottom: 14 }}>
          <SectionRow title="Japa Rounds (target: 16)" />
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <button onClick={() => setJapa(Math.max(0, japa-1))} style={{ width: 40, height: 40, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, fontSize: 20, cursor: "pointer", color: C.text }}>−</button>
            <div style={{ flex: 1, textAlign: "center", fontSize: 40, fontWeight: 900, color: C.saffron }}>{japa}</div>
            <button onClick={() => setJapa(Math.min(64, japa+1))} style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.saffron},#FF7A00)`, border: "none", fontSize: 20, cursor: "pointer", color: "#fff", fontWeight: 900 }}>+</button>
          </div>
          <Bar pct={(japa/16)*100} />
          <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>{japa}/16 rounds complete</div>
        </Card>

        {/* Reading */}
        <Card style={{ marginBottom: 14 }}>
          <SectionRow title="Śāstra Reading (target: 30 min)" />
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <button onClick={() => setReading(Math.max(0, reading-5))} style={{ width: 40, height: 40, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, fontSize: 20, cursor: "pointer", color: C.text }}>−</button>
            <div style={{ flex: 1, textAlign: "center", fontSize: 36, fontWeight: 900, color: C.peacock }}>{reading} <span style={{ fontSize: 14, color: C.text3 }}>min</span></div>
            <button onClick={() => setReading(Math.min(120, reading+5))} style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${C.peacock},#1589D4)`, border: "none", fontSize: 20, cursor: "pointer", color: "#fff" }}>+</button>
          </div>
          <Bar pct={(reading/30)*100} color={C.peacock} />
        </Card>

        {/* Ārati toggles */}
        <Card style={{ marginBottom: 20 }}>
          <SectionRow title="Ārati & Vows" />
          {[["🌅 Morning Ārati", morning, setMorning], ["🌙 Evening Ārati", evening, setEvening]].map(([label, val, set]) => (
            <div key={label} onClick={() => set(!val)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <span style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{label}</span>
              <div style={{ width: 46, height: 26, borderRadius: 13, background: val ? C.basil : C.surface2, border: `1px solid ${val ? C.basil : C.border}`, position: "relative", transition: "background 0.2s" }}>
                <div style={{ position: "absolute", top: 3, left: val ? 24 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </Card>

        <button onClick={save} style={{ width: "100%", background: saved ? C.basil : `linear-gradient(135deg,${C.saffron},#FF7A00)`, border: "none", borderRadius: 16, padding: 15, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", transition: "background 0.3s" }}>
          {saved ? "✓ Saved!" : "Save Today's Log 🙏"}
        </button>
      </div>
    </div>
  );
}

function CommunityScreen({ onNav }) {
  const [tab, setTab] = useState("circles");
  const [circles, setCircles] = useState([]);
  const [devotees, setDevotees] = useState([]);

  useEffect(() => {
    api.get("/api/community/circles")
      .then(r => setCircles(r.data))
      .catch(() => setCircles([
        { _id: "c1", name: "Bhakti Sangha Vizag", members: [1,2,3], tags: ["chanting","satsang"], joined: true },
        { _id: "c2", name: "Gītā Study Group", members: [1,2], tags: ["study","philosophy"], joined: false },
        { _id: "c3", name: "Weekend Sankīrtan", members: [1,2,3,4], tags: ["outreach","books"], joined: false },
      ]));
    api.get("/api/community/devotees")
      .then(r => setDevotees(r.data))
      .catch(() => setDevotees([
        { _id: "d1", name: "Radha Madhuri", role: "Youth Leader", avatarSeed: 1, following: true },
        { _id: "d2", name: "Arjun Vyas", role: "Sankīrtan Champ", avatarSeed: 2, following: false },
        { _id: "d3", name: "Priya Sharma", role: "Regular", avatarSeed: 3, following: false },
      ]));
  }, []);

  const toggleJoin = (id) => {
    setCircles(prev => prev.map(c => c._id === id ? { ...c, joined: !c.joined } : c));
    api.post(`/api/community/circles/${id}/join`).catch(() => {});
  };

  const toggleFollow = (id) => {
    setDevotees(prev => prev.map(d => d._id === id ? { ...d, following: !d.following } : d));
    api.post(`/api/community/follow/${id}`).catch(() => {});
  };

  return (
    <div style={{ background: C.bg, minHeight: "100%" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>🌍 Community</h2>
        <button onClick={() => onNav("chat")} style={{ width: 38, height: 38, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, fontSize: 18, cursor: "pointer" }}>💬</button>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {/* Search */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", marginBottom: 14, boxShadow: C.shadow }}>
          <span style={{ fontSize: 16, color: C.text3 }}>🔍</span>
          <input placeholder="Search circles, devotees..." style={{ background: "transparent", border: "none", flex: 1, fontSize: 14, color: C.text }} />
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["circles","devotees"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? C.saffron : C.surface, color: tab === t ? "#fff" : C.text2, border: `1px solid ${tab === t ? C.saffron : C.border}`, borderRadius: 999, padding: "7px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
        {tab === "circles" ? circles.map(c => (
          <Card key={c._id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
              <button onClick={() => toggleJoin(c._id)} style={{ background: c.joined ? C.basilLight : `${C.saffron}18`, color: c.joined ? C.basil : C.saffron, border: `1px solid ${c.joined ? C.basil : C.saffron}33`, borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                {c.joined ? "✓ Joined" : "Join"}
              </button>
            </div>
            <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>{c.members?.length || c.members} members</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {c.tags?.map(tag => <Tag key={tag} children={`#${tag}`} color={C.saffron} />)}
            </div>
          </Card>
        )) : devotees.map(d => (
          <Card key={d._id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <Avatar seed={d.avatarSeed ?? 0} size={46} ring={d.following} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{d.name}</div>
              <div style={{ fontSize: 12, color: C.text3 }}>{d.role}</div>
            </div>
            <button onClick={() => toggleFollow(d._id)} style={{ background: d.following ? C.basilLight : `${C.saffron}18`, color: d.following ? C.basil : C.saffron, border: `1px solid ${d.following ? C.basil : C.saffron}33`, borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {d.following ? "Following" : "Follow"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PlaceholderScreen({ screen, onNav }) {
  const icons = { scan:"📷", coupons:"🎟", trips:"🚌", courses:"📖", sankirtan:"🤲", residency:"🏠", attendance:"✅", profile:"👤" };
  return (
    <div style={{ background: C.bg, minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>{icons[screen] || "📱"}</div>
      <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: C.text }}>{screen.charAt(0).toUpperCase() + screen.slice(1)}</h2>
      <p style={{ margin: "0 0 24px", fontSize: 14, color: C.text2 }}>Coming soon — backend integration in progress</p>
      <Btn variant="outline" onClick={() => onNav("home")}>← Back to Home</Btn>
    </div>
  );
}

// ── NAV CONFIG ─────────────────────────────────────────────────
const YOUTH_NAV = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "events", icon: "📅", label: "Events" },
  { id: "community", icon: "🌍", label: "Comm." },
  { id: "feed", icon: "🌸", label: "Feed" },
  { id: "sadhana", icon: "🔱", label: "Sādhana" },
];

// ── MAIN INNER APP ─────────────────────────────────────────────
function InnerApp() {
  const { user, logout } = useAuth();
  const { connect } = useSocket();
  const [screen, setScreen] = useState("home");
  const [showAuth, setShowAuth] = useState("login");

  // Connect socket on login
  useEffect(() => {
    const token = localStorage.getItem("hky_token");
    if (token) connect(token);
  }, [user]);

  if (!user) {
    return showAuth === "login"
      ? <LoginScreen onSwitch={() => setShowAuth("register")} />
      : <RegisterScreen onSwitch={() => setShowAuth("login")} />;
  }

  const navScreens = ["home","events","community","feed","sadhana"];
  const showNav = navScreens.includes(screen);

  const renderScreen = () => {
    switch(screen) {
      case "home": return <HomeScreen onNav={setScreen} />;
      case "events": return <EventsScreen onNav={setScreen} />;
      case "community": return <CommunityScreen onNav={setScreen} />;
      case "feed": return <FeedScreen onNav={setScreen} />;
      case "sadhana": return <SadhanaScreen />;
      case "chat": return <ChatScreen />;
      default: return <PlaceholderScreen screen={screen} onNav={setScreen} />;
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", background: C.bg, position: "relative" }}>
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: showNav ? 72 : 0 }}>
        {renderScreen()}
      </div>

      {/* Bottom navigation */}
      {showNav && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, height: 68, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 50 }}>
          {YOUTH_NAV.map(n => <NavBtn key={n.id} icon={n.icon} label={n.label} active={screen === n.id} onClick={() => setScreen(n.id)} />)}
        </div>
      )}
    </div>
  );
}

// ── ROOT EXPORT ────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <InnerApp />
      </SocketProvider>
    </AuthProvider>
  );
}

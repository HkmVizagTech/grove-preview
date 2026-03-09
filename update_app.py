import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix mangled emojis
replacements = {
    'icon: ""': 'icon: "🚌"',
    'icon: "", color: C.saffron': 'icon: "📿", color: C.saffron',
    'icon: "", color: C.peacock': 'icon: "🧘", color: C.peacock',
    'icon: "", color: C.basil': 'icon: "📚", color: C.basil',
    'icon: "", color: "#C44D00"': 'icon: "🎡", color: "#C44D00"',
    'icon: "", color: "#6B0F4C"': 'icon: "🌙", color: "#6B0F4C"',
    '["","Scan QR","scan"]': '["📷","Scan QR","scan"]',
    '["","Wallet","coupons"]': '["🎟","Wallet","coupons"]',
    '["","Events","events"]': '["🗓","Events","events"]',
    '["","Trips","trips"]': '["🏕","Trips","trips"]',
    '["","Courses","courses"]': '["📖","Courses","courses"]',
    '["","Sankirtan","sankirtan"]': '["🤲","Sankīrtan","sankirtan"]',
    '["","Chat","chat"]': '["💬","Chat","chat"]',
    '["","Stay","residency"]': '["🏠","Stay","residency"]',
    'JAI SRILA PRABHUPADA ': 'JAI ŚRĪLA PRABHUPĀDA 🙏',
    ' Day 14 Streak': '🔱 Day 14 Streak',
    '["","Sastra Reading","30 min"]': '["📖","Śāstra Reading","30 min"]',
    '["","Arati / Temple Visit","Morning arati"]': '["🕉","Ārati / Temple Visit","Morning ārati"]',
    '["","Vows","Maintained today"]': '["🙏","Vows","Maintained today"]',
    ' Save Today\\'s Log ' : 'Save Today\\'s Log 🙏',
    '["","7-Day","Lotus"]': '["🌸","7-Day","Lotus"]',
    '["","First Arati","Early Bird"]': '["🏆","First Ārati","Early Bird"]',
    '["","100 Rounds","Japa Hero"]': '["📿","100 Rounds","Japa Hero"]',
    '> Scan QR<': '> 📷 Scan QR<',
    '<span style={{ fontSize: 48 }}></span>': '<span style={{ fontSize: 48 }}>✅</span>',
    ' Attendance Marked ': '✅ Attendance Marked ',
    ' Coupon Wallet<': '🎟 Coupon Wallet<',
    '<span style={{ fontSize: 36 }}></span>': '<span style={{ fontSize: 36 }}>🍛</span>',
    ' Coming! &mdash; Claim Coupon<': '🙌 Coming! &mdash; Claim Coupon<',
    'fontSize: 40 }}></div>': 'fontSize: 40 }}>▦</div>',
    '["","Broadcast Notification",""]': '["📣","Broadcast Notification",""]',
    '["","Sankirtan Reviews","3 pending"]': '["✅","Sankīrtan Reviews","3 pending"]',
    '["","Accommodation Queue","2 new"]': '["🏠","Accommodation Queue","2 new"]',
    '["","Mentees","8 assigned"]': '["🔍","Mentees","8 assigned"]',
    ' LIVE NOW ': 'LIVE NOW 🔴',
    'fontSize: 48 }}></div>': 'fontSize: 48 }}>📷</div>',
    'decision === "allow" ? "" : ""': 'decision === "allow" ? "✅" : "❌"',
    ' Deny<': '✗ Deny<',
    ' Allow Entry<': '✓ Allow Entry<',
    '["youth-home", icon: "", label: "Home"]': '["youth-home", icon: "⌂", label: "Home"]',
    '{ id: "events", icon: "", label: "Events" }': '{ id: "events", icon: "◎", label: "Events" }',
    '{ id: "feed", icon: "", label: "Feed" }': '{ id: "feed", icon: "🌸", label: "Feed" }',
    '{ id: "community", icon: "", label: "Comm." }': '{ id: "community", icon: "🌍", label: "Comm." }',
    '{ id: "sadhana", icon: "", label: "Sadhana" }': '{ id: "sadhana", icon: "🔱", label: "Sādhana" }',
    '{ id: "profile", icon: "", label: "Profile" }': '{ id: "profile", icon: "◉", label: "Profile" }',
    '{["","","","","","","","",""][i]}': '{["🌸","📿","🚌","📚","🧘","🙏","🎡","🌅","🎵"][i]}',
    '["Jul 9","16 rounds  30min reading  Arati ",""]': '["Jul 9","16 rounds  30min reading  Ārati ✓","✅"]',
    '["Jul 8","12 rounds  20min reading",""]': '["Jul 8","12 rounds  20min reading","⚠"]',
    '["Jul 7","16 rounds  45min reading  Arati ",""]': '["Jul 7","16 rounds  45min reading  Ārati ✓","✅"]',
    ' 3 logs pending verification': '📚 3 logs pending verification',
    ' 1 certificate earned — Yoga for Happiness': '🏆 1 certificate earned — Yoga for Happiness',
    ' Messages<': '💬 Messages<',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# 1. Add CommunityScreen and improve FeedScreen
community_code = '''
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
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#FFF8EB', fontFamily: "Poppins, sans-serif" }}>🌍 Community</h2>
        <button onClick={() => onNav("chat")} style={{ background: 'rgba(255,248,235,0.12)', border: "none", borderRadius: 10, width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>💬</button>
      </div>

      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ background: 'rgba(255,248,235,0.12)', borderRadius: 14, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 16, color: 'rgba(255,248,235,0.35)' }}>🔍</span>
          <input 
            placeholder="Search circles, devotees..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", color: '#FFF8EB', fontSize: 13, flex: 1, outline: "none", fontFamily: "Poppins, sans-serif" }} 
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 16px", marginBottom: 16 }}>
        {["circles", "devotees"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? 'linear-gradient(135deg, #FFB000, #FF7A00)' : 'rgba(255,248,235,0.12)',
            border: "none", borderRadius: 20, padding: "7px 16px",
            color: tab === t ? '#0B1021' : 'rgba(255,248,235,0.7)', fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", textTransform: "capitalize"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        {tab === "circles" ? (
          circles.map((c, i) => (
            <div key={i} style={{ background: '#1E2D52', border: '1px solid rgba(255,248,235,0.12)', borderRadius: 20, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#FFF8EB', fontFamily: "Poppins, sans-serif" }}>{c.name}</div>
                <button style={{ background: c.joined ? 'rgba(255,248,235,0.12)' : '#FFB000', border: "none", borderRadius: 12, padding: "6px 14px", color: c.joined ? 'rgba(255,248,235,0.7)' : '#0B1021', fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                  {c.joined ? "Joined" : "Join"}
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,248,235,0.35)', marginBottom: 8 }}>{c.members} members</div>
              <div style={{ display: "flex", gap: 6 }}>
                {c.tags.map(tag => (
                  <span key={tag} style={{ background: '#FFB00022', border: '1px solid #FFB00044', color: '#FFB000', borderRadius: 8, padding: "3px 9px", fontSize: 11, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>#{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          devotees.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: '#1E2D52', border: '1px solid rgba(255,248,235,0.12)', borderRadius: 20, padding: 16, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${d.seed*40},70%,50%), hsl(${d.seed*40+40},70%,50%))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "Poppins, sans-serif" }}>{d.name.split(" ").map(n=>n[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF8EB', fontFamily: "Poppins, sans-serif" }}>{d.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,248,235,0.35)' }}>{d.role}</div>
              </div>
              <button style={{ background: d.following ? 'rgba(255,248,235,0.12)' : 'linear-gradient(135deg, #FFB000, #FF7A00)', border: "none", borderRadius: 12, padding: "6px 14px", color: d.following ? 'rgba(255,248,235,0.7)' : '#0B1021', fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                {d.following ? "Following" : "Follow"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
'''

improved_feed_code = '''
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
              <div style={{ padding: 3, borderRadius: "50%", background: isMe ? C.dimmest : `linear-gradient(135deg, ${C.saffron}, ${C.mango})` }}>
                {isMe
                  ? <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.dimmest, border: `2px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.cream }}>+</div>
                  : <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${seed*40},70%,50%), hsl(${seed*40+40},70%,50%))`, border: `2px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Poppins, sans-serif" }}>{name.split(" ").map(n=>n[0]).join("")}</div>
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
          <div key={p.id} style={{ background: C.inkMid, border: `1px solid ${C.dimmest}`, borderRadius: 20, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${p.seed*40},70%,50%), hsl(${p.seed*40+40},70%,50%))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "Poppins, sans-serif" }}>{p.user.split(" ").map(n=>n[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, fontFamily: "Poppins, sans-serif" }}>{p.user}</div>
                <div style={{ fontSize: 11, color: C.dimmer }}>{p.time} · <span style={{ color: C.saffron }}>#{p.tag}</span></div>
              </div>
              <button style={{ background: "none", border: "none", fontSize: 18, color: C.dimmer, cursor: "pointer" }}>⋯</button>
            </div>
            <p style={{ fontSize: 14, color: C.dimWhite, margin: "0 0 12px", lineHeight: 1.65, fontFamily: "Poppins, sans-serif" }}>{p.content}</p>
            {p.hasImg && <div style={{ height: 180, borderRadius: 14, background: `linear-gradient(135deg, ${C.peacock}66, ${C.inkMid})`, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, border: `1px solid ${C.dimmest}` }}>🌸 🏞️</div>}
            
            <div style={{ display: "flex", gap: 20, paddingTop: 8, borderTop: `1px solid rgba(255,248,235,0.08)` }}>
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
          </div>
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
'''

# Replacing FeedScreen
feed_match = re.search(r'(// ─── SCREEN: SOCIAL FEED.*?)(?=\n// ─── SCREEN: GUIDE DASHBOARD)', content, re.DOTALL)
if feed_match:
    content = content.replace(feed_match.group(1), community_code + "\n\n" + improved_feed_code)
elif re.search(r'(//  SCREEN: SOCIAL FEED.*?)(?=\n//  SCREEN: GUIDE DASHBOARD)', content, re.DOTALL):
    feed_match = re.search(r'(//  SCREEN: SOCIAL FEED.*?)(?=\n//  SCREEN: GUIDE DASHBOARD)', content, re.DOTALL)
    content = content.replace(feed_match.group(1), community_code + "\n\n" + improved_feed_code)

# Add community to YOUTH_NAV if not already there
new_youth_nav = '''const YOUTH_NAV = [
  { id: "youth-home", icon: "⌂", label: "Home" },
  { id: "events", icon: "◎", label: "Events" },
  { id: "community", icon: "🌍", label: "Comm." },
  { id: "feed", icon: "🌸", label: "Feed" },
  { id: "sadhana", icon: "🔱", label: "Sādhana" },
  { id: "profile", icon: "◉", label: "Profile" },
];'''

# Replace YOUTH NAV block
content = re.sub(r'const YOUTH_NAV = \[[^\]]*\];', new_youth_nav, content, flags=re.DOTALL)

# Add Community Screen cases
content = content.replace('case "feed": return <FeedScreen onNav={setScreen} />;', 'case "community": return <CommunityScreen onNav={setScreen} />;\n      case "feed": return <FeedScreen onNav={setScreen} />;')

# Add to pills array (demo buttons)
content = content.replace('["feed","Social"]', '["community","Community"],["feed","Social"]')

# Add 'community' to isYouthArea array
if '"community"' not in content:
   content = content.replace('"feed","sadhana"', '"community","feed","sadhana"')

# Re-ensure emojis exist on Nav pills that I explicitly want
content = content.replace('["events","Events"],["scan","QR Scan"]', '["events","📅 Events"],["scan","📷 QR Scan"]')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("App updated successfully with CommunityScreen, improved FeedScreen, and fixes.")

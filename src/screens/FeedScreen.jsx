import { useState, useEffect } from "react";
import { C } from "../theme";
import { Card, Btn, Avatar, Tag, Bar, SectionRow } from "../components/UI";
import api from "../lib/api";
import { useSocket } from "../context/SocketContext";

export default function FeedScreen({ onNav }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const { socket } = useSocket();

  const stories = [
    ["You", 0, true], ["Radha M", 1, false], ["Arjun V", 2, false],
    ["Priya S", 3, false], ["Govind R", 4, false],
  ];

  // Fetch posts from API (or fallback to mock)
  useEffect(() => {
    api.get("/api/posts")
      .then(r => setPosts(r.data))
      .catch(() => setPosts([
        { _id: "1", author: { name: "Radha Madhuri", avatarSeed: 1 }, content: "What a beautiful Gaurā Ārati this morning 🙏 The energy in the temple hall was transcendental! Hare Krishna! 🌸", tag: "kīrtan", likes: [], comments: [], createdAt: new Date(Date.now() - 5 * 60000) },
        { _id: "2", author: { name: "Arjun Vyas", avatarSeed: 2 }, content: "Distributed 12 Bhagavad Gītā copies today at Jagadamba Junction 📚 These devotional books change lives. Hari bol!", tag: "sankīrtan", likes: ["me"], comments: [], createdAt: new Date(Date.now() - 2 * 3600000) },
        { _id: "3", author: { name: "Priya Sharma", avatarSeed: 3 }, content: "Just returned from Tirupati with our FOLK batch! The seva was unforgettable 🏔️ Jai Venkateshwara!", tag: "trip", likes: [], comments: [], createdAt: new Date(Date.now() - 4 * 3600000) },
      ]))
      .finally(() => setLoading(false));
  }, []);

  // Real-time like updates
  useEffect(() => {
    if (!socket) return;
    socket.on("post_liked", ({ postId, likes }) => {
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes } : p));
    });
    socket.on("new_post", (post) => {
      setPosts(prev => [post, ...prev]);
    });
    return () => { socket.off("post_liked"); socket.off("new_post"); };
  }, [socket]);

  const toggleLike = async (postId) => {
    // Optimistic update
    setPosts(prev => prev.map(p => {
      if (p._id !== postId) return p;
      const liked = p.likes.includes("me");
      return { ...p, likes: liked ? p.likes.filter(l => l !== "me") : [...p.likes, "me"] };
    }));
    try {
      await api.post(`/api/posts/${postId}/like`);
    } catch { /* revert on error if needed */ }
  };

  const submitPost = async () => {
    if (!draft.trim()) return;
    try {
      await api.post("/api/posts", { content: draft });
      setDraft(""); setComposing(false);
    } catch {
      // Optimistic local add
      setPosts(prev => [{ _id: Date.now().toString(), author: { name: "You", avatarSeed: 0 }, content: draft, tag: "", likes: [], comments: [], createdAt: new Date() }, ...prev]);
      setDraft(""); setComposing(false);
    }
  };

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  return (
    <div style={{ minHeight: "100%", background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: C.saffron, fontWeight: 700, letterSpacing: 1 }}>HARE KRISHNA YOUTH</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>Youth Feed 🌸</h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onNav("chat")} style={{ width: 38, height: 38, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, fontSize: 18, cursor: "pointer" }}>💬</button>
          <button style={{ width: 38, height: 38, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, fontSize: 18, cursor: "pointer" }}>🔔</button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 0" }}>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingLeft: 16, paddingRight: 16, scrollbarWidth: "none" }}>
          {stories.map(([name, seed, isMe], i) => (
            <div key={i} onClick={() => !isMe && setActiveStory(name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 }}>
              <div style={{ padding: 2.5, borderRadius: "50%", background: isMe ? C.surface2 : `linear-gradient(135deg,${C.saffron},#FF7A00)` }}>
                {isMe
                  ? <div style={{ width: 54, height: 54, borderRadius: "50%", background: C.surface2, border: `2px solid ${C.surface}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: C.text3 }}>+</div>
                  : <div style={{ border: `2px solid ${C.surface}`, borderRadius: "50%" }}><Avatar seed={seed} size={54} /></div>
                }
              </div>
              <span style={{ fontSize: 10, color: C.text2, fontWeight: 600 }}>{name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compose */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar seed={0} size={38} />
        {composing ? (
          <div style={{ flex: 1 }}>
            <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Share something inspiring... 🙏" rows={3} style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", fontSize: 14, color: C.text, resize: "none" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Btn onClick={submitPost} small>Post ✍️</Btn>
              <Btn variant="ghost" onClick={() => setComposing(false)} small>Cancel</Btn>
            </div>
          </div>
        ) : (
          <button onClick={() => setComposing(true)} style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", color: C.text3, fontSize: 14, cursor: "text", textAlign: "left" }}>
            Share something inspiring... 🙏
          </button>
        )}
      </div>

      {/* Posts */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} style={{ background: C.surface, borderRadius: 20, padding: 16, border: `1px solid ${C.border}` }}>
              <div className="skeleton" style={{ height: 40, marginBottom: 10 }} />
              <div className="skeleton" style={{ height: 60 }} />
            </div>
          ))
        ) : posts.map(p => {
          const liked = p.likes.includes("me");
          return (
            <Card key={p._id} style={{ animation: "fadeUp 0.3s ease" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <Avatar seed={p.author?.avatarSeed ?? 0} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p.author?.name || "Unknown"}</div>
                  <div style={{ fontSize: 11, color: C.text3 }}>{timeAgo(p.createdAt)} {p.tag && <span style={{ color: C.saffron }}>· #{p.tag}</span>}</div>
                </div>
                <button style={{ background: "none", border: "none", fontSize: 18, color: C.text3, cursor: "pointer" }}>⋯</button>
              </div>
              <p style={{ fontSize: 14, color: C.text2, margin: "0 0 12px", lineHeight: 1.65 }}>{p.content}</p>
              <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => toggleLike(p._id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: liked ? "#E83F5B" : C.text3, fontSize: 13, fontWeight: 600 }}>
                  <span style={{ fontSize: 18, transition: "transform 0.2s", transform: liked ? "scale(1.15)" : "scale(1)" }}>{liked ? "❤️" : "🤍"}</span>
                  {p.likes.length}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: C.text3, fontSize: 13, fontWeight: 600 }}>
                  <span style={{ fontSize: 18 }}>💬</span>{p.comments.length}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: C.text3, fontSize: 13, fontWeight: 600, marginLeft: "auto" }}>
                  <span style={{ fontSize: 18 }}>↗️</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div onClick={() => setActiveStory(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 320, height: 500, background: C.surface, borderRadius: 28, padding: 20, display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 3, background: C.saffron, borderRadius: 2 }} />
              <div style={{ flex: 1, height: 3, background: C.border, borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🌸</div>
            <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: C.text }}>{activeStory}'s Story</div>
            <div style={{ textAlign: "center", fontSize: 12, color: C.text3, marginTop: 4 }}>Tap to close</div>
          </div>
        </div>
      )}
    </div>
  );
}

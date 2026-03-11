import { useState, useEffect, useRef } from "react";
import { C } from "../theme";
import { Avatar, Card, Btn } from "../components/UI";
import api from "../lib/api";
import { useSocket } from "../context/SocketContext";

export default function ChatScreen() {
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const bottomRef = useRef(null);
  const { socket } = useSocket();

  // Fetch threads
  useEffect(() => {
    api.get("/api/chat")
      .then(r => setThreads(r.data))
      .catch(() => setThreads([
        { _id: "t1", name: "FOLK Vizag Students 🌸", isGroup: true, lastMessage: "Govinda Pr: Don't forget ārati tomorrow!", updatedAt: new Date(Date.now() - 120000), participants: [{ avatarSeed: 1 }] },
        { _id: "t2", name: "Simhachalam Trip 🚌", isGroup: true, lastMessage: "Priya: Assembly at 4:45 AM sharp!", updatedAt: new Date(Date.now() - 3600000), participants: [{ avatarSeed: 4 }] },
        { _id: "t3", name: "Radha Madhuri", isGroup: false, lastMessage: "Hare Krishna! See you at study circle 🙏", updatedAt: new Date(Date.now() - 10800000), participants: [{ avatarSeed: 1 }] },
      ]));
  }, []);

  // Open thread and load messages
  const openThread = async (thread) => {
    setActiveThread(thread);
    if (socket) {
      socket.emit("join_thread", thread._id);
    }
    try {
      const r = await api.get(`/api/chat/${thread._id}`);
      setMessages(r.data.messages || []);
    } catch {
      setMessages([
        { _id: "m1", sender: { name: "Govinda Pr", avatarSeed: 4 }, text: "Hare Krishna! Don't forget ārati at 6 PM 🙏", createdAt: new Date(Date.now() - 7200000) },
        { _id: "m2", sender: { name: "Priya", avatarSeed: 3 }, text: "Yes prabhu! I'll be there 🌸", createdAt: new Date(Date.now() - 7100000) },
      ]);
    }
  };

  // Socket events
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", ({ threadId, message }) => {
      if (activeThread?._id === threadId) {
        setMessages(prev => [...prev, message]);
      }
    });
    socket.on("user_typing", ({ name }) => setTypingUser(name));
    socket.on("user_stop_typing", () => setTypingUser(null));
    return () => { socket.off("receive_message"); socket.off("user_typing"); socket.off("user_stop_typing"); };
  }, [socket, activeThread]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!draft.trim() || !activeThread) return;
    const text = draft;
    setDraft("");

    // Optimistic
    setMessages(prev => [...prev, { _id: Date.now().toString(), sender: { name: "You", avatarSeed: 0 }, text, createdAt: new Date() }]);

    if (socket) {
      socket.emit("send_message", { threadId: activeThread._id, text });
      socket.emit("stop_typing", { threadId: activeThread._id });
    } else {
      await api.post(`/api/chat`, { threadId: activeThread._id, text }).catch(() => { });
    }
  };

  const timeAgo = (d) => {
    const diff = (Date.now() - new Date(d)) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  // Thread list view
  if (!activeThread) return (
    <div style={{ background: C.bg, minHeight: "100%" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>💬 Vani</h2>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 16, color: C.text3 }}>🔍</span>
          <span style={{ fontSize: 13, color: C.text3 }}>Search conversations</span>
        </div>
        {threads.map(t => (
          <div key={t._id} onClick={() => openThread(t)} style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
            <div style={{ position: "relative" }}>
              <Avatar seed={t.participants?.[0]?.avatarSeed ?? 0} size={48} />
              {t.isGroup && <div style={{ position: "absolute", bottom: -2, right: -2, background: C.saffron, borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>👥</div>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.name}</div>
              <div style={{ fontSize: 12, color: C.text3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.lastMessage}</div>
            </div>
            <div style={{ fontSize: 10, color: C.text3, flexShrink: 0 }}>{timeAgo(t.updatedAt)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Active chat view
  return (
    <div style={{ background: C.bg, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", gap: 12, alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => { setActiveThread(null); if (socket) socket.emit("leave_thread", activeThread._id); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.text }}>←</button>
        <Avatar seed={activeThread.participants?.[0]?.avatarSeed ?? 0} size={36} ring />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{activeThread.name}</div>
          {typingUser && <div style={{ fontSize: 11, color: C.saffron }}>{typingUser} is typing...</div>}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m, i) => {
          const isMe = m.sender?.name === "You";
          return (
            <div key={m._id || i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
              {!isMe && <Avatar seed={m.sender?.avatarSeed ?? 0} size={28} />}
              <div style={{ maxWidth: "70%", background: isMe ? C.saffron : C.surface, color: isMe ? "#fff" : C.text, border: isMe ? "none" : `1px solid ${C.border}`, borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", fontSize: 14, lineHeight: 1.55, boxShadow: C.shadow }}>
                {!isMe && <div style={{ fontSize: 11, fontWeight: 700, color: C.saffron, marginBottom: 3 }}>{m.sender?.name}</div>}
                {m.text}
                <div style={{ fontSize: 9, color: isMe ? "rgba(255,255,255,0.6)" : C.text3, marginTop: 4, textAlign: "right" }}>{timeAgo(m.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", gap: 10, alignItems: "flex-end" }}>
        <input
          value={draft}
          onChange={e => {
            setDraft(e.target.value);
            if (socket) socket.emit("typing", { threadId: activeThread._id });
          }}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
          onBlur={() => socket?.emit("stop_typing", { threadId: activeThread._id })}
          placeholder="Message..."
          style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 14px", fontSize: 14, color: C.text }}
        />
        <button onClick={sendMessage} style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg,${C.saffron},#FF7A00)`, border: "none", fontSize: 18, cursor: "pointer" }}>↑</button>
      </div>
    </div>
  );
}

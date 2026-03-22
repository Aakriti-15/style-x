import { useState, useRef, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const SYSTEM_PROMPT = `You are StyleX, a sophisticated yet warm AI fashion advisor for women. 
You have the expertise of a Vogue editor combined with the warmth of a best friend.
You give specific, actionable outfit advice considering occasion, body type, season, budget, and personal style.
You suggest exact color combinations, specific clothing pieces, accessories, layering tips, and styling hacks.
Use light elegant emojis sparingly. Keep responses to 4-6 sentences — rich but digestible.
Always make the user feel confident, seen, and stylish. Sign off sometimes with a short style tip.`;

const QUICK_PROMPTS = [
  { icon: "🌿", label: "Casual day out" },
  { icon: "🌹", label: "Date night" },
  { icon: "💼", label: "Office look" },
  { icon: "☀️", label: "Summer outfit" },
  { icon: "💐", label: "Wedding guest" },
  { icon: "🧣", label: "Winter layers" },
  { icon: "🎉", label: "Party outfit" },
  { icon: "✈️", label: "Travel style" }
];

const STYLE_CATEGORIES = [
  { icon: "👗", label: "Outfits" },
  { icon: "🎨", label: "Colors" },
  { icon: "👤", label: "Body Type" },
  { icon: "📅", label: "Occasions" },
  { icon: "🧴", label: "Capsule" },
  { icon: "🌍", label: "Trends" }
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to StyleX ✦\n\nI'm your personal AI stylist — think of me as your fashion-forward best friend who's always ready to help you look incredible.\n\nTell me about an occasion, your mood, what's in your wardrobe, or just ask me anything style-related. What are we creating today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("Outfits");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    setError("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

    const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: userText }
    ],
    max_tokens: 500,
    temperature: 0.8
  },
  {
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

const botReply = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { role: "bot", text: botReply }]);
    } catch {
      setError("Something went wrong. Check your API key or try again ✦");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "220px 1fr",
      background: "var(--cream)",
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(249,197,209,0.3)",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{ marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "3px",
            color: "var(--plum)",
            textTransform: "uppercase"
          }}>StyleX</div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-soft)", letterSpacing: "1px", marginTop: "2px" }}>AI STYLIST</div>
        </div>
        <div style={{ fontSize: "0.65rem", color: "var(--text-soft)", letterSpacing: "1.5px", fontWeight: "600", textTransform: "uppercase", paddingLeft: "0.5rem", marginBottom: "0.3rem" }}>
          Categories
        </div>
        {STYLE_CATEGORIES.map(cat => (
          <button key={cat.label} onClick={() => { setActiveCategory(cat.label); sendMessage(`Give me ${cat.label} advice`); }}
            style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              padding: "0.65rem 0.75rem", borderRadius: "12px",
              border: "none", cursor: "pointer",
              background: activeCategory === cat.label
                ? "linear-gradient(135deg, rgba(249,197,209,0.4), rgba(201,160,196,0.2))"
                : "transparent",
              color: activeCategory === cat.label ? "var(--plum)" : "var(--text-soft)",
              fontWeight: activeCategory === cat.label ? "600" : "400",
              fontSize: "0.85rem",
              transition: "all 0.2s",
              textAlign: "left",
              fontFamily: "'Outfit', sans-serif"
            }}
            onMouseEnter={e => { if (activeCategory !== cat.label) e.currentTarget.style.background = "rgba(249,197,209,0.15)"; }}
            onMouseLeave={e => { if (activeCategory !== cat.label) e.currentTarget.style.background = "transparent"; }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "0.75rem", background: "rgba(249,197,209,0.1)", borderRadius: "12px", border: "1px solid rgba(249,197,209,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#66bb6a", boxShadow: "0 0 6px #66bb6a" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: "600", color: "var(--text-mid)" }}>StyleX Online</span>
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-soft)", lineHeight: "1.4" }}>Powered by Gemini AI</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid rgba(249,197,209,0.2)",
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-dark)" }}>Fashion Chat</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-soft)" }}>Ask me anything about style, outfits & fashion ✦</p>
          </div>
          <div style={{
            background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)",
            borderRadius: "999px", padding: "0.3rem 0.8rem",
            fontSize: "0.72rem", color: "var(--gold)", fontWeight: "600", letterSpacing: "0.5px"
          }}>
            ✦ AI Powered
          </div>
        </div>


        <div style={{
          flex: 1, overflowY: "auto", padding: "2rem",
          display: "flex", flexDirection: "column", gap: "1rem"
        }}>

          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              gap: "0.75rem",
              alignItems: "flex-start",
              animation: "fadeUp 0.3s ease"
            }}>
       
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                background: msg.role === "bot"
                  ? "linear-gradient(135deg, #c9a0c4, #f0899a)"
                  : "linear-gradient(135deg, #d4a853, #f9c5d1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", boxShadow: "0 2px 8px rgba(201,160,196,0.3)"
              }}>
                {msg.role === "bot" ? "✦" : "👤"}
              </div>

              <div style={{ maxWidth: "65%", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div style={{
                  fontSize: "0.7rem", color: "var(--text-soft)", fontWeight: "500",
                  textAlign: msg.role === "user" ? "right" : "left",
                  letterSpacing: "0.5px"
                }}>
                  {msg.role === "bot" ? "STYLEX" : "YOU"}
                </div>
                <div style={{
                  padding: "1rem 1.3rem",
                  borderRadius: msg.role === "user" ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #c9a0c4, #f0899a)"
                    : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  border: msg.role === "bot" ? "1px solid rgba(249,197,209,0.3)" : "none",
                  color: msg.role === "user" ? "white" : "var(--text-dark)",
                  fontSize: "0.9rem",
                  lineHeight: "1.7",
                  boxShadow: msg.role === "bot"
                    ? "0 4px 20px rgba(201,160,196,0.12)"
                    : "0 4px 20px rgba(240,137,154,0.2)",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a0c4, #f0899a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem"
              }}>✦</div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-soft)", marginBottom: "0.3rem", letterSpacing: "0.5px" }}>STYLEX</div>
                <TypingIndicator />
              </div>
            </div>
          )}

          {error && (
            <div style={{
              background: "rgba(249,197,209,0.15)", border: "1px solid rgba(249,197,209,0.4)",
              borderRadius: "16px", padding: "1rem 1.3rem",
              color: "var(--blush-deep)", fontSize: "0.85rem", textAlign: "center"
            }}>{error}</div>
          )}

          <div ref={bottomRef} />
        </div>
        {messages.length <= 1 && (
          <div style={{ padding: "0 2rem 1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-soft)", letterSpacing: "1px", fontWeight: "600", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Quick Start
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {QUICK_PROMPTS.map(p => (
                <button key={p.label} onClick={() => sendMessage(p.label)} style={{
                  background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(249,197,209,0.4)", borderRadius: "999px",
                  padding: "0.5rem 1rem", fontSize: "0.82rem", color: "var(--text-mid)",
                  cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.3rem",
                  transition: "all 0.2s", fontFamily: "'Outfit', sans-serif"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,197,209,0.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{
          padding: "1rem 2rem 1.5rem",
          borderTop: "1px solid rgba(249,197,209,0.2)",
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            display: "flex", gap: "0.75rem", alignItems: "center",
            background: "rgba(255,255,255,0.85)",
            border: "1.5px solid rgba(249,197,209,0.4)",
            borderRadius: "999px",
            padding: "0.5rem 0.5rem 0.5rem 1.5rem",
            boxShadow: "0 4px 20px rgba(249,197,209,0.12)",
            transition: "border 0.2s"
          }}
            onFocus={e => e.currentTarget.style.borderColor = "rgba(201,160,196,0.6)"}
            onBlur={e => e.currentTarget.style.borderColor = "rgba(249,197,209,0.4)"}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask StyleX about your outfit..."
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: "0.9rem", color: "var(--text-dark)",
                background: "transparent", fontFamily: "'Outfit', sans-serif"
              }}
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{
              background: loading || !input.trim()
                ? "rgba(201,160,196,0.3)"
                : "linear-gradient(135deg, #c9a0c4, #f0899a)",
              color: "white", border: "none", borderRadius: "999px",
              padding: "0.7rem 1.5rem", fontSize: "0.85rem", fontWeight: "600",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s", fontFamily: "'Outfit', sans-serif",
              boxShadow: loading || !input.trim() ? "none" : "0 4px 16px rgba(240,137,154,0.3)"
            }}>
              {loading ? "..." : "Send ✦"}
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "0.6rem", fontSize: "0.68rem", color: "var(--text-soft)" }}>
            StyleX · AI Fashion Advisor · Powered by Gemini
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 220px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
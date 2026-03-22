import { useEffect, useState } from "react";

const floatingItems = ["👗", "👠", "💄", "👜", "💍", "🧣", "👒", "✨"];

export default function LandingPage({ onStart }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #fdf0f5 0%, #f5e6f0 40%, #ede0f5 70%, #fdf6f0 100%)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>

      
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,197,209,0.4) 0%, transparent 70%)",
        animation: "blobMove 8s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,160,196,0.3) 0%, transparent 70%)",
        animation: "blobMove 10s ease-in-out infinite reverse",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "20%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)",
        animation: "blobMove 12s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      {floatingItems.map((item, i) => (
        <div key={i} style={{
          position: "absolute",
          fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          top: `${10 + (i * 11) % 80}%`,
          left: `${5 + (i * 13) % 90}%`,
          opacity: 0.15,
          animation: `float ${4 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`,
          pointerEvents: "none",
          filter: "blur(0.5px)"
        }}>{item}</div>
      ))}

    
      <nav style={{
        padding: "1.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.6rem",
          fontWeight: "600",
          letterSpacing: "3px",
          color: "var(--plum)",
          textTransform: "uppercase"
        }}>StyleX</div>
        <div style={{
          display: "flex", gap: "0.5rem", alignItems: "center",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(249,197,209,0.5)",
          borderRadius: "999px",
          padding: "0.4rem 1rem",
          fontSize: "0.8rem",
          color: "var(--text-soft)",
          fontWeight: "500"
        }}>
          <span style={{ width: "6px", height: "6px", background: "#66bb6a", borderRadius: "50%", display: "inline-block" }} />
          AI Online
        </div>
      </nav>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 3rem",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          maxWidth: "1100px",
          width: "100%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>

       
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(212,168,83,0.12)",
              border: "1px solid rgba(212,168,83,0.3)",
              borderRadius: "999px",
              padding: "0.35rem 1rem",
              fontSize: "0.78rem",
              color: "var(--gold)",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem"
            }}>
              ✦ AI Fashion Advisor
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 5vw, 5rem)",
              fontWeight: "300",
              lineHeight: "1.1",
              color: "var(--text-dark)",
              marginBottom: "0.5rem"
            }}>
              Dress with
            </h1>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 5vw, 5rem)",
              fontWeight: "600",
              fontStyle: "italic",
              lineHeight: "1.1",
              background: "linear-gradient(135deg, #c9a0c4, #f0899a, #d4a853)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem"
            }}>
              intention.
            </h1>

            <p style={{
              fontSize: "1rem",
              color: "var(--text-soft)",
              lineHeight: "1.8",
              maxWidth: "400px",
              marginBottom: "2.5rem",
              fontWeight: "300"
            }}>
              StyleX is your personal AI stylist — helping you build outfits that speak to who you are, for every moment that matters.
            </p>

            <div style={{
              display: "flex",
              gap: "2rem",
              marginBottom: "2.5rem"
            }}>
              {[["10K+", "Outfits styled"], ["100%", "Free to use"], ["24/7", "Always ready"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: "600", color: "var(--plum)" }}>{num}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", fontWeight: "400" }}>{label}</div>
                </div>
              ))}
            </div>

           
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={onStart} style={{
                background: "linear-gradient(135deg, #c9a0c4, #f0899a)",
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: "1rem 2.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(240,137,154,0.35)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                letterSpacing: "0.3px",
                fontFamily: "'Outfit', sans-serif"
              }}
                onMouseEnter={e => {
                  e.target.style.transform = "translateY(-3px) scale(1.02)";
                  e.target.style.boxShadow = "0 16px 40px rgba(240,137,154,0.45)";
                }}
                onMouseLeave={e => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 8px 32px rgba(240,137,154,0.35)";
                }}>
                Start Styling ✦
              </button>
              <span style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>
                No sign up · Instant answers
              </span>
            </div>
          </div>

         
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(249,197,209,0.4)",
              borderRadius: "28px",
              padding: "2rem",
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 20px 60px rgba(201,160,196,0.2), 0 4px 16px rgba(249,197,209,0.2)",
              animation: "cardFloat 6s ease-in-out infinite"
            }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-soft)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem", fontWeight: "600" }}>
                StyleX suggests ✦
              </div>
              {[
                { emoji: "🧥", item: "Oversized camel blazer", tag: "Outerwear" },
                { emoji: "👗", item: "Ivory slip dress", tag: "Base" },
                { emoji: "👠", item: "Nude block heels", tag: "Footwear" },
                { emoji: "👜", item: "Mini structured bag", tag: "Accessory" }
              ].map((piece, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 0.75rem",
                  borderRadius: "12px",
                  marginBottom: "0.5rem",
                  background: i === 0 ? "linear-gradient(135deg, rgba(249,197,209,0.3), rgba(201,160,196,0.2))" : "rgba(253,246,240,0.6)",
                  border: i === 0 ? "1px solid rgba(249,197,209,0.4)" : "1px solid transparent",
                  transition: "all 0.2s"
                }}>
                  <span style={{ fontSize: "1.3rem" }}>{piece.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--text-dark)" }}>{piece.item}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>{piece.tag}</div>
                  </div>
                  {i === 0 && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--blush-deep)" }} />}
                </div>
              ))}

            
              <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(253,246,240,0.8)", borderRadius: "12px" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-soft)", marginBottom: "0.5rem", fontWeight: "500" }}>Color Palette</div>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {["#d4a853", "#f9c5d1", "#f5ebe0", "#c9a0c4", "#1a0a1e"].map(color => (
                    <div key={color} style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: color, border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    }} />
                  ))}
                </div>
              </div>
            </div>

            
            <div style={{
              position: "absolute", top: "-10px", right: "-10px",
              background: "white", border: "1px solid rgba(212,168,83,0.3)",
              borderRadius: "999px", padding: "0.4rem 0.8rem",
              fontSize: "0.75rem", color: "var(--gold)", fontWeight: "600",
              boxShadow: "0 4px 12px rgba(212,168,83,0.15)",
              animation: "float 4s ease-in-out infinite"
            }}>✦ Curated for you</div>

            <div style={{
              position: "absolute", bottom: "20px", left: "-20px",
              background: "white", border: "1px solid rgba(249,197,209,0.4)",
              borderRadius: "16px", padding: "0.6rem 1rem",
              fontSize: "0.75rem", color: "var(--text-mid)", fontWeight: "500",
              boxShadow: "0 4px 16px rgba(249,197,209,0.2)",
              animation: "float 5s ease-in-out 1s infinite"
            }}>
              <div style={{ color: "var(--blush-deep)", fontWeight: "600", marginBottom: "2px" }}>Occasion Ready 💼</div>
              <div style={{ color: "var(--text-soft)", fontSize: "0.7rem" }}>Business casual · Fall</div>
            </div>
          </div>
        </div>
      </div>

     
      <div style={{
        padding: "1.5rem 3rem",
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
        zIndex: 2
      }}>
        {["Outfit Ideas", "Color Theory", "Body Type Styling", "Occasion Dressing", "Trend Advice", "Capsule Wardrobe"].map(tag => (
          <span key={tag} onClick={onStart} style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(249,197,209,0.4)",
            borderRadius: "999px",
            padding: "0.4rem 1rem",
            fontSize: "0.78rem",
            color: "var(--text-mid)",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
            onMouseEnter={e => e.target.style.background = "rgba(249,197,209,0.2)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.6)"}
          >{tag}</span>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes blobMove {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(20px, -15px); }
          66% { transform: scale(0.95) translate(-10px, 10px); }
        }
        @media (max-width: 768px) {
          nav { padding: 1.2rem 1.5rem !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
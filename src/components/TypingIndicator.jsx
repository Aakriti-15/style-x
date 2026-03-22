export default function TypingIndicator() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.8rem 1.2rem",
      background: "white",
      borderRadius: "18px 18px 18px 4px",
      boxShadow: "0 2px 12px rgba(206,147,216,0.15)",
      width: "fit-content",
      marginBottom: "1rem"
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f48fb1, #ce93d8)",
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
        }} />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
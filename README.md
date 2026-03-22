# StyleX 👗 — AI Fashion Advisor

> Your personal AI stylist, available 24/7.

![StyleX](https://img.shields.io/badge/StyleX-AI%20Fashion%20Advisor-ff69b4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3-orange?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

## 🌐 Live Demo
👉 [https://stylex-3ifc.onrender.com]

## 💡 What is StyleX?
StyleX is a purpose-built AI fashion chatbot for women. It acts like a 
fashion-forward best friend who gives specific, actionable outfit advice 
based on your occasion, mood, body type, season, and budget.

I chose fashion as the topic because it's deeply personal, visual, and 
emotional — the perfect space to build something that feels truly 
purpose-built rather than a generic AI wrapper.

## ✨ Features
- Beautiful editorial UI with glassmorphism design
- AI-powered outfit recommendations
- Style advice for any occasion
- Quick prompt suggestions to get started
- Fully responsive on mobile
- Super fast responses powered by Groq + LLaMA 3.3
- Smooth typing indicator and message animations
- Sidebar with style categories

## 🛠️ Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Pure CSS with glassmorphism effects
- **AI:** Groq API with LLaMA 3.3 70B model
- **Fonts:** Cormorant Garamond + Outfit (Google Fonts)
- **HTTP:** Axios
- **Deployment:** Render

## 🚀 Run Locally

1. Clone the repo
```bash
git clone https://github.com/Aakriti-15/style-x.git
cd style-x
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. Start the dev server
```bash
npm run dev
```

## 🎨 Design Decisions
- **Color palette:** Soft blush, mauve and cream tones — calm, feminine, 
  and exciting without being overwhelming
- **Typography:** Cormorant Garamond for headings (editorial/luxury feel) 
  + Outfit for body text (clean and modern)
- **Landing page:** Shows a live outfit suggestion card so users instantly 
  understand what the app does
- **Empty state:** Friendly welcome message + quick prompt buttons so 
  users never feel lost
- **Loading state:** Animated typing indicator so the experience feels 
  alive and responsive
- **Error state:** Soft, on-brand error messages that don't feel jarring

## 📸 Screenshots
*(Add screenshots of your app here)*

## 🔑 Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_GROQ_API_KEY` | Your Groq API key from console.groq.com |

---
Built with ❤️ by Aakriti
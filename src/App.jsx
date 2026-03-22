import { useState } from "react";
import "./index.css";
import LandingPage from "./components/LandingPage";
import ChatPage from "./components/ChatPage";

export default function App() {
  const [started, setStarted] = useState(false);
  return (
    <div>
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <ChatPage />
      )}
    </div>
  );
}
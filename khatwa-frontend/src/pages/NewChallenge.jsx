import { useState } from "react"
import { Send, Sparkles, MessageCircle } from "lucide-react"
import '../assets/styles/NewChallenge.css';

export default function NewChallenge() {
  const [message, setMessage] = useState("");

  return (
    <div className="containere">
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <div className="logo-container">
            <div className="logo-circle">
              <Sparkles className="icon" />
            </div>
            <span className="header-title">ChatGPT</span>
            <div className="pulse-dot"></div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-box">
        {/* Messages Area */}
        <div className="messages-area">
          <div className="center-message">
            <div className="icon-circle">
              <MessageCircle className="icon" />
            </div>
            <h3 className="title">Comment puis-je vous aider ?</h3>
            <p className="subtitle">Posez-moi n'importe quelle question pour commencer</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message ici..."
            className="message-input"
          />
          <button className="send-button">
            <Send className="send-icon" />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        {["Expliquez-moi quelque chose", "Aidez-moi à écrire", "Résolvez un problème", "Créez du contenu"].map(
          (suggestion, index) => (
            <button key={index} className="suggestion-button">
              {suggestion}
            </button>
          )
        )}
      </div>
    </div>
  );
}
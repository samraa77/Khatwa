import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, MessageCircle } from "lucide-react";
import axios from "axios";
import "../assets/styles/NewChallenge.css";

export default function NewChallenge() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [plan, setPlan] = useState([]);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendGoal = async () => {
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    const goal = message;
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://127.0.0.1:8000/api/ai/questionnaire",
        { goal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestions(res.data.questions);
      setAnswers([]);
      setCurrentQuestionIndex(0);

      // Affiche première question
      setChatHistory((prev) => [...prev, { sender: "ai", text: res.data.questions[0] }]);
    } catch (err) {
      console.error("Erreur génération questions :", err);
      setChatHistory((prev) => [...prev, { sender: "ai", text: "Erreur lors de la génération des questions." }]);
    }
  };

  const handleAnswerSubmit = () => {
    if (!message.trim()) return;

    const answer = message;
    setMessage("");

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setChatHistory((prev) => [...prev, { sender: "user", text: answer }]);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      // Affiche la question suivante
      setCurrentQuestionIndex(nextIndex);
      setChatHistory((prev) => [...prev, { sender: "ai", text: questions[nextIndex] }]);
    } else {
      // Toutes les réponses sont prêtes, on génère le plan
      generatePlanFromAI(goal = chatHistory.find(h => h.sender === "user")?.text || "", newAnswers);
    }
  };

  const generatePlanFromAI = async (goal, answersArray) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://127.0.0.1:8000/api/ai/generate-plan",
        { objective: goal, answers: answersArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDuration(res.data.duration);
      setPlan(res.data.plan);

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: `Voici ton plan personnalisé pour ${res.data.duration} jours :` },
        ...res.data.plan.map((item) => ({
          sender: "ai",
          text: `Jour ${item.jour} : ${item.titre} – ${item.description}`,
        })),
      ]);
    } catch (err) {
      console.error("Erreur IA:", err);
      setChatHistory((prev) => [...prev, { sender: "ai", text: "Erreur lors de la génération du plan." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      handleAnswerSubmit();
    } else {
      handleSendGoal();
    }
  };

  return (
    <div className="containere">
      <div className="header">
        <div className="header-inner">
          <div className="logo-container">
            <div className="logo-circle"><Sparkles className="icon" /></div>
            <span className="header-title">KhatwaBot</span>
            <div className="pulse-dot"></div>
          </div>
        </div>
      </div>

      <div className="chat-box">
        <div className="messages-area">
          {chatHistory.length === 0 ? (
            <div className="center-message">
              <div className="icon-circle"><MessageCircle className="icon" /></div>
              <h3 className="title">Besoin d'aide ?</h3>
              <p className="subtitle">Décris ton objectif ou choisis une suggestion.</p>
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div key={i} className={`bubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              questions.length > 0 && currentQuestionIndex < questions.length
                ? "Ta réponse..."
                : "Quel est ton objectif ?"
            }
            className="message-input"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-button" onClick={handleSend} aria-label="Envoyer">
            <Send className="send-icon" />
          </button>
        </div>

        {loading && <p style={{ padding: "10px", color: "#fff" }}>⏳ Génération du plan...</p>}
      </div>

      <div className="suggestions">
        {["Apprendre React", "Perdre 5 kg", "Lire 10 livres", "Préparer un concours"].map((s, i) => (
          <button key={i} className="suggestion-button" onClick={() => { setMessage(s); handleSendGoal(); }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

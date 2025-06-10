"use client"

import { useState } from "react"
import '../assets/styles/CalendrierDefi.css'

// Données du défi avec calendrier
const challengeData = {
  title: "Défi Sport 60 Jours",
  description: "Transformez votre corps en 2 mois avec notre programme progressif",
  startDate: new Date("2024-02-01"),
  totalDays: 60,
  currentDay: 1,
}

// Générer les 60 jours du défi
const generateChallengeDays = () => {
  const days = []
  const startDate = new Date(challengeData.startDate)

  const activities = [
    // Semaine 1-2: Mise en route
    "Marche 20 min",
    "Étirements 15 min",
    "Squats 3x10",
    "Pompes 3x5",
    "Planche 30 sec",
    "Repos actif",
    "Yoga 20 min",
    // Semaine 3-4: Progression
    "Cardio 25 min",
    "Renforcement",
    "Course 15 min",
    "Musculation",
    "HIIT 20 min",
    "Repos",
    "Natation",
    // Continuer le pattern...
  ]

  const activityTypes = [
    "Cardio",
    "Musculation",
    "Yoga",
    "Course",
    "HIIT",
    "Repos",
    "Étirements",
    "Natation",
    "Vélo",
    "Pilates",
  ]

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const week = Math.floor(i / 7) + 1
    const dayInWeek = (i % 7) + 1

    // Repos le dimanche
    const isRestDay = dayInWeek === 7

    days.push({
      day: i + 1,
      date: date,
      week: week,
      activity: isRestDay ? "Repos" : activities[i % activities.length] || activityTypes[i % activityTypes.length],
      type: isRestDay ? "rest" : activityTypes[i % activityTypes.length].toLowerCase(),
      completed: i < challengeData.currentDay - 1,
      isToday: i === challengeData.currentDay - 1,
      difficulty: week <= 2 ? "Facile" : week <= 4 ? "Moyen" : week <= 6 ? "Difficile" : "Expert",
    })
  }

  return days
}

const challengeDays = generateChallengeDays()

export default function CalendrierDefi() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(1)

  const weeks = []
  for (let i = 0; i < 9; i++) {
    // 9 semaines pour 60 jours
    weeks.push(i + 1)
  }

  const getDaysForWeek = (weekNumber) => {
    return challengeDays.filter((day) => day.week === weekNumber)
  }

  const handleDayClick = (day) => {
    setSelectedDay(day)
    setShowModal(true)
  }

  const getActivityIcon = (type) => {
    const icons = {
      cardio: "🏃",
      musculation: "💪",
      yoga: "🧘",
      course: "🏃‍♀️",
      hiit: "⚡",
      repos: "😴",
      étirements: "🤸",
      natation: "🏊",
      vélo: "🚴",
      pilates: "🤸‍♀️",
    }
    return icons[type] || "🏋️"
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Facile":
        return "easy"
      case "Moyen":
        return "medium"
      case "Difficile":
        return "hard"
      case "Expert":
        return "expert"
      default:
        return "easy"
    }
  }

  const completedDays = challengeDays.filter((day) => day.completed).length
  const progressPercentage = Math.round((completedDays / 60) * 100)

  return (
    <div className="challenge-container">
      <div className="containerr">
        {/* headerr */}
                  <h1 className="title">{challengeData.title}</h1>

        <div className="headerr">
          <div className="headerr-stats">
            <div className="stat">
              <span className="stat-number">{completedDays}</span>
              <span className="stat-label">Jours complétés</span>
            </div>
            <div className="stat">
              <span className="stat-number">{progressPercentage}%</span>
              <span className="stat-label">Progression</span>
            </div>
            <div className="stat">
              <span className="stat-number">{60 - completedDays}</span>
              <span className="stat-label">Jours restants</span>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-text">
            Jour {challengeData.currentDay} sur 60 - Semaine {Math.ceil(challengeData.currentDay / 7)}
          </div>
        </div>

        {/* Navigation des semaines */}
        <div className="week-navigation">
          <h2>Calendrier du Défi</h2>
          <div className="week-tabs">
            {weeks.map((week) => (
              <button
                key={week}
                className={`week-tab ${currentWeek === week ? "active" : ""}`}
                onClick={() => setCurrentWeek(week)}
              >
                Semaine {week}
              </button>
            ))}
          </div>
        </div>

        {/* Calendrier de la semaine */}
        <div className="calendar-section">
          <div className="calendar-headerr">
            <h3>Semaine {currentWeek}</h3>
            <div className="legend">
              <span className="legend-item">
                <span className="legend-dot completed"></span>Terminé
              </span>
              <span className="legend-item">
                <span className="legend-dot current"></span>Aujourd'hui
              </span>
              <span className="legend-item">
                <span className="legend-dot upcoming"></span>À venir
              </span>
              <span className="legend-item">
                <span className="legend-dot rest"></span>Repos
              </span>
            </div>
          </div>

          <div className="calendar-grid">
            {getDaysForWeek(currentWeek).map((day) => (
              <div
                key={day.day}
                className={`calendar-day ${day.completed ? "completed" : ""} ${day.isToday ? "today" : ""} ${
                  day.type === "repos" ? "rest" : ""
                } ${getDifficultyColor(day.difficulty)}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-headerr">
                  <span className="day-number">Jour {day.day}</span>
                  <span className="day-date">
                    {day.date.getDate()}/{day.date.getMonth() + 1}
                  </span>
                </div>
                <div className="day-activity">
                  <span className="activity-icon">{getActivityIcon(day.type)}</span>
                  <span className="activity-name">{day.activity}</span>
                </div>
                <div className="day-difficulty">{day.difficulty}</div>
                {day.completed && <div className="completed-check">✓</div>}
                {day.isToday && <div className="today-indicator">Aujourd'hui</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Résumé de la semaine */}
        <div className="week-summary">
          <h3>Résumé Semaine {currentWeek}</h3>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-number">{getDaysForWeek(currentWeek).filter((d) => d.completed).length}</span>
              <span className="summary-label">Jours complétés</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {getDaysForWeek(currentWeek).filter((d) => d.type !== "repos").length}
              </span>
              <span className="summary-label">Jours d'entraînement</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {getDaysForWeek(currentWeek).filter((d) => d.type === "repos").length}
              </span>
              <span className="summary-label">Jours de repos</span>
            </div>
          </div>
        </div>

     
        {/* Modal de détail du jour */}
        {showModal && selectedDay && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-headerr">
                <h2>
                  Jour {selectedDay.day} - {selectedDay.activity}
                </h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-content">
                <div className="day-info">
                  <div className="info-item">
                    <span className="info-label">Date:</span>
                    <span className="info-value">
                      {selectedDay.date.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Activité:</span>
                    <span className="info-value">
                      {getActivityIcon(selectedDay.type)} {selectedDay.activity}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Difficulté:</span>
                    <span className={`info-value difficulty ${getDifficultyColor(selectedDay.difficulty)}`}>
                      {selectedDay.difficulty}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Semaine:</span>
                    <span className="info-value">Semaine {selectedDay.week}</span>
                  </div>
                </div>

                <div className="activity-details">
                  <h3>Détails de l'activité</h3>
                  {selectedDay.type === "repos" ? (
                    <p>
                      Jour de repos bien mérité ! Profitez-en pour récupérer, vous hydrater et préparer mentalement la
                      suite du défi.
                    </p>
                  ) : (
                    <div>
                      <p>
                        Activité prévue : <strong>{selectedDay.activity}</strong>
                      </p>
                      <p>
                        Niveau de difficulté : <strong>{selectedDay.difficulty}</strong>
                      </p>
                      <p>Durée estimée : 30-45 minutes</p>
                    </div>
                  )}
                </div>

                {selectedDay.completed ? (
                  <div className="completed-badge">✅ Jour complété !</div>
                ) : selectedDay.isToday ? (
                  <button className="complete-day-btn">Marquer comme terminé</button>
                ) : (
                  <div className="upcoming-badge">À venir</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import '../assets/styles/List-defi.css'

// Données d'exemple des défis
const defisData = [
  {
    id: 1,
    title: "Courir 5km par jour",
    description: "Maintenir une routine de course quotidienne",
    status: 1, // En cours
    progress: 65,
    category: "Sport",
  },
  {
    id: 2,
    title: "Lire 12 livres cette année",
    description: "Développer l'habitude de lecture",
    status: 0, // Terminé
    progress: 100,
    category: "Culture",
  },
  {
    id: 3,
    title: "Apprendre le piano",
    description: "Maîtriser 10 morceaux de piano",
    status: -1, // Abandonné
    progress: 30,
    category: "Musique",
  },
 
  {
    id: 5,
    title: "Économiser 5000€",
    description: "Mettre de côté pour les vacances",
    status: 0, // Terminé
    progress: 100,
    category: "Finance",
  },
  {
    id: 6,
    title: "Arrêter de fumer",
    description: "Éliminer la cigarette",
    status: -1, // Abandonné
    progress: 20,
    category: "Santé",
  },

]

export default function ListDefi() {
  const [activeFilter, setActiveFilter] = useState("all")

  // Filtrer les défis selon le statut sélectionné
  const filteredDefis = useMemo(() => {
    if (activeFilter === "all") return defisData
    if (activeFilter === "en-cours") return defisData.filter((defi) => defi.status === 1)
    if (activeFilter === "termine") return defisData.filter((defi) => defi.status === 0)
    if (activeFilter === "abandonne") return defisData.filter((defi) => defi.status === -1)
    return defisData
  }, [activeFilter])

  // Compter les défis par statut
  const counts = {
    all: defisData.length,
    "en-cours": defisData.filter((d) => d.status === 1).length,
    termine: defisData.filter((d) => d.status === 0).length,
    abandonne: defisData.filter((d) => d.status === -1).length,
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "En cours"
      case 0:
        return "Terminé"
      case -1:
        return "Abandonné"
      default:
        return "Inconnu"
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "status-progress"
      case 0:
        return "status-success"
      case -1:
        return "status-danger"
      default:
        return ""
    }
  }

  return (
    <div className="containe">
      <div className="wrapper">
        {/* Header */}
        <div className="header">
          <h1>Liste des Défis</h1>
        </div>

        {/* Statistiques */}
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{counts.all}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts["en-cours"]}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts.termine}</span>
            <span className="stat-label">Terminés</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts.abandonne}</span>
            <span className="stat-label">Abandonnés</span>
          </div>
        </div>

        {/* Filtres */}
        <div className="filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Tous
          </button>
          <button
            className={`filter-btn ${activeFilter === "en-cours" ? "active" : ""}`}
            onClick={() => setActiveFilter("en-cours")}
          >
            En cours
          </button>
          <button
            className={`filter-btn ${activeFilter === "termine" ? "active" : ""}`}
            onClick={() => setActiveFilter("termine")}
          >
            Terminés
          </button>
          <button
            className={`filter-btn ${activeFilter === "abandonne" ? "active" : ""}`}
            onClick={() => setActiveFilter("abandonne")}
          >
            Abandonnés
          </button>
        </div>

        {/* Liste des défis */}
        <div className="defis-list">
          {filteredDefis.length === 0 ? (
            <div className="empty">
              <p>Aucun défi trouvé</p>
            </div>
          ) : (
            filteredDefis.map((defi) => (
              <div key={defi.id} className="defi-item">
                <div className="defi-content">
                  <div className="defi-header">
                    <h3 className="defi-title">{defi.title}</h3>
                    <span className={`status ${getStatusClass(defi.status)}`}>{getStatusText(defi.status)}</span>
                  </div>
                  <p className="defi-description">{defi.description}</p>
                  <div className="defi-meta">
                    <span className="category">{defi.category}</span>
                    <span className="progress-text">{defi.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${defi.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

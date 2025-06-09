import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  // Couleurs thématiques
  const colors = {
    primary: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    danger: '#e74c3c',
    grayLight: '#ecf0f1',
    grayMedium: '#bdc3c7',
    textDark: '#2c3e50',
    textLight: '#7f8c8d',
    backgroundLight: '#ffffff',
    backgroundDark: '#f4f4f4',
  };

  // Données du cercle de progression quotidienne
  const progressData = {
    completedDays: 23,
    totalDays: 30,
    currentStreak: 18,
    progressPercentage: 77,
  };

  // Distribution des défis (diagramme en secteurs)
  const challengeDistributionData = {
    completed: { value: 12, percentage: 60, color: colors.success },
    inProgress: { value: 1, percentage: 15, color: colors.primary },
    abandoned: { value: 5, percentage: 25, color: colors.danger },
    total: 20,
    successRate: 60,
  };

  const pieChartData = [
    { name: 'Terminé', value: challengeDistributionData.completed.value, color: challengeDistributionData.completed.color },
    { name: 'En cours', value: challengeDistributionData.inProgress.value, color: challengeDistributionData.inProgress.color },
    { name: 'Abandonné', value: challengeDistributionData.abandoned.value, color: challengeDistributionData.abandoned.color },
  ];

  // Distribution de la durée des défis (graphique à barres)
  const challengeDurationData = [
    { duration: '30 J', challenges: 8, percentage: 40, color: colors.primary },
    { duration: '60 J', challenges: 7, percentage: 35, color: colors.warning },
    { duration: '90 J', challenges: 5, percentage: 25, color: colors.danger },
  ];

  // Discipline quotidienne (graphique en ligne)
  const dailyDisciplineData = [
    { day: 'L', score: 80 },
    { day: 'M', score: 75 },
    { day: 'M', score: 85 },
    { day: 'J', score: 90 },
    { day: 'V', score: 88 },
    { day: 'S', score: 92 },
    { day: 'D', score: 89 },
  ];

  const averageDisciplineScore = 82;

  // Fonction utilitaire pour calculer le dash array du cercle
  const calculateDashArray = (percentage) => {
    const circumference = 2 * Math.PI * 45; // Rayon du cercle est 45
    const completedLength = (percentage / 100) * circumference;
    const remainingLength = circumference - completedLength;
    return `${completedLength} ${remainingLength}`;
  };

  return (
    <div className="dashboard" style={{ marginLeft: "180px" }}>
      {/* Titre principal de la page */}
      <div className="page-title">
              <h1 >Tableau de Bord</h1>
      </div>

<div className="resp">


      <div className="card">
        {/* Progression de méditation quotidienne */}
        <section className="section">
          <h2 className="section-title">Méditation Quotidienne</h2>
          <div className="progress-container">
            {/* Cercle de progression */}
            <div className="progress-circle-container">
              <svg className="progress-circle">
                <circle
                  className="circle-background"
                  strokeWidth="8"
                  stroke={colors.grayLight}
                  fill="transparent"
                  r="45"
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="circle-progress"
                  strokeWidth="8"
                  stroke={colors.success}
                  fill="transparent"
                  r="45"
                  cx="50%"
                  cy="50%"
                  style={{
                    strokeDasharray: calculateDashArray(progressData.progressPercentage),
                    strokeDashoffset: 0,
                    transition: 'stroke-dashoffset 0.3s ease 0s',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                  }}
                />
                <text
                  className="progress-text"
                  x="50%"
                  y="50%"
                  dy=".3em"
                  textAnchor="middle"
                >
                  {`${progressData.completedDays}/${progressData.totalDays}`}
                </text>
              </svg>
            </div>
            {/* Statistiques de progression */}
            <div className="stats">
              <div className="stat-item">
                <div className="stat-value">{progressData.currentStreak}</div>
                <div className="stat-label">Série Actuelle</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{progressData.progressPercentage}%</div>
                <div className="stat-label">Progression</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="card">
        {/* Distribution des défis */}
        <section className="section">
          <h2 className="section-title">Répartition des Défis</h2>
          <div className="distribution">
            {/* Diagramme en secteurs */}
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Légende */}
            <div className="legend">
              <ul>
                {Object.entries(challengeDistributionData).filter(([k, v]) => typeof v === 'object').map(([key, value]) => (
                  <li key={key} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: value.color }}></span>
                    {key.charAt(0).toUpperCase() + key.slice(1)} : {value.value} ({value.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="card">
        {/* Distribution de la durée des défis */}
        <section className="section">
          <h2 className="section-title">Distribution de la Durée des Défis</h2>
          <div className="distribution">
            {/* Graphique à barres */}
            <div className="bar-chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={challengeDurationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 30]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="duration" />
                  <Bar dataKey="percentage" fill={colors.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Légende */}
            <div className="legend">
              <ul>
                {challengeDurationData.map((item, index) => (
                  <li key={index} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                    {item.duration} : {item.challenges} défis ({item.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="card">
        {/* Discipline quotidienne */}
        <section className="section">
          <h2 className="section-title">Discipline Quotidienne</h2>
          <div className="distribution">
            {/* Graphique en ligne */}
            <div className="line-chart-wrapper">
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={dailyDisciplineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Line type="monotone" dataKey="score" stroke={colors.success} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Score moyen */}
            <div className="average-score">
              <div className="score-value">{averageDisciplineScore}</div>
              <div className="score-label">Score Moyen</div>
            </div>
          </div>
        </section>
      </div>
    </div></div>
  );
};

export default Dashboard;
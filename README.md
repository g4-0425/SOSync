# 🚨 SOSync – Smart Emergency Response & Coordination System

SOSync is a React-based Smart Emergency Response & Coordination System designed as an academic prototype for improving the coordination of emergency incidents, response units, and hospitals.

The system provides a centralized interface for reporting emergencies, prioritizing incidents, coordinating emergency resources, recommending suitable hospitals, visualizing routes, and monitoring the response lifecycle.

## 🎯 Project Objective

The objective of SOSync is to provide a unified emergency coordination platform that can help organize emergency information and support faster, more informed response coordination.

### Core Workflow

**Report → Prioritize → Coordinate → Recommend → Route → Monitor → Resolve → Analyze**

## ✨ Key Features

- 🚨 Emergency incident reporting
- ⚡ Emergency priority classification
- 🚑 Ambulance coordination and tracking
- 👮 Police unit coordination
- 🚒 Fire & rescue service coordination
- 🏥 Intelligent hospital recommendation
- 🗺️ Interactive Chandigarh map
- 📍 Emergency resource location visualization
- 🛣️ Route visualization
- ⏱️ Estimated response and hospital ETA
- 📋 Emergency timeline and history
- 📊 Response analytics and dashboard
- 🔔 Emergency notifications
- 🔎 Search and filtering
- 📱 Responsive user interface
- 💾 Local storage for prototype data

## 🏥 Intelligent Hospital Recommendation

A key feature of SOSync is its hospital recommendation system.

Instead of simply displaying the nearest hospital, the prototype considers factors such as:

- Emergency type
- Required medical facility/specialty
- Simulated hospital availability
- Distance
- Estimated travel time
- Hospital suitability score

The system then presents the recommended hospital along with the factors contributing to the recommendation.

> **Note:** Hospital recommendations in this academic prototype are simulated and are not intended to replace professional medical or emergency-dispatch decisions.

## 🗺️ Interactive Emergency Map

SOSync uses an interactive map interface to visualize:

- Emergency incidents
- Ambulances
- Police units
- Fire stations
- Hospitals
- Emergency routes

The prototype can simulate real-time changes such as vehicle movement, ETA updates, status changes, and route visualization.

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- React Router
- Leaflet.js
- OpenStreetMap

### Data & Browser Technologies

- JSON
- LocalStorage
- Fetch API
- Browser APIs

### Development Tools

- VS Code
- Vite
- Git
- GitHub
- Vercel

## ⚛️ React Concepts Used

The project demonstrates several React concepts, including:

- Components
- JSX
- Props
- State management
- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- `useCallback`
- Conditional rendering
- List rendering
- Reusable components
- Custom hooks
- React Router
- Dynamic routes
- Protected routes

## 💻 Project Structure

```text
SOSync/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── data/
│   ├── utils/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

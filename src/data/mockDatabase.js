// ==========================================
// SOSync MOCK DATABASE ENTITIES (CHANDIGARH)
// ==========================================

export const initialUsers = [
  {
    id: "USR-001",
    name: "Admin Dispatcher",
    email: "admin@sosync.gov.in",
    role: "Admin",
    token: "TOKEN-ADMIN-998877",
    department: "Command Center Duty Room A"
  },
  {
    id: "USR-002",
    name: "Rajesh Kumar",
    email: "rajesh.amb@sosync.gov.in",
    role: "Paramedic Lead",
    department: "Ambulance Unit A-102"
  },
  {
    id: "USR-003",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    role: "Citizen",
    sector: "Sector 22"
  }
];

export const emergencyTypes = [
  { id: "ET-01", name: "Medical Crisis", icon: "Activity", priorityDefault: "High", color: "#DC2626" },
  { id: "ET-02", name: "Road Accident", icon: "AlertTriangle", priorityDefault: "Critical", color: "#EF4444" },
  { id: "ET-03", name: "Structure Fire", icon: "Flame", priorityDefault: "Critical", color: "#F97316" },
  { id: "ET-04", name: "Crime / Threat", icon: "ShieldAlert", priorityDefault: "High", color: "#2563EB" },
  { id: "ET-05", name: "Flood Hazard", icon: "Waves", priorityDefault: "Medium", color: "#06B6D4" },
  { id: "ET-06", name: "Gas Leak", icon: "Wind", priorityDefault: "High", color: "#EAB308" },
  { id: "ET-07", name: "Earthquake Tremor", icon: "Zap", priorityDefault: "High", color: "#8B5CF6" },
  { id: "ET-08", name: "Other Emergency", icon: "HelpCircle", priorityDefault: "Medium", color: "#64748B" }
];

export const initialHospitals = [
  {
    id: "HOSP-01",
    name: "PGIMER Chandigarh",
    image: "city_hospital.png",
    sector: "Sector 12",
    coords: [30.7624, 76.7723],
    bedsAvailable: 24,
    totalBeds: 120,
    icuBeds: 8,
    doctors: 18,
    occupancy: "80%",
    status: "Available",
    phone: "+91 172 274 7585",
    distance: "1.2 KM",
    rating: 4.9
  },
  {
    id: "HOSP-02",
    name: "GMCH Sector 32",
    image: "trauma_center.png",
    sector: "Sector 32",
    coords: [30.7065, 76.7725],
    bedsAvailable: 14,
    totalBeds: 90,
    icuBeds: 4,
    doctors: 12,
    occupancy: "84%",
    status: "Available",
    phone: "+91 172 266 5253",
    distance: "3.5 KM",
    rating: 4.7
  },
  {
    id: "HOSP-03",
    name: "Fortis Hospital Mohali",
    image: "emergency_care.png",
    sector: "Sector 62 (Mohali)",
    coords: [30.6948, 76.7324],
    bedsAvailable: 18,
    totalBeds: 80,
    icuBeds: 6,
    doctors: 15,
    occupancy: "77%",
    status: "Available",
    phone: "+91 172 502 1222",
    distance: "4.8 KM",
    rating: 4.8
  },
  {
    id: "HOSP-04",
    name: "Max Hospital Mohali",
    image: "city_hospital.png",
    sector: "Phase 6 (Mohali)",
    coords: [30.7258, 76.7214],
    bedsAvailable: 6,
    totalBeds: 60,
    icuBeds: 2,
    doctors: 9,
    occupancy: "90%",
    status: "Limited",
    phone: "+91 172 665 2000",
    distance: "5.4 KM",
    rating: 4.6
  }
];

export const initialAmbulances = [
  {
    id: "Amb A-101",
    driver: "Rajesh Kumar",
    phone: "+91 98765 43210",
    coords: [30.7350, 76.7550],
    sector: "Sector 22",
    destination: "PGIMER Chandigarh",
    status: "On Route",
    eta: "5 Min",
    assignedEmergencyId: "EMG-1001",
    type: "ICU Trauma Van"
  },
  {
    id: "Amb A-102",
    driver: "Manpreet Singh",
    phone: "+91 98765 43211",
    coords: [30.7180, 76.7450],
    sector: "Sector 35",
    destination: "Standby Hub",
    status: "Available",
    eta: "--",
    assignedEmergencyId: null,
    type: "Basic Life Support"
  },
  {
    id: "Amb A-103",
    driver: "Sunil Dutt",
    phone: "+91 98765 43212",
    coords: [30.7480, 76.7650],
    sector: "Sector 15",
    destination: "GMCH Sector 32",
    status: "On Route",
    eta: "3 Min",
    assignedEmergencyId: "EMG-1003",
    type: "Advanced Cardiac Unit"
  },
  {
    id: "Amb A-104",
    driver: "Amit Sharma",
    phone: "+91 98765 43213",
    coords: [30.7200, 76.7280],
    sector: "Sector 43",
    destination: "Standby Station",
    status: "Available",
    eta: "--",
    assignedEmergencyId: null,
    type: "Neonatal Ambulance"
  },
  {
    id: "Amb A-105",
    driver: "Gurpreet Singh",
    phone: "+91 98765 43214",
    coords: [30.7520, 76.7880],
    sector: "Sector 8",
    destination: "Fortis Mohali",
    status: "On Route",
    eta: "7 Min",
    assignedEmergencyId: "EMG-1002",
    type: "ICU Trauma Van"
  }
];

export const initialPoliceUnits = [
  {
    id: "POL-17",
    station: "Sector 17 Police Station",
    coords: [30.7431, 76.7790],
    officer: "Inspector Vikramjit Singh",
    unitsAvailable: 8,
    activeCase: "Traffic Collision Sector 22",
    destination: "Sector 22 Junction",
    eta: "4 Min",
    status: "Dispatched"
  },
  {
    id: "POL-34",
    station: "Sector 34 Police Station",
    coords: [30.7225, 76.7680],
    officer: "Inspector Harpreet Kaur",
    unitsAvailable: 6,
    activeCase: "Patrol Duty Sector 35",
    destination: "Sector 35 Market",
    eta: "--",
    status: "Active Patrol"
  },
  {
    id: "POL-HQ",
    station: "Chandigarh Police HQ",
    coords: [30.7580, 76.8040],
    officer: "DSP Karanvir Roy",
    unitsAvailable: 15,
    activeCase: "City VIP Escort & Monitoring",
    destination: "Command HQ",
    eta: "--",
    status: "Alert Ready"
  }
];

export const initialFireStations = [
  {
    id: "FS-17",
    station: "Sector 17 Fire Station",
    coords: [30.7410, 76.7820],
    trucksAvailable: 4,
    firefighters: 22,
    currentIncident: "Structure Fire Industrial Area",
    destination: "Industrial Area Phase 1",
    eta: "6 Min",
    status: "Dispatched"
  },
  {
    id: "FS-IA",
    station: "Industrial Area Fire Station",
    coords: [30.7050, 76.8010],
    trucksAvailable: 6,
    firefighters: 30,
    currentIncident: "None - Standby Readiness",
    destination: "Fire Station Base",
    eta: "--",
    status: "Alert Ready"
  }
];

export const initialEmergencies = [
  {
    id: "EMG-1001",
    reporterName: "Suraj Verma",
    reporterPhone: "+91 98123 45678",
    type: "Road Accident",
    sector: "Sector 22",
    coords: [30.7390, 76.7590],
    priority: "Critical",
    description: "Two vehicle collision near Sector 22 main market light point. 2 injured individuals require trauma care.",
    reportedTime: "2026-09-03 12:15:00",
    assignedAmbulance: "Amb A-101",
    assignedPolice: "POL-17",
    nearestHospital: "PGIMER Chandigarh",
    status: "Responder On Route",
    responseTime: "4.2 Min"
  },
  {
    id: "EMG-1002",
    reporterName: "Neha Gupta",
    reporterPhone: "+91 98456 78901",
    type: "Structure Fire",
    sector: "Sector 43",
    coords: [30.7140, 76.7230],
    priority: "Critical",
    description: "Electrical short circuit fire in commercial complex 2nd floor. Heavy smoke reported.",
    reportedTime: "2026-09-03 12:22:10",
    assignedAmbulance: "Amb A-105",
    assignedPolice: "POL-34",
    nearestHospital: "Fortis Hospital Mohali",
    status: "Responder On Route",
    responseTime: "5.8 Min"
  },
  {
    id: "EMG-1003",
    reporterName: "Dr. Ananya Goel",
    reporterPhone: "+91 98765 11223",
    type: "Cardiac Arrest",
    sector: "Sector 15",
    coords: [30.7460, 76.7960],
    priority: "High",
    description: "68-year-old male experiencing sudden severe chest pain and breathlessness.",
    reportedTime: "2026-09-03 12:30:45",
    assignedAmbulance: "Amb A-103",
    assignedPolice: "POL-17",
    nearestHospital: "GMCH Sector 32",
    status: "Responder Arrived",
    responseTime: "3.4 Min"
  },
  {
    id: "EMG-1004",
    reporterName: "Karan Singh",
    reporterPhone: "+91 98321 65498",
    type: "Crime / Threat",
    sector: "Sector 35",
    coords: [30.7190, 76.7420],
    priority: "Medium",
    description: "Public disturbance near market food plaza. Police patrol dispatched to settle situation.",
    reportedTime: "2026-09-03 11:45:00",
    assignedAmbulance: null,
    assignedPolice: "POL-34",
    nearestHospital: "GMCH Sector 32",
    status: "Resolved",
    responseTime: "4.0 Min"
  }
];

export const initialStatusHistory = [
  { id: "SH-01", emergencyId: "EMG-1001", step: "Reported", timestamp: "12:15:00", note: "Incident reported by Suraj Verma" },
  { id: "SH-02", emergencyId: "EMG-1001", step: "Dispatcher Assigned", timestamp: "12:15:30", note: "Dispatcher assigned Amb A-101 & POL-17" },
  { id: "SH-03", emergencyId: "EMG-1001", step: "Responder On Route", timestamp: "12:16:10", note: "Amb A-101 en route via Sector 22 corridor" }
];

export const initialNotifications = [
  { id: "NOTIF-1", time: "12:35:00", text: "🚑 Amb A-101 dispatched to Sector 22 for Road Accident", type: "info" },
  { id: "NOTIF-2", time: "12:32:15", text: "🏥 PGIMER Chandigarh accepted incoming ICU patient", type: "success" },
  { id: "NOTIF-3", time: "12:28:40", text: "🚒 Fire Unit FS-17 reached Sector 43 destination", type: "warning" }
];

export const initialFeedback = [
  {
    id: "FB-1",
    name: "Aarav Sharma",
    role: "Sector 22 Resident",
    text: "During my grandfather's cardiac arrest last month, the SOSync app routed an ICU ambulance to our exact driveway in 4 minutes. Paramedics knew his clinical profile beforehand!",
    rating: 5
  },
  {
    id: "FB-2",
    name: "Dr. Ananya Goel",
    role: "ER Director, City General",
    text: "As an on-duty emergency coordinator, checking bed availability was previously done over slow phone calls. SOSync gives us a consolidated real-time HUD. Game changer!",
    rating: 5
  }
];

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialEmergencies, initialHospitals, initialAmbulances, initialPoliceUnits, initialFireStations, initialNotifications } from './data/mockDatabase';

// Helper to generate unique IDs
const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const useStore = create(persist(
  (set, get) => ({
    // ---------- Auth ----------
    user: null,
    isAuthenticated: false,
    login: (identifier, password, role = 'citizen') => {
      // Simple demo login – match demoAccounts elsewhere
      const mockUser = { id: identifier, name: identifier, role, token: 'LOCAL-JWT', loginTime: new Date().toLocaleTimeString() };
      set({ user: mockUser, isAuthenticated: true });
      return { success: true, user: mockUser };
    },
    logout: () => set({ user: null, isAuthenticated: false }),

    // ---------- Data ----------
    emergencies: initialEmergencies,
    hospitalRequests: [], // {id, incidentId?, hospitalId, status, ...}
    notifications: initialNotifications,
    hospitals: initialHospitals,
    ambulances: initialAmbulances,
    policeUnits: initialPoliceUnits,
    fireStations: initialFireStations,

    // ---------- UI ----------
    toast: null,
    showToast: (message, type = 'info') => {
      const id = Date.now();
      set({ toast: { id, message, type } });
      setTimeout(() => set({ toast: null }), 4000);
    },
    removeToast: () => set({ toast: null }),
    triggerSimulatedCall: (targetName, targetDetail = '') => {
      const message = targetDetail ? `Calling ${targetName} — ${targetDetail}` : `Calling ${targetName}`;
      set({ toast: { id: Date.now(), message, type: 'call' } });
      setTimeout(() => set(state => ({ toast: state.toast?.type === 'call' ? null : state.toast })), 2500);
    },

    // ---------- Notifications ----------
    addNotification: (text, type = 'info') => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const newNotif = { id: `NOTIF-${Date.now()}`, time: timeStr, text, type };
      set(state => ({ notifications: [newNotif, ...state.notifications.slice(0, 15)] }));
    },
    markNotificationAsRead: (id) => {
      set(state => ({ notifications: state.notifications.filter(n => n.id !== id) }));
    },

    // ---------- Emergencies ----------
    addEmergency: async (reportData) => {
      const fallbackId = generateId('EMG');
      const now = new Date();
      const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString()}`;
      const sectorsCoords = {
        "Sector 17": [30.7431, 76.7790],
        "Sector 22": [30.7390, 76.7590],
        "Sector 35": [30.7190, 76.7420],
        "Sector 43": [30.7140, 76.7230],
        "Sector 15": [30.7480, 76.7650],
        "Sector 26": [30.7460, 76.7960]
      };
      const targetCoords = sectorsCoords[reportData.sector] || [30.7333 + (Math.random() - 0.5) * 0.04, 76.7794 + (Math.random() - 0.5) * 0.04];
      const newReport = {
        id: fallbackId,
        reporterName: reportData.fullName || 'Anonymous Citizen',
        reporterPhone: reportData.phone || '+91 99000 00000',
        type: reportData.emergencyType || 'General Emergency',
        sector: reportData.sector || 'Sector 22',
        coords: targetCoords,
        priority: reportData.priority || 'High',
        description: reportData.description || 'Emergency alert logged via mobile portal.',
        reportedTime: formattedDate,
        assignedAmbulance: 'Amb A-102',
        assignedPolice: 'POL-17',
        nearestHospital: 'PGIMER Chandigarh',
        status: 'Responder On Route',
        responseTime: '4.0 Min',
        requesterId: get().user?.id || null,
        ...reportData.extra
      };
      set(state => ({ emergencies: [newReport, ...state.emergencies] }));
      get().showToast(`🚨 Incident ${newReport.id} logged! Dispatches mobilized to ${newReport.sector}.`, 'success');
      get().addNotification(`🚨 Emergency ${newReport.id} reported in ${newReport.sector} (${newReport.type})`, 'error');
      return newReport.id;
    },
    updateEmergency: (id, updates) => {
      set(state => ({ emergencies: state.emergencies.map(e => (e.id !== id ? e : { ...e, ...updates })) }));
      get().showToast(`✅ Incident ${id} updated`, 'success');
    },

    // ---------- Hospital Requests ----------
    addHospitalRequest: ({ incidentId = null, hospitalId, details = {} }) => {
      const requesterId = get().user?.id || null;
      const id = generateId('REQ');
      const request = { id, incidentId, hospitalId, requesterId, status: 'Requested', ...details, createdAt: new Date().toISOString() };
      set(state => ({ hospitalRequests: [request, ...state.hospitalRequests] }));
      get().showToast(`🏥 Hospital assistance request ${id} created`, 'info');
      return id;
    },
    updateHospitalRequestStatus: (id, status) => {
      set(state => ({ hospitalRequests: state.hospitalRequests.map(r => (r.id !== id ? r : { ...r, status })) }));
      get().showToast(`🏥 Request ${id} status changed to ${status}`, 'info');
    },

    // ---------- Map & Route ----------
    selectedRoute: null,
    drawRoute: (originCoords, destinationCoords, responderName) => {
      set({ selectedRoute: { origin: originCoords, destination: destinationCoords, responder: responderName } });
      get().showToast(`🗺️ Telemetry polyline generated for ${responderName}`, 'info');
    },
    clearRoute: () => set({ selectedRoute: null }),

    // ---------- Initialization ----------
    initializeData: () => {
      const s = get();
      if (!s.hospitals || s.hospitals.length === 0) {
        set({
          hospitals: initialHospitals,
          emergencies: initialEmergencies,
          ambulances: initialAmbulances,
          policeUnits: initialPoliceUnits,
          fireStations: initialFireStations,
          notifications: initialNotifications,
        });
      }
    },

    // ---------- Simulation Loop ----------
    _initSimulation: () => {
      const interval = setInterval(() => {
        set(state => ({
          ambulances: state.ambulances.map(amb => {
            if (amb.status === 'On Route') {
              const latShift = (Math.random() - 0.5) * 0.002;
              const lngShift = (Math.random() - 0.5) * 0.002;
              const updatedLat = amb.coords[0] + latShift;
              const updatedLng = amb.coords[1] + lngShift;
              return { ...amb, coords: [updatedLat, updatedLng], eta: `${Math.max(1, parseInt(amb.eta, 10) - 1 || 4)} Min` };
            }
            return amb;
          })
        }));
        const actions = [
          () => get().addNotification('🚑 Ambulance A-101 telemetry updated in Sector 22', 'info'),
          () => get().addNotification('🏥 PGIMER Chandigarh accepted incoming ICU transfer', 'success'),
          () => get().addNotification('🚒 Fire Station FS-17 confirmed standby alert readiness', 'info'),
          () => get().addNotification('👮 Police Patrol POL-34 clear at Sector 35 junction', 'success')
        ];
        const rand = actions[Math.floor(Math.random() * actions.length)];
        rand();
      }, 6000);
      return () => clearInterval(interval);
    }
  }),
  {
    name: 'sosync_store',
    partialize: (state) => {
      const { toast, ...persisted } = state;
      return persisted;
    }
  }
));

export default useStore;

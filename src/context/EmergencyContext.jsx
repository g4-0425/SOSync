import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  initialEmergencies,
  initialHospitals,
  initialAmbulances,
  initialPoliceUnits,
  initialFireStations,
  initialNotifications
} from '../data/mockDatabase';

const EmergencyContext = createContext();

export function EmergencyProvider({ children }) {
  const [emergencies, setEmergencies] = useLocalStorage('sosync_emergencies', initialEmergencies);
  const [hospitals, setHospitals] = useLocalStorage('sosync_hospitals', initialHospitals);
  const [ambulances, setAmbulances] = useLocalStorage('sosync_ambulances', initialAmbulances);
  const [policeUnits] = useState(initialPoliceUnits);
  const [fireStations] = useState(initialFireStations);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Active route for Leaflet polyline drawing
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Toast notifications manager
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const addNotification = useCallback((text, type = 'info') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setNotifications(prev => [
      { id: `NOTIF-${Date.now()}`, time: timeStr, text, type },
      ...prev.slice(0, 15)
    ]);
  }, []);

  // Add new emergency report
  const addEmergencyReport = useCallback((reportData) => {
    const newId = `EMG-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString()}`;

    // Random sector coordinates in Chandigarh
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
      id: newId,
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
      responseTime: '4.0 Min'
    };

    setEmergencies(prev => [newReport, ...prev]);
    showToast(`🚨 Incident ${newId} logged! Dispatches mobilized to ${newReport.sector}.`, 'success');
    addNotification(`🚨 Emergency ${newId} reported in ${newReport.sector} (${newReport.type})`, 'error');

    return newId;
  }, [setEmergencies, showToast, addNotification]);

  // Handle View Route polyline calculation
  const drawRoute = useCallback((originCoords, destinationCoords, responderName) => {
    setSelectedRoute({
      origin: originCoords,
      destination: destinationCoords,
      responder: responderName
    });
    showToast(`🗺️ Telemetry Polyline generated for ${responderName}`, 'info');
  }, [showToast]);

  const clearRoute = useCallback(() => {
    setSelectedRoute(null);
  }, []);

  // Simulator Loop (Every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Shift ambulance coordinates slightly
      setAmbulances(prev => prev.map(amb => {
        if (amb.status === 'On Route') {
          const latShift = (Math.random() - 0.5) * 0.002;
          const lngShift = (Math.random() - 0.5) * 0.002;
          const updatedLat = amb.coords[0] + latShift;
          const updatedLng = amb.coords[1] + lngShift;
          
          return {
            ...amb,
            coords: [updatedLat, updatedLng],
            eta: `${Math.max(1, parseInt(amb.eta, 10) - 1 || 4)} Min`
          };
        }
        return amb;
      }));

      // 2. Push periodic mock updates to feed
      const actions = [
        () => addNotification("🚑 Ambulance A-101 telemetry updated in Sector 22", "info"),
        () => addNotification("🏥 PGIMER Chandigarh accepted incoming ICU transfer", "success"),
        () => addNotification("🚒 Fire Station FS-17 confirmed standby alert readiness", "info"),
        () => addNotification("👮 Police Patrol POL-34 clear at Sector 35 junction", "success")
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      randomAction();
    }, 6000);

    return () => clearInterval(timer);
  }, [setAmbulances, addNotification]);

  // Derived Analytics Data using useMemo
  const stats = useMemo(() => {
    const total = emergencies.length;
    const active = emergencies.filter(e => e.status !== 'Resolved').length;
    const resolved = emergencies.filter(e => e.status === 'Resolved').length;
    const critical = emergencies.filter(e => e.priority === 'Critical').length;
    const activeAmbulances = ambulances.filter(a => a.status === 'Available').length;
    const availableBeds = hospitals.reduce((acc, h) => acc + h.bedsAvailable, 0);

    return {
      total,
      active,
      resolved,
      critical,
      activeAmbulances,
      availableBeds,
      totalHospitals: hospitals.length,
      totalPolice: policeUnits.length,
      totalFire: fireStations.length
    };
  }, [emergencies, ambulances, hospitals, policeUnits, fireStations]);

  return (
    <EmergencyContext.Provider value={{
      emergencies,
      hospitals,
      ambulances,
      policeUnits,
      fireStations,
      notifications,
      selectedRoute,
      toast,
      stats,
      showToast,
      addEmergencyReport,
      drawRoute,
      clearRoute
    }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within EmergencyProvider');
  return context;
}

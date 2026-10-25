import React, { createContext, useContext, useMemo } from 'react';
import useStore from '../store';

// Emergency context provides shared state and actions via Zustand store.
const EmergencyContext = createContext();

export function EmergencyProvider({ children }) {
  const {
    emergencies,
    hospitals,
    ambulances,
    policeUnits,
    fireStations,
    notifications,
    selectedRoute,
    toast,
    hospitalRequests,
    // actions
    addEmergency,
    updateEmergency,
    addHospitalRequest,
    updateHospitalRequestStatus,
    addNotification,
    showToast,
    triggerSimulatedCall,
    drawRoute,
    clearRoute,
  } = useStore();

  // Derived analytics similar to previous implementation.
  const stats = useMemo(() => {
    const total = emergencies.length;
    const active = emergencies.filter(e => e.status !== 'Resolved').length;
    const resolved = emergencies.filter(e => e.status === 'Resolved').length;
    const critical = emergencies.filter(e => e.priority === 'Critical').length;
    const activeAmbulances = ambulances.filter(a => a.status === 'Available').length;
    const availableBeds = hospitals.reduce((acc, h) => acc + (h.bedsAvailable || 0), 0);
    return {
      total,
      active,
      resolved,
      critical,
      activeAmbulances,
      availableBeds,
      totalHospitals: hospitals.length,
      totalPolice: policeUnits.length,
      totalFire: fireStations.length,
    };
  }, [emergencies, ambulances, hospitals, policeUnits, fireStations]);

  // Preserve the previous API shape so existing components keep working.
  const value = {
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
    triggerSimulatedCall,
    // original name used in components
    addEmergencyReport: addEmergency,
    drawRoute,
    clearRoute,
    updateEmergency,
    addHospitalRequest,
    updateHospitalRequestStatus,
    addNotification,
    // expose hospitalRequests for My Hospital Requests page
    hospitalRequests,
  };

  return (
    <EmergencyContext.Provider value={value}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within EmergencyProvider');
  return context;
}

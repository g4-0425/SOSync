// src/utils/apiClient.js

/**
 * Simple API client for SOSync backend.
 * All functions return the parsed JSON response on success
 * or `null` when the backend is unreachable (network error or non‑2xx).
 * The frontend can decide to fall back to mock data when `null` is returned.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function postEmergency(emergency) {
  try {
    const resp = await fetch(`${API_BASE}/api/emergencies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emergency),
    });
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, falling back to mock data:', e);
    return null;
  }
}

export async function getHospitals() {
  try {
    const resp = await fetch(`${API_BASE}/api/hospitals`);
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, falling back to mock data:', e);
    return null;
  }
}

export async function getHospitalRecommendation(emergencyId) {
  try {
    const resp = await fetch(`${API_BASE}/api/hospitals/recommend/${emergencyId}`);
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, falling back to mock data:', e);
    return null;
  }
}

export async function getAmbulances() {
  try {
    const resp = await fetch(`${API_BASE}/api/ambulances`);
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, falling back to mock data:', e);
    return null;
  }
}

export async function updateAmbulanceStatus(id, status) {
  try {
    const resp = await fetch(`${API_BASE}/api/ambulances/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status),
    });
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, fallback ignored:', e);
    return null;
  }
}

export async function getAgencyOfficers() {
  try {
    const resp = await fetch(`${API_BASE}/api/agency`);
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, falling back to mock data:', e);
    return null;
  }
}

export async function updateOfficerStatus(id, status) {
  try {
    const resp = await fetch(`${API_BASE}/api/agency/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status),
    });
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, fallback ignored:', e);
    return null;
  }
}

// NEW: Update emergency status (or any field) – backend only exposes status update.
export async function updateEmergencyStatus(id, status) {
  try {
    const resp = await fetch(`${API_BASE}/api/emergencies/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status),
    });
    if (!resp.ok) throw new Error('Network response not ok');
    return await resp.json();
  } catch (e) {
    console.warn('Backend unavailable, fallback ignored:', e);
    return null;
  }
}

// Helper to translate backend Emergency entity to frontend model
export function mapBackendEmergency(be) {
  return {
    id: be.emergencyId?.toString() || '',
    reporterName: be.reporterName,
    reporterPhone: be.contactNumber,
    type: be.emergencyType,
    sector: be.sector,
    description: be.description,
    priority: be.priority,
    status: be.status,
    reportedTime: be.reportedAt,
    // Frontend expects coordinates; backend provides location string – keep as empty array for now
    coords: [],
    assignedAmbulance: '',
    assignedPolice: '',
    nearestHospital: ''
  };
}

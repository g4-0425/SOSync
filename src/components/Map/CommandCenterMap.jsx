import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../../context/EmergencyContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function CommandCenterMap() {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const polylineInstance = useRef(null);
  const markersRef = useRef([]);

  const {
    hospitals,
    ambulances,
    policeUnits,
    fireStations,
    emergencies,
    selectedRoute,
    drawRoute,
    clearRoute
  } = useEmergency();

  const navigate = useNavigate();

  // Custom Icon Generator
  const createDivIcon = (className, charSymbol) => {
    return L.divIcon({
      className: `cc-marker ${className}`,
      html: `<div class="cc-marker-inner"><span>${charSymbol}</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    // Initialize Leaflet Map centered on Chandigarh
    const map = L.map(mapRef.current, {
      center: [30.7333, 76.7794],
      zoom: 12,
      zoomControl: false
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    leafletInstance.current = map;

    const timer = setTimeout(() => {
      if (leafletInstance.current) {
        leafletInstance.current.invalidateSize();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
      activeMarkersRef.current = {};
    };
  }, []);

  // Helper to attach mouseover/mouseout popup behavior to markers
  const attachHoverPopup = (marker) => {
    let hideTimer = null;

    marker.on('mouseover', function () {
      if (hideTimer) clearTimeout(hideTimer);
      this.openPopup();
    });

    marker.on('mouseout', function () {
      hideTimer = setTimeout(() => {
        const popup = this.getPopup();
        if (popup && popup.getElement()) {
          const elem = popup.getElement();
          if (elem && elem.matches(':hover')) {
            const onPopupLeave = () => {
              this.closePopup();
              elem.removeEventListener('mouseleave', onPopupLeave);
            };
            elem.addEventListener('mouseleave', onPopupLeave);
            return;
          }
        }
        this.closePopup();
      }, 250);
    });
  };

  const activeMarkersRef = useRef({});

  // Render & Update Markers on Data Change
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map) return;

    const currentKeys = new Set();

    // 1. Hospitals (Blue)
    hospitals.forEach(h => {
      const key = `hosp-${h.id}`;
      currentKeys.add(key);

      if (activeMarkersRef.current[key] && activeMarkersRef.current[key]._map === map) {
        activeMarkersRef.current[key].setLatLng(h.coords);
      } else {
        const marker = L.marker(h.coords, { icon: createDivIcon('cc-marker-hospital', '🏥') })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif; min-width:200px; color:#F8FAFC">
              <h4 style="font-size:1.05rem; margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.35rem">${h.name}</h4>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Status:</strong> <span style="color:#22C55E">${h.status}</span></div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Available Beds:</strong> ${h.bedsAvailable} / ${h.totalBeds}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>ICU Beds:</strong> ${h.icuBeds}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Doctors:</strong> ${h.doctors}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Emergency Phone:</strong> ${h.phone}</div>
            </div>
          `);
        attachHoverPopup(marker);
        activeMarkersRef.current[key] = marker;
      }
    });

    // 2. Police Stations (Dark Navy)
    policeUnits.forEach(p => {
      const key = `police-${p.station}`;
      currentKeys.add(key);

      if (activeMarkersRef.current[key] && activeMarkersRef.current[key]._map === map) {
        activeMarkersRef.current[key].setLatLng(p.coords);
      } else {
        const marker = L.marker(p.coords, { icon: createDivIcon('cc-marker-police', '👮') })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif; min-width:200px; color:#F8FAFC">
              <h4 style="font-size:1.05rem; margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.35rem">${p.station}</h4>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Officer:</strong> ${p.officer}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Units Ready:</strong> ${p.unitsAvailable}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Active Case:</strong> ${p.activeCase}</div>
            </div>
          `);
        attachHoverPopup(marker);
        activeMarkersRef.current[key] = marker;
      }
    });

    // 3. Fire Stations (Orange)
    fireStations.forEach(f => {
      const key = `fire-${f.station}`;
      currentKeys.add(key);

      if (activeMarkersRef.current[key] && activeMarkersRef.current[key]._map === map) {
        activeMarkersRef.current[key].setLatLng(f.coords);
      } else {
        const marker = L.marker(f.coords, { icon: createDivIcon('cc-marker-fire', '🚒') })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif; min-width:200px; color:#F8FAFC">
              <h4 style="font-size:1.05rem; margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.35rem">${f.station}</h4>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Fire Trucks:</strong> ${f.trucksAvailable}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Firefighters:</strong> ${f.firefighters}</div>
              <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Incident:</strong> ${f.currentIncident}</div>
            </div>
          `);
        attachHoverPopup(marker);
        activeMarkersRef.current[key] = marker;
      }
    });

    // 4. Ambulances (Red Siren)
    ambulances.forEach(a => {
      const key = `amb-${a.id}`;
      currentKeys.add(key);

      if (activeMarkersRef.current[key] && activeMarkersRef.current[key]._map === map) {
        activeMarkersRef.current[key].setLatLng(a.coords);
      } else {
        const popupDiv = document.createElement('div');
        popupDiv.style.fontFamily = 'sans-serif';
        popupDiv.style.minWidth = '210px';
        popupDiv.style.color = '#F8FAFC';
        popupDiv.innerHTML = `
          <h4 style="font-size:1.05rem; margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.35rem">${a.id}</h4>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Driver:</strong> ${a.driver}</div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Status:</strong> <span style="color:${a.status === 'Available' ? '#22C55E' : '#F59E0B'}">${a.status}</span></div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Location:</strong> ${a.sector}</div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Destination:</strong> ${a.destination}</div>
          <div style="font-size:0.85rem; margin-bottom:0.6rem"><strong>ETA:</strong> ${a.eta}</div>
          <button class="btn btn-primary view-route-btn" style="width:100%; padding:0.4rem; font-size:0.75rem; cursor:pointer">VIEW ROUTE</button>
        `;

        const btn = popupDiv.querySelector('.view-route-btn');
        if (btn) {
          btn.addEventListener('click', () => {
            const targetEmergency = emergencies.find(e => e.id === a.assignedEmergencyId) || emergencies[0];
            if (targetEmergency) {
              drawRoute(a.coords, targetEmergency.coords, a.id);
            }
          });
        }

        const marker = L.marker(a.coords, { icon: createDivIcon('cc-marker-ambulance', '🚑') })
          .addTo(map)
          .bindPopup(popupDiv);
        attachHoverPopup(marker);
        activeMarkersRef.current[key] = marker;
      }
    });

    // 5. Active Emergencies (Pulsing Red)
    emergencies.forEach(e => {
      const key = `emg-${e.id}`;
      currentKeys.add(key);

      if (activeMarkersRef.current[key] && activeMarkersRef.current[key]._map === map) {
        activeMarkersRef.current[key].setLatLng(e.coords);
      } else {
        const popupDiv = document.createElement('div');
        popupDiv.style.fontFamily = 'sans-serif';
        popupDiv.style.minWidth = '220px';
        popupDiv.style.color = '#F8FAFC';
        popupDiv.innerHTML = `
          <h4 style="font-size:1.05rem; margin-bottom:0.3rem; color:#EF4444">${e.type}</h4>
          <div style="font-size:0.75rem; color:#94A3B8; margin-bottom:0.5rem">ID: ${e.id} | Priority: <strong>${e.priority}</strong></div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Sector:</strong> ${e.sector}</div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Status:</strong> ${e.status}</div>
          <div style="font-size:0.85rem; margin-bottom:0.3rem"><strong>Assigned:</strong> ${e.assignedAmbulance || 'Dispatch Pending'}</div>
          <div style="font-size:0.85rem; margin-bottom:0.6rem"><strong>Nearest Hosp:</strong> ${e.nearestHospital}</div>
          <button class="btn btn-accent view-details-btn" style="width:100%; padding:0.4rem; font-size:0.75rem; cursor:pointer">VIEW DETAILS & TIMELINE</button>
        `;

        const btn = popupDiv.querySelector('.view-details-btn');
        if (btn) {
          btn.addEventListener('click', () => {
            navigate(`/emergency/${e.id}`);
          });
        }

        const marker = L.marker(e.coords, { icon: createDivIcon('cc-marker-emergency', '🚨') })
          .addTo(map)
          .bindPopup(popupDiv);
        attachHoverPopup(marker);
        activeMarkersRef.current[key] = marker;
      }
    });

    // Cleanup keys no longer present
    Object.keys(activeMarkersRef.current).forEach(key => {
      if (!currentKeys.has(key)) {
        activeMarkersRef.current[key].remove();
        delete activeMarkersRef.current[key];
      }
    });

  }, [hospitals, ambulances, policeUnits, fireStations, emergencies, drawRoute, navigate]);

  // Handle Polyline Route Drawing
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map) return;

    if (polylineInstance.current) {
      polylineInstance.current.remove();
      polylineInstance.current = null;
    }

    if (selectedRoute) {
      const latlngs = [selectedRoute.origin, selectedRoute.destination];
      const polyline = L.polyline(latlngs, {
        color: '#DC2626',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 10'
      }).addTo(map);

      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      polylineInstance.current = polyline;
    }
  }, [selectedRoute]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '550px' }}>
      <div ref={mapRef} className="command-center-map" style={{ width: '100%', height: '100%', borderRadius: 'var(--border-radius-md)' }} />
      {selectedRoute && (
        <button 
          onClick={clearRoute}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            padding: '0.5rem 1rem',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(15, 23, 42, 0.9)'
          }}
        >
          Clear Route Polyline
        </button>
      )}
    </div>
  );
}

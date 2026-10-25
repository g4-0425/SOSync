import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store';

// My Emergencies page – shows emergencies created by the logged‑in citizen
export default function MyEmergenciesPage() {
  const { user, isAuthenticated, emergencies } = useStore();

  if (!isAuthenticated) {
    return <p>Please log in to view your emergencies.</p>;
  }

  // Filter emergencies belonging to the current user; if none, fall back to all emergencies
  const myEmergencies = emergencies.filter(e => e.requesterId === user?.id);
  const displayEmergencies = myEmergencies.length > 0 ? myEmergencies : emergencies;

  if (displayEmergencies.length === 0) {
    return <p>No emergencies reported yet.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{myEmergencies.length > 0 ? 'My Emergencies' : 'All Emergencies'}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc' }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Type</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Sector</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Priority</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Reported</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Status</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {displayEmergencies.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.type}</td>
              <td>{e.sector}</td>
              <td>{e.priority}</td>
              <td>{new Date(e.reportedTime).toLocaleString()}</td>
              <td>{e.status}</td>
              <td>
                <Link to={`/emergency/${e.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

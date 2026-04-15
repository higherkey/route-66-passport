"use client";
import React from 'react';
import { TULSA_LANDMARKS, calculateDistance, Landmark } from '../lib/landmarks';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Passport() {
  const { lat, lng, error } = useGeolocation();
  const [stamps, setStamps] = useLocalStorage<Record<string, boolean>>('route-66-stamps', {});
  const [statusMsg, setStatusMsg] = React.useState<string>("");

  const checkIn = (landmark: Landmark) => {
    if (lat === null || lng === null) {
      setStatusMsg("Waiting for GPS signal...");
      return;
    }

    const distance = calculateDistance(lat, lng, landmark.lat, landmark.lng);
    
    if (distance <= 100) {
      setStamps({ ...stamps, [landmark.id]: true });
      setStatusMsg(`Successfully stamped: ${landmark.name}!`);
    } else {
      setStatusMsg(`Too far! You are ${(distance / 1609.34).toFixed(2)} miles away from ${landmark.name}.`);
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>Route 66 Digital Passport</h1>
        <p className="brand-font" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Tulsa Centennial Edition</p>
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {statusMsg && <p style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{statusMsg}</p>}
        
        <div style={{ background: 'white', padding: '10px', borderRadius: '5px', display: 'inline-block', fontSize: '0.8rem' }}>
          Current Location: {lat?.toFixed(4)}, {lng?.toFixed(4)}
        </div>
      </header>

      <div className="stamp-grid">
        {TULSA_LANDMARKS.map((landmark) => (
          <article key={landmark.id} className="stamp-card">
            <div>
              <div className={`stamp-badge ${stamps[landmark.id] ? 'authenticated' : ''}`}>
                {landmark.icon}
              </div>
              <h3>{landmark.name}</h3>
              <p style={{ fontSize: '0.9rem' }}>{landmark.description}</p>
            </div>
            
            <button 
              className={stamps[landmark.id] ? 'secondary outline' : 'neon-orange-btn'}
              onClick={() => checkIn(landmark)}
              disabled={stamps[landmark.id]}
            >
              {stamps[landmark.id] ? 'LANDMARK VISITED' : 'STAMP PASSPORT'}
            </button>
          </article>
        ))}
      </div>

      <footer style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <p>© 2026 Route 66 Centennial • Tulsa, OK</p>
      </footer>
    </div>
  );
}

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
    
    // Proximity check: 100 meters
    if (distance <= 100) {
      setStamps({ ...stamps, [landmark.id]: true });
      setStatusMsg(`Success! Stamped: ${landmark.name}`);
      
      // Haptic feedback if available
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }
    } else {
      const distanceDisplay = distance > 1000 
        ? `${(distance / 1609.34).toFixed(1)} miles` 
        : `${Math.round(distance)} meters`;
      setStatusMsg(`Too far! You are ${distanceDisplay} from ${landmark.name}.`);
    }
  };

  return (
    <>
      <div className="noise-overlay" />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header className="postcard-header">
          <img src="/logo.png" alt="Route 66 Tulsa" className="vintage-logo" />
          <h1 style={{ fontSize: '1.2rem', opacity: 0.6, marginBottom: '0.5rem' }}>Digital Passport</h1>
          <p className="brand-font" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: 0 }}>
            Centennial Expedition
          </p>
          
          <div style={{ marginTop: '1.5rem', minHeight: '1.5rem' }}>
            {error && <p style={{ color: '#d9534f', fontSize: '0.9rem' }}>⚠️ {error}</p>}
            {statusMsg && (
              <p style={{ 
                color: 'var(--primary)', 
                fontStyle: 'italic', 
                fontWeight: 'bold',
                animation: 'fadeIn 0.5s ease'
              }}>
                {statusMsg}
              </p>
            )}
          </div>
          
          <div style={{ 
            marginTop: '1rem', 
            background: 'rgba(0,0,0,0.05)', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            display: 'inline-block', 
            fontSize: '0.7rem',
            opacity: 0.5
          }}>
            GPS: {lat ? `${lat.toFixed(4)}, ${lng?.toFixed(4)}` : "Detecting..."}
          </div>
        </header>

        <section className="stamp-grid">
          {TULSA_LANDMARKS.map((landmark) => (
            <article key={landmark.id} className="stamp-card">
              <div>
                <div className={`stamp-badge ${stamps[landmark.id] ? 'authenticated' : ''}`}>
                  <span style={{ fontSize: stamps[landmark.id] ? '4.5rem' : '4rem', transition: '0.3s' }}>
                    {landmark.icon}
                  </span>
                </div>
                <h3>{landmark.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>
                  {landmark.description}
                </p>
              </div>
              
              <button 
                className={`btn-stamp ${stamps[landmark.id] ? 'visited' : ''}`}
                onClick={() => checkIn(landmark)}
                disabled={stamps[landmark.id]}
              >
                {stamps[landmark.id] ? 'LANDMARK VISITED' : 'STAMP PASSPORT'}
              </button>
            </article>
          ))}
        </section>

        <footer style={{ 
          marginTop: '6rem', 
          padding: '4rem 2rem', 
          borderTop: '2px dashed rgba(0,0,0,0.1)', 
          textAlign: 'center',
          opacity: 0.4,
          fontSize: '0.8rem'
        }}>
          <p>EST. 1926 • THE MOTHER ROAD • TULSA, OKLAHOMA</p>
          <p style={{ letterSpacing: '2px' }}>RETRO-FUTURE AMERICANA • v0.1 ALPHA</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

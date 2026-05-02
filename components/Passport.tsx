"use client";
import React from 'react';
import { TULSA_LANDMARKS, calculateDistance, Landmark } from '../lib/landmarks';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Passport() {
  const { lat, lng, error: geoError } = useGeolocation();
  const [stamps, setStamps] = useLocalStorage<Record<string, boolean>>('route-66-stamps', {});
  const [statusMsg, setStatusMsg] = React.useState<string>("");
  const [isError, setIsError]     = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const dismissMessage = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setStatusMsg("");
      setIsError(false);
      setIsExiting(false);
    }, 300); // match CSS toast-out duration
  }, []);

  // Auto-dismiss messages
  React.useEffect(() => {
    if (statusMsg || geoError) {
      if (geoError) {
        setIsError(true);
        setStatusMsg(`⚠ ${geoError}`);
      }
      
      const timer = setTimeout(dismissMessage, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg, geoError, dismissMessage]);

  const checkIn = (landmark: Landmark) => {
    if (lat === null || lng === null) {
      setStatusMsg("Waiting for GPS signal...");
      setIsError(true);
      return;
    }

    const distance = calculateDistance(lat, lng, landmark.lat, landmark.lng);
    
    if (distance <= 100) {
      setStamps({ ...stamps, [landmark.id]: true });
      setStatusMsg(`✓ Stamped: ${landmark.name}`);
      setIsError(false);
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }
    } else {
      const distanceDisplay = distance > 1609
        ? `${(distance / 1609.34).toFixed(1)} mi`
        : `${Math.round(distance)} m`;
      setStatusMsg(`Too far — ${distanceDisplay} from ${landmark.name}`);
      setIsError(true);
    }
  };

  const stampsEarned = Object.values(stamps).filter(Boolean).length;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── COMPACT HEADER ───────────────────────────────────── */}
      <header className="site-header">
        <div className="logo-wrap">
          <img src="/logo.png" alt="Route 66 Tulsa" className="vintage-logo" />
          <div>
            <h1>Digital Passport</h1>
            <p className="subtitle">Centennial Expedition · 1926–2026</p>
          </div>
        </div>

        <div className="header-right">
          {/* ── PROMINENT COORDINATES ──────────────────────────── */}
          <div className="coords-display" title="Your current GPS coordinates">
            <span className={`gps-dot ${lat ? 'live' : 'wait'}`} aria-hidden="true" />
            {lat
              ? <span>{lat.toFixed(5)}, {lng?.toFixed(5)}</span>
              : <span>ACQUIRING&nbsp;GPS…</span>
            }
          </div>

          {/* ── PROGRESS PILL ─────────────────────────────────── */}
          <div style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            fontFamily: "'Arvo', serif",
            color: 'var(--primary)',
            letterSpacing: '1px',
            flexShrink: 0,
            display: 'none' /* Hide on small screens if it gets crowded */
          }}>
            {stampsEarned}/{TULSA_LANDMARKS.length}&nbsp;STAMPED
          </div>
        </div>
      </header>

      {/* ── FLOATING TOAST NOTIFICATION ─────────────────────── */}
      {statusMsg && (
        <div className={`status-toast ${isExiting ? 'exiting' : ''}`} role="alert">
          <div className={`toast-progress ${isError ? 'error' : ''}`} />
          <div className={`toast-content ${isError ? 'error' : ''}`}>
            {statusMsg}
          </div>
          <button 
            className="toast-close" 
            onClick={dismissMessage}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      {/* ── STAMP GRID ──────────────────────────────────────── */}
      <main>
        <section className="stamp-grid">
          {TULSA_LANDMARKS.map((landmark) => (
            <article
              key={landmark.id}
              className="stamp-card"
              tabIndex={0}
              aria-label={`${landmark.name}${stamps[landmark.id] ? ' — Stamped' : ''}`}
            >
              <div className={`stamp-badge ${stamps[landmark.id] ? 'authenticated' : ''}`}>
                <span aria-hidden="true">{landmark.icon}</span>
              </div>

              <h3>{landmark.name}</h3>

              <div className="card-details-wrapper">
                <p>{landmark.description}</p>
                <button
                  className="btn-stamp"
                  onClick={(e) => { e.stopPropagation(); checkIn(landmark); }}
                  disabled={!!stamps[landmark.id]}
                >
                  {stamps[landmark.id] ? 'STAMPED' : 'STAMP'}
                </button>
              </div>

              {/* Duplicate button for mobile/closed state accessibility */}
              {!stamps[landmark.id] && (
                <div style={{ marginTop: 'auto', width: '100%', fontSize: '0.6rem', opacity: 0.7, fontWeight: '700', color: 'var(--ink)' }}>
                  TAP TO STAMP
                </div>
              )}
              {stamps[landmark.id] && (
                <div style={{ marginTop: 'auto', color: 'var(--secondary)', fontSize: '0.6rem', fontWeight: '700' }}>
                  ✓ COLLECTED
                </div>
              )}
            </article>
          ))}
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="site-footer">
        <p>Est. 1926 · The Mother Road · Tulsa, Oklahoma</p>
        <p>
          Designed by <a 
            href="https://github.com/higherKey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}
          >
            higherKey
            <svg 
              width="10" 
              height="10" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a> · v0.1 Alpha
        </p>
        <p style={{ fontSize: '0.55rem', opacity: 0.6, marginTop: '1rem' }}>
          <a 
            href="https://www.flaticon.com/free-icons/highway" 
            title="highway icons" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'inherit', 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            Highway icons created by Freepik - Flaticon
            <svg 
              width="8" 
              height="8" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </p>
      </footer>
    </>
  );
}

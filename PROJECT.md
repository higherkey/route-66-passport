# Route 66 Digital Passport (Centennial Edition)

## Project Vision: "Retro-Future Americana"
A digital passport for the modern road-tripper, blending the vintage charm of "The Mother Road" with cutting-edge Geolocation and PWA technology. This project commemorates the Centennial of Route 66 by encouraging exploration through a gamified landmark-stamping experience.

---

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: [Pico.css](https://picocss.com/) (Classless CSS) + Custom Neon/Retro accents
- **PWA**: `next-pwa` for offline-first capabilities
- **Deployment**: [GitHub Pages](https://pages.github.com/) (using GitHub Actions)
- **Geolocation**: Web browser Geolocation API for proximity-based stamping
- **Persistence**: LocalStorage (Phase 1) transitioning to Supabase (Phase 2)
- **Map**: Mapbox GL JS (Future Phase)

---

## Roadmap

### Phase 1: POC Alpha (Current)
- [x] Project Initialization (Next.js, Pico.css, Git)
- [x] Infrastructure Setup (GitHub, Issues)
- [ ] UI: "Vintage Postcard" Theme implementation
- [ ] Logic: Geolocation-based landmark "Check-in" (100m proximity)
- [ ] Data: Initial Tulsa Landmark set (6 locations)
- [ ] State: LocalStorage persistence for "Stamp" status

### Phase 2: MVP Beta (Upcoming)
- [ ] **Auth**: Supabase/Firebase for cross-device synchronization
- [ ] **Interactive Map**: Mapbox integration for the 2,448-mile path
- [ ] **Digital Scrapbook**: Photo upload per "stamp"
- [ ] **Gamification**: Leaderboard and community stats

---

## Landmarks (Tulsa POC)
1. **Meadow Gold Sign**: 11th & Quaker (36.1486, -95.9861)
2. **The Golden Driller**: Expo Square (36.1336, -95.9312)
3. **Buck Atom's Cosmic Curios**: 11th St (36.1480, -95.9737)
4. **Mother Road Market**: Lewis Ave (36.1484, -95.9715)
5. **Cyrus Avery Centennial Plaza**: Southwest Blvd (36.1429, -96.0047)
6. **Blue Whale of Catoosa**: Highway 66 (36.1937, -95.7331)

---

## Design System
- **Background**: Antique Cream (`#FDF5E6`)
- **Primary Buttons**: Desert Orange (`#ED8B00`)
- **Neon Accents**: Electric Cyan (`#00E5FF`)
- **Typography**: 
    - Headers: Bold Slab Serif (e.g., Arvo)
    - Body: Clean Sans-Serif (e.g., Inter)

---

## Implementation Log (Main Branch Trace)
*   **2026-04-15**: Initialized Next.js project. Set up GitHub repo and initial issues. Configured Pico.css and PWA dependencies. Landmark dataset defined for Tulsa.
*   **2026-04-15**: Completed UI Overhaul. Implemented "Semi-Distressed" Vintage Postcard theme with postage-stamp edges, parchment textures, and Neon Orange flicker effects. Added brand assets (logo, texture).

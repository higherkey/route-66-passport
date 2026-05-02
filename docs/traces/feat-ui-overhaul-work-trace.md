# Work Trace - feat/ui-overhaul

## 1) Planned Work

### TODO List
- [x] Initialize feature branch and trace document
- [x] Refactor `globals.css` using **Pico.css** and the "Retro-Future Americana" palette
- [x] Improve "Postage Stamp" card borders and shadows
- [x] Add "Neon Cyan" glow effects and flickering animations
- [x] Redesign header for a high-fidelity "Vintage Postcard" look
- [x] Compress layout for desktop (Final — full rewrite)
- [x] Fix background (SVG seamless grain, no tiling)
- [x] Implement Ultra-Compact card design with hover expansion
- [x] Fix card expansion "row stretch" issue (`align-items: start`)
- [x] Convert header to sticky compact bar (not hero)
- [x] Make coordinates prominent (dark terminal pill in header)
- [x] Fix excess margin (removed Pico `.container` padding override)
- [x] Update footer branding ("Designed by Higherkey") and contrast
- [ ] Final visual audit for "Beta" state

### File List
- `app/globals.css`: [MODIFY] Full rewrite — design tokens, seamless bg, compact header, grid, cards.
- `components/Passport.tsx`: [MODIFY] Full rewrite — sticky header, coords display, progress counter, cleaner card JSX.

### Rationale
The Pico `.container` class was adding ~1.5rem horizontal padding on each side, inflating the hero area. Replacing the header with a sticky compact bar and moving coordinates to a prominent "terminal pill" gives a functional, utilitarian "Retro-Future" feel rather than a decorative hero.

## 2) In Progress Work

## 3) Completed Work

## 4) Issues and Out of Scope
### 4a) Potential Blockers
None identified yet.

### 4b) Opportunities
- Integration with Mapbox for a visual route.
- Photo capture feature for each stamp.

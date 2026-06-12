# Route 66 Digital Passport

> A centennial digital passport web application for exploring Route 66 — "The Mother Road."

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/richardlitt/standard-readme)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://higherkey.github.io/route-66-passport/)
[![Next.js CI/CD](https://github.com/higherkey/route-66-passport/actions/workflows/nextjs.yml/badge.svg)](https://github.com/higherkey/route-66-passport/actions/workflows/nextjs.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react)](https://react.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Route 66 Digital Passport helps travelers explore points of interest along Route 66, collect digital stamps at physical checkpoints, and log their journeys.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Background

The project combines Next.js App Router and Progressive Web App functionalities (via `next-pwa`) with geolocation APIs to create an offline-capable digital travel companion.

### Project Structure
- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Stamps, Grid, etc.).
- `/hooks`: Custom React hooks (Geolocation, LocalStorage).
- `/public`: Static assets and PWA manifest.

For detailed technical roadmap notes, see [PROJECT.md](./PROJECT.md).

---

## Install

### Prerequisites
- Node.js 18+
- npm

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/higherkey/route-66-passport.git
   cd route-66-passport
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Usage

### Local Development
To launch the hot-reloaded development server locally:
```bash
npm run dev
```

### Production Build
To compile the production build:
```bash
npm run build
```
And start the server:
```bash
npm run start
```

---

## Contributing

We welcome contributions. Please read the `AGENTS.md` and `PROJECT.md` for platform conventions and Next.js version specifics.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

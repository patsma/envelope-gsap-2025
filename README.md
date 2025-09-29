# 📧 Envelope Animation 2025

An elegant SVG envelope opening animation built with GSAP, Vite, and vanilla JavaScript. Features complex morphing animations, smooth timeline sequencing, and professional code architecture.

**[View Live Demo →](https://envelope-animation-2025.netlify.app/)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/c2c684e7-0d7b-47d2-85a8-9f0f196e92b0/deploy-status)](https://app.netlify.com/projects/envelope-animation-2025/deploys)

## ✨ Features

- 🎨 **Complex SVG Morphing** - Smooth envelope opening sequence using GSAP MorphSVGPlugin
- ⚡ **Vite-Powered** - Fast development with hot module replacement
- 🎯 **Minimal & Optimized** - Only essential GSAP plugins for optimal bundle size
- 🎪 **Debug Tools** - Built-in GSDevTools for animation fine-tuning
- 📱 **Responsive Design** - Centered viewport layout with Tailwind CSS
- 🔧 **Professional Architecture** - Modular code with JSDoc documentation

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# Development server runs on localhost:5000
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[GSAP 3.13](https://greensock.com/gsap/)** - Professional-grade animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Sass](https://sass-lang.com/)** - CSS preprocessor

## 📁 Project Structure

```
envelope-gsap-2025/
├── src/
│   ├── main.js          # Main application logic & GSAP animations
│   ├── index.scss       # Global styles with Tailwind layers
│   └── logo.ai          # Adobe Illustrator source
├── public/
│   └── envelope.svg     # Main SVG graphic with animation IDs
├── index.html           # Entry point
└── package.json         # Dependencies & scripts
```

## 🎬 Animation Sequence

The envelope animation consists of five main phases:

1. **Text Introduction** - Staggered text reveals with fade-in
2. **Arrow Bounce** - Bouncing arrow indicator with fade out
3. **Envelope Opening** - Main flap transformation and opening
4. **Paper Emergence** - Paper sliding effects with masks
5. **Final Positioning** - Shadow reveals and depth accents

## 🔧 Configuration

Edit `src/main.js` to customize animation settings:

```javascript
const CONFIG = {
  animation: {
    debug: false, // Enable GSDevTools
    defaultEase: "power2.inOut",
  },
  svgAssets: {
    envelopePath: "/envelope.svg",
    containerSelector: ".envelope",
  },
};
```

## 📝 License

GPL-3.0

---

Built with ❤️ using GSAP and Vite

# Cinematic Vault Intro Sequence Component

A self-contained, high-performance cinematic intro sequence React component designed for portfolio entries. It splits open like a massive high-tech vault door sync'd to a car engine audio effect, transitioning into a cyberpunk loading interface, and gracefully fades out to reveal the main portfolio.

## 📦 Dependencies

Ensure the following packages are installed in your React project (the components rely on Framer Motion for animations and React Icons for controls):

```bash
npm install framer-motion react-icons
```

---

## 📁 File Structure & Overview

All code has been created under `src/components/intro/`:

1. **[IntroSequence.jsx](file:///c:/Users/user/OneDrive/Documents/Anuj_Portfolio/src/components/intro/IntroSequence.jsx)**
   * The orchestrator / state controller.
   * Manages the lifecycle stages: `'start'` ➔ `'vault'` ➔ `'loading'` ➔ `'complete'`.
   * Integrates HTML5 Audio API for `car-engine.mp3` with clean fading controls.
   * Handles muting and skipping states, saving completion flags to `localStorage`.
2. **[StartButton.jsx](file:///c:/Users/user/OneDrive/Documents/Anuj_Portfolio/src/components/intro/StartButton.jsx)**
   * Stage 1 component.
   * Renders a dark `#050814` background with a canvas-based twinkling starfield.
   * Displays the centered circular pulsing START button with rotating dashboard rings.
3. **[VaultDoors.jsx](file:///c:/Users/user/OneDrive/Documents/Anuj_Portfolio/src/components/intro/VaultDoors.jsx)**
   * Stage 2 component.
   * Renders the massive split metallic vault doors (`linear-gradient(135deg, #121224 ...)`).
   * Includes structural rivet columns, mechanical stats display, and a splitting central lock wheel.
   * Triggers a screen shake and dynamic floating particle sparks that shoot out from the seam.
4. **[LoadingWindow.jsx](file:///c:/Users/user/OneDrive/Documents/Anuj_Portfolio/src/components/intro/LoadingWindow.jsx)**
   * Stage 3 component.
   * Features a circular SVG progress ring with neon glow styling.
   * Increments 0% to 100% over 3 seconds, spelling out **ANUJ DUBEY** in sync with the typewriter effect.
   * Renders a real-time terminal log viewer scrolling fake shell notifications.
5. **[intro.css](file:///c:/Users/user/OneDrive/Documents/Anuj_Portfolio/src/components/intro/intro.css)**
   * Houses all custom CSS, including Google Fonts imports (Orbitron & Poppins), neon text-shadows, pulsing, dial rotation animations, door textures, sparks, scanlines, and screen shakes.

---

## ⚡ Integration Guide

To plug this into your portfolio, simply wrap or overlay your main content inside your root `App.jsx`. Here is a clean, drop-in integration example:

```jsx
import React, { useState } from 'react';
import IntroSequence from './components/intro/IntroSequence';
import MyPortfolio from './MyPortfolio'; // Your existing main portfolio component

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Cinematic Intro (Unmounts on Complete) */}
      {!introDone && (
        <IntroSequence 
          onComplete={() => setIntroDone(true)} 
          enableSkip={true} // Set to false to force intro on every page load
        />
      )}

      {/* Main Portfolio Content */}
      <div className={`transition-opacity duration-1000 ${introDone ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {/* Render your existing sections here (Hero, About, Projects, etc.) */}
        <MyPortfolio />
      </div>
    </>
  );
}

export default App;
```

---

## 🔊 Audio Assets Guidance

### Where to Place the Sound File
Your sound file must be named exactly `car-engine.mp3` and be placed in your public directory at:
```
public/sounds/car-engine.mp3
```
*(An placeholder file has already been placed there for you).*

### Where to Download Royalty-Free Car Engine Audio
You can download clean, professional car engine starter and roar sound effects from:
* [Pixabay Sounds](https://pixabay.com/sound-effects/search/car-engine/)
* [Mixkit Free Sound Effects](https://mixkit.co/free-sound-effects/car/)
* Search for: "sports car engine start", "muscle car engine rev", or "supercar roar".

---

## 🎨 Customization Options

### 1. Enable/Disable `localStorage` Skip
By default, the intro stores a flag `introPlayed = true` in `localStorage` upon completion to prevent annoying users on subsequent visits.
* To **force** the intro to play every time, set the `enableSkip` prop to `false` when rendering the component:
  ```jsx
  <IntroSequence onComplete={() => setIntroDone(true)} enableSkip={false} />
  ```
* To clear the flag manually during development, open your browser Console (F12) and run:
  ```javascript
  localStorage.removeItem('introPlayed');
  ```

### 2. Customizing Colors
All colors can be changed via CSS variables or editing colors directly:
* **Backgrounds & Accents:** Open `src/components/intro/intro.css` to edit the core theme.
  * Cyan Neon glow: change `#00d4ff` (or `rgba(0, 212, 255, ...)`).
  * Purple Accent: change `#a855f7` (or `rgba(168, 85, 247, ...)`).
  * Vault Metallic Tones: edit the gradient colors inside `.vault-door-left` and `.vault-door-right`.

### 3. Customizing Text
* To change the typewriter name (default: `"ANUJ DUBEY"`), open `LoadingWindow.jsx` and edit the `fullName` constant at the top:
  ```javascript
  const fullName = "YOUR NAME";
  ```
* To customize the terminal console messages, edit the `useEffect` inside `LoadingWindow.jsx` matching the progress thresholds.

### 4. Customizing Speed / Duration
* **Vault Doors Split:** Currently animates over `3.5` seconds. To change this:
  * In `IntroSequence.jsx`, change the timer duration to match:
    ```javascript
    setTimeout(() => { setStage('loading'); }, 3500);
    ```
  * In `VaultDoors.jsx`, modify the transition durations for `leftDoorVariants` and `rightDoorVariants`.
* **Loading Bar Time:** Currently completes in `3.0` seconds. To speed it up or slow it down, change the `duration` value inside `LoadingWindow.jsx`:
  ```javascript
  const duration = 3000; // Time in milliseconds
  ```

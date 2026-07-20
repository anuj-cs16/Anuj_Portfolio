import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Preloader Animation */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* Custom Cyber Glowing Cursor */}
      <CustomCursor />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0a0e27',
            color: '#e2e8f0',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
          },
        }}
      />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

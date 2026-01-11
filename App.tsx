import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Home />} /> {/* Placeholder to prevent 404 in demo */}
          <Route path="/dashboard" element={<Home />} /> {/* Placeholder to prevent 404 in demo */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
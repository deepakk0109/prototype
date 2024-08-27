import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import Canvas from './pages/Canvas';
import Toolbar from './pages/Toolbar';
import Header from './pages/Header';
import Preview from './pages/Preview';

function App() {
  // const [selectedLayout, setSelectedLayout] = useState(null);
  return (
    <Router>
      <Header/>
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        <Route
          path="*"
          element={<DashboardPage />} // Default to DashboardPage for unknown routes
        />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import Canvas from './pages/Canvas';
import Toolbar from './pages/Toolbar';

function App() {
  // const [selectedLayout, setSelectedLayout] = useState(null);
  return (
    <Router>
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        {/* <Route
          path="layouts"
          element={<Layouts setSelectedLayout={setSelectedLayout} />}
        /> */}
        {/* <Route
          path="components"
          element={<Toolbar type="component" setSelectedLayout={setSelectedLayout} />}
        /> */}
        {/* <Route
          path="canvas"
          element={<Canvas selectedLayout={selectedLayout} />}
        /> */}
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

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import Canvas from './pages/Canvas';
import Toolbar from './pages/Toolbar';
import Header from './pages/Header';
import Preview from './pages/Preview';
import Datagrid from './widgets/DataGrid';
import ParentComponent from './components/ParentComponent';
import SomeOtherComponent from './components/ParentComponent';
import { FormBuilder, PreviewForm } from './widgets/FormBuilder';

function App() {
  // const [selectedLayout, setSelectedLayout] = useState(null);
  return (
    <Router>
      <Header/>
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
      <Route
          path="/preview"
          element={<Preview />} // Default to DashboardPage for unknown routes
        />
              <Route
          path="/a"
          element={<FormBuilder />} // Default to DashboardPage for unknown routes
        />
                      <Route
          path="/b"
          element={<PreviewForm />} // Default to DashboardPage for unknown routes
        />
    </Routes>
  </Router>
  );
}

export default App;

import React, { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaPlus, FaLayerGroup, FaFont, FaDatabase, FaFileAlt } from 'react-icons/fa';
import '../styles/DashboardPage.css';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

const DashboardPage = () => {
    const [selectedLayout, setSelectedLayout] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-item">
          <div className="icon-with-text">
            <FaHome className="header-icon" />
            <span className="sidebar-text">Home</span>
          </div>
          <div  className="logo">INFINITY STUDIO</div>
        </div>
        <nav className="navbar">
        <Link to="/layouts">LAYOUT</Link>
        <Link to="/components">COMPONENT</Link>
        <Link to="/widgets">WIDGETS</Link>
        <Link to="/configurations">CONFIGURATIONS</Link>
        <Link to="/routing">ROUTING</Link>
        <Link to="/preview">PREVIEW</Link>
        <Link to="/deploy">DEPLOY</Link>
        </nav>
      </header>

      <div className="main-content">
        <aside className="sidebar left-sidebar">
          <div className="sidebar-item">
            <FaPlus className="icon" />
            <span className="sidebar-text">Add</span>
          </div>
          <div className="sidebar-item">
            <FaFileAlt className="icon" />
            <span className="sidebar-text">Pages</span>
          </div>
          <div className="sidebar-item">
            <FaLayerGroup className="icon" />
            <span className="sidebar-text">Layers</span>
          </div>
          <div className="sidebar-item">
            <FaFont className="icon" />
            <span className="sidebar-text">Font and Colors</span>
          </div>
          <div className="sidebar-item">
            <FaDatabase className="icon" />
            <span className="sidebar-text">CMS</span>
          </div>
        </aside>

        <div className="tool-bar">
        <Toolbar  setSelectedLayout={setSelectedLayout} setSelectedComponent={setSelectedComponent}/>
        </div>

        <Canvas selectedLayout={selectedLayout} selectedComponent={selectedComponent} />

        <aside className="sidebar right-sidebar"></aside>
      </div>
    </div>
  );
};

export default DashboardPage;

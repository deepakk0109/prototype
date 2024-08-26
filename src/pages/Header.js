import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaLayerGroup, FaFont, FaDatabase, FaFileAlt } from 'react-icons/fa';

const Header = () => {
  return (
  <div>
    <header className="header">
    <div className="header-item">
      <div className="icon-with-text">
        <FaHome className="header-icon" />
        <span className="sidebar-text">Home</span>
      </div>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <div className="logo">INFINITY STUDIO</div>
      </Link>
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
  </div>
  )
}

export default Header

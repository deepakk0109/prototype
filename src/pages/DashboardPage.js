import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaLayerGroup, FaFont, FaDatabase, FaFileAlt } from 'react-icons/fa';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../styles/DashboardPage.css';
import Canvas from './Canvas3';
import Toolbar from './Toolbar';
import Preview from './Preview';
import layoutService from '../services/layoutService';

const DashboardPage = () => {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [layout,setLayout]=useState(null);
  const location = useLocation();

  const isPreview = location.pathname === '/preview';
  const handleSaveLayout = () => {
    // Implement your layout saving logic here
    console.log('Layout saved:', layout);
    // Additional saving logic...
  };
  const handleFetchLayouts = async () => {
    try {
      const storedId = localStorage.getItem('id');
    if(storedId){
      const id = storedId?JSON.parse(storedId):'';
      const response = await layoutService.getLayoutbyId(id);
      if (response ) {
        const fetchedLayout = response.layoutItems
        
        setLayout(fetchedLayout);  // Set the layout with static items
        // console.log('Fetched layout:', fetchedLayout);
      }
    }
   } catch (error) {
      console.error('Failed to fetch layouts:', error);
    }
  };
  

  useEffect(() => {
    handleFetchLayouts();
  }, []);

  return (
    <div className="dashboard-container">
    {isPreview?(
      <Preview/>
    ):(
    <div className={`main-content ${isPreview ? 'preview-mode' : ''}`}>
          <>
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
              <Link to="/cms">
                <FaDatabase className="icon" />
                </Link>
                <span className="sidebar-text">CMS</span>
              </div>
            </aside>

            <div className="tool-bar">
              <Toolbar
                setSelectedLayout={setSelectedLayout}
                setSelectedComponent={setSelectedComponent}
                setSelectedWidget={setSelectedWidget}
                handleSaveLayout={handleSaveLayout}
                setSavedlayout={setLayout}
              />
            </div>
          </>
        

        <Canvas
          selectedLayout={selectedLayout}
          selectedComponent={selectedComponent}
          selectedWidget={selectedWidget}
          savedlayout={layout}
        />

     <aside id="sidebar" className="sidebar right-sidebar"></aside>

    </div>
  )}
      
    </div>
  );
};

export default DashboardPage;

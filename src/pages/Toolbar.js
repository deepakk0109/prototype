import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Toolbar.css'
import layoutService from '../services/layoutService';

// const layouts = [
//   { id: 1, name: 'Header Only', sections: ['header'] },
//   { id: 2, name: 'Header and Footer', sections: ['header', 'footer'] },
//   { id: 3, name: 'Header, Footer, Sidebar', sections: ['header', 'footer', 'sidebar'] }
// ];
const layouts = [
  {
    id:0,
    name: 'layout0',
    imgSrc: require('../assets/images/layout0.png'),
    header: '',
    footer: '',
    navbarType: '',
    ishorizontalnav:'false',
    isverticalleftnav:'false',
    isverticalrightnav:'false',
    horizontalNavbar: '',
    verticalLeftNavbar: '',
    verticalRightNavbar: ''
  },
    {
      id:1,
      name: 'layout1',
      imgSrc: require('../assets/images/layout1.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'false',
      isverticalrightnav:'false',
      horizontalNavbar: 'Navbar',
      verticalLeftNavbar: '',
      verticalRightNavbar: ''
    },
    {
        id:2,
      name: 'layout2',
      imgSrc: require('../assets/images/layout2.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'true',
      isverticalrightnav:'false',
      horizontalNavbar: '',
      verticalLeftNavbar: 'Navbar',
      verticalRightNavbar: ''
    },
    {
        id:3,
      name: 'layout3',
      imgSrc: require('../assets/images/layout3.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'false',
      isverticalrightnav:'true',
      horizontalNavbar: '',
      verticalLeftNavbar: '',
      verticalRightNavbar: 'Navbar'
    },
    {
        id:4,
      name: 'layout4',
      imgSrc: require('../assets/images/layout4.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'true',
      isverticalrightnav:'true',
      horizontalNavbar: '',
      verticalLeftNavbar: 'Navbar1',
      verticalRightNavbar: 'Navbar2'
    },
    {
        id:5,
      name: 'layout5',
      imgSrc: require('../assets/images/layout5.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'true',
      isverticalrightnav:'false',
      horizontalNavbar: 'Navbar1',
      verticalLeftNavbar: 'Navbar2',
      verticalRightNavbar: ''
    },
    {
        id:6,
      name: 'layout6',
      imgSrc: require('../assets/images/layout6.png'),
      header: 'Header',
      footer: '',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'false',
      isverticalrightnav:'true',
      horizontalNavbar: 'Navbar1',
      verticalLeftNavbar: '',
      verticalRightNavbar: 'Navbar2'
    },
    {
        id:7,
      name: 'layout7',
      imgSrc: require('../assets/images/layout7.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'false',
      isverticalrightnav:'false',
      horizontalNavbar: 'Navbar',
      verticalLeftNavbar: '',
      verticalRightNavbar: ''
    },
    {
        id:8,
      name: 'layout8',
      imgSrc: require('../assets/images/layout8.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'true',
      isverticalrightnav:'false',
      horizontalNavbar: '',
      verticalLeftNavbar: 'Navbar',
      verticalRightNavbar: ''
    },
    {
        id:9,
      name: 'layout9',
      imgSrc: require('../assets/images/layout9.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'false',
      isverticalrightnav:'true',
      horizontalNavbar: '',
      verticalLeftNavbar: '',
      verticalRightNavbar: 'Navbar'
    },
    {
        id:10,
      name: 'layout10',
      imgSrc: require('../assets/images/layout10.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'false',
      isverticalleftnav:'true',
      isverticalrightnav:'true',
      horizontalNavbar: '',
      verticalLeftNavbar: 'Navbar1',
      verticalRightNavbar: 'Navbar2'
    },
    {
        id:11,
      name: 'layout11',
      imgSrc: require('../assets/images/layout11.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'true',
      isverticalrightnav:'false',
      horizontalNavbar: 'Navbar1',
      verticalLeftNavbar: 'Navbar2',
      verticalRightNavbar: ''
    },
    {
        id:12,
      name: 'layout12',
      imgSrc: require('../assets/images/layout12.png'),
      header: 'Header',
      footer: 'Footer',
      navbarType: 'horizontal-and-vertical',
      ishorizontalnav:'true',
      isverticalleftnav:'false',
      isverticalrightnav:'true',
      horizontalNavbar: 'Navbar1',
      verticalLeftNavbar: '',
      verticalRightNavbar: 'Navbar2'
    },
]

const components = [
    { id: 1, name: 'Button', type: 'button', icon: '🔘' },
    { id: 2, name: 'Textbox', type: 'textarea', icon: '📝' },
    { id: 3, name: 'Line', type: 'line', icon: '--' },
    // { id: 4, name: 'Audio', type: 'audio', icon: '🎙️' },
    // { id: 5, name: 'Form', type: 'form', icon: '📋' },
  ];

const widgets=[
  { id: 1, name: 'Logo', type: 'logo', icon: '🖼️' },
  { id: 2, name: 'Chart', type: 'box', icon: '📊' },
  // { id: 2, name: 'TextBox-Widget', type: 'textBoxWidget', icon: '📝' },
  // { id: 3, name: 'Form', type: 'form', icon: '📋' },
  { id: 4, name:'Table', type:'table',icon:'🗃️'},
  { id: 5, name:'Checkbox', type:'checkbox',icon:'☑'},
  { id: 6, name: 'Dropdown', type: 'dropdown', icon: '⬇️' },
  { id: 7, name: 'Datepicker', type: 'datepicker', icon: '📅' },
  // { id: 8, name: 'Timepicker', type: 'timepicker', icon: '⏰' },
  { id: 9, name: 'Image', type: 'image', icon: '🖼️' },
  { id: 10, name: 'Search Bar', type: 'searchbar', icon: '🔍' },
  { id: 11, name: 'Radio Button', type: 'radiobutton', icon: '⚫'},
  { id: 12, name: 'File', type: 'file', icon: '📄' },
  { id: 13, name: 'Text-editor', type: 'texteditor', icon: '📝' },
  // { id: 14, name: 'Data Grid', type: 'datagrid', icon: '🗄️' },
  // { id: 15, name: 'Carousel', type: 'carousel', icon: '🖼️🖼️' },



]


function Toolbar({ setSavedlayout,setSelectedLayout, setSelectedComponent, setSelectedWidget,layout,handleSaveLayout }) {
  const location = useLocation();
  const [templates, setTemplates]=useState(null);
  const handleFetchLayouts = async () => {debugger
    try {
      const layouts = await layoutService.getLayouts();
      if (layouts) {
        // const fetchedLayout = layouts[layouts.length - 1]
        setTemplates(layouts);  // Set the layout with static items
        console.log('Fetched layouts:', layouts);
      }
    } catch (error) {
      console.error('Failed to fetch layouts:', error);
    }
  };

  useEffect(() => {
    handleFetchLayouts();
  }, []);

  return (
    <div className="toolbar">
      {location.pathname === '/layouts' && (
        <>
          <div style={{fontWeight:'bold'}}>Layouts</div>
          <ul>
            {layouts.map(layout => (
                <li key={layout.id} onClick={ () =>{ setSelectedLayout(null);  setTimeout(() => {
                  setSelectedLayout(layout);
                }, 0)}}>
                  <img src={layout.imgSrc} alt={layout.name} style={{ width: '160px', height: '150px' }} />
                </li>
            ))}
          </ul>
        </>
      )}
      {location.pathname === '/components' && (
        <>
          <div style={{fontWeight:'bold'}}>Components</div>
          <ul>
          {components.map(component => (
              <li key={component.id} onClick={() =>{ setSelectedComponent(null);  setTimeout(() => {
                setSelectedComponent(component);
              }, 0)}}>
                {component.icon} {component.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {location.pathname === '/widgets' && (
        <>
          <div style={{fontWeight:'bold'}}>Widgets</div>
          <ul>
          {widgets.map(widget => (
              <li key={widget.id} onClick={() => {
                // Set state to null first
                setSelectedWidget(null);
            
                // Then set it to the clicked widget after a slight delay
                setTimeout(() => {
                  setSelectedWidget(widget);
                }, 0)}}>
                {widget.icon} {widget.name}
              </li>
            ))}
          </ul>
        </>
      )}

      {location.pathname === '/cms' && (
        <>
          <div style={{fontWeight:'bold'}}>Templates</div>
          <ul>
          {templates?.map((template,index) => (
              <li key={template._id} onClick={() => {
                // Set state to null first
                setSavedlayout(null);
            
                // Then set it to the clicked widget after a slight delay
                setTimeout(() => {
                  localStorage.setItem('id', JSON.stringify(template._id));
                  setSavedlayout(template.layoutItems);
                }, 0)}}>
               Template {index+1}
              </li>
            ))}
          </ul>
        </>
      )}       
      
    </div>
  );
};

export default Toolbar;

// // src/pages/Toolbar.js
// import React, { useState } from 'react';
// import { useNavigate, useLocation, Router, Routes, Route } from 'react-router-dom';
// import '../styles/Toolbar.css';
// import Layouts from './Layouts';

// function Toolbar({ setSelectedLayout }) {
//     // const [selectedLayout, setSelectedLayout] = useState(null);

//   return (

//     <Routes>
//         <Route
//           path="layouts"
//           element={<Layouts setSelectedLayout={setSelectedLayout}/>}
//         />
        
//         <Route
//           path="components"
//           element={<components/>}
//         />
//     </Routes>
//   );
// }

// export default Toolbar;

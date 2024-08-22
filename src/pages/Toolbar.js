import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Toolbar.css'

// const layouts = [
//   { id: 1, name: 'Header Only', sections: ['header'] },
//   { id: 2, name: 'Header and Footer', sections: ['header', 'footer'] },
//   { id: 3, name: 'Header, Footer, Sidebar', sections: ['header', 'footer', 'sidebar'] }
// ];
const layouts = [
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
    { id: 3, name: 'Table', type: 'table', icon: '📊', rows: 3, cols: 4 },
    { id: 4, name: 'Form', type: 'form', icon: '📋' },
  ];

function Toolbar({ setSelectedLayout, setSelectedComponent }) {
  const location = useLocation();
//   useEffect(() => {
//     console.log("1stcomp",selectedComponent);
//   }, [selectedComponent]);
//   console.log("1stcomp",selectedComponent);
  return (
    <div className="toolbar">
      {location.pathname === '/layouts' && (
        <>
          <h2>Layouts</h2>
          <ul>
            {layouts.map(layout => (
              <li key={layout.id} onClick={() => setSelectedLayout(layout)}>
                <img src={layout.imgSrc} alt={layout.name} style={{ width: '160px', height: '150px' }} />
              </li>
            ))}
          </ul>
        </>
      )}
      {location.pathname === '/components' && (
        <>
          <h2>Components</h2>
          <ul>
          {components.map(component => (
              <li key={component.id} onClick={() => setSelectedComponent(component)}>
                {component.icon} {component.name}
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

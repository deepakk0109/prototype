import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import ChartPopup from '../widgets/Charts';
import layoutService from '../services/layoutService';
import Input from '../widgets/Input';
import {Charts} from '../widgets/Charts';
import Canvas from './Canvas2';
import { useLocation } from 'react-router-dom';


const ReactGridLayout = WidthProvider(GridLayout);
const Preview = () => {
  const location = useLocation();
  const isPreview = location.pathname === '/preview';
  const [layout, setLayout] = useState([]);
  const isOuterGridDraggableRef = useRef(true);
  const isInnerGridDraggableRef = useRef(true);
  const contentRefs = useRef({});



  const setIsPopupOpen = (isOpen) => {
    isOuterGridDraggableRef.current = !isOpen;
    isInnerGridDraggableRef.current = !isOpen;
  };


  // const handleFetchLayouts = async () => {
  //   try {
  //     const layouts = await layoutService.getLayouts();
  //     if (layouts && layouts.length > 0) {
  //       const fetchedLayout = layouts[layouts.length - 1].layoutItems.map(item => ({
  //         ...item,
  //         elements: item.elements.map(element => ({
  //           ...element,
  //           isDraggable: false,
  //           isResizable: false,
  //           static: true, // Add this to each element to disable drag and resize
  //         })),
  //         isDraggable: false,
  //         isResizable: false,
  //         static: true, // Make the overall item static as well
  //       }));
        
  //       setLayout(fetchedLayout);  // Set the layout with static items
  //       console.log('Fetched layout:', fetchedLayout);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch layouts:', error);
  //   }
  // };
  

  // Fetch layouts when the component mounts


  const handleFetchLayouts = async () => {
    try {
      const storedId = localStorage.getItem('id');
    if(storedId){
      const id = storedId?JSON.parse(storedId):'';
      const layouts = await layoutService.getLayoutbyId(id);
      if (layouts ) {
        const fetchedLayout = layouts.layoutItems.map(item => ({
          ...item,
          elements: item.elements.map(element => ({
            ...element,
            isDraggable: false,
            isResizable: false,
            static: true, // Add this to each element to disable drag and resize
          })),
          isDraggable: false,
          isResizable: false,
          static: true, // Make the overall item static as well
        }));
        
        setLayout(fetchedLayout);  // Set the layout with static items
        console.log('Fetched layout:', fetchedLayout);
      }
    }
   } catch (error) {
      console.error('Failed to fetch layouts:', error);
    }
  };
  

  useEffect(() => {
    handleFetchLayouts();
  }, []);

  console.log("preview layout", layout);
  console.log("isPreview", isPreview);
  // let x=layout;

  return (//style={{justifyContent:'center'}}
    <div className='preview'  > 
      <Canvas savedlayout={layout} isPreview={isPreview} />
    </div>
  );
};

export default Preview;


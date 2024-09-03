import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import ChartPopup from '../widgets/Charts';
import layoutService from '../services/layoutService';
import Input from '../widgets/Input';
import Charts from '../widgets/Charts';
import Canvas from './Canvas';
import { useLocation } from 'react-router-dom';


const ReactGridLayout = WidthProvider(GridLayout);
const Preview = () => {
    const location = useLocation();
    const isPreview = location.pathname === '/preview';
    // const savedLayoutString = localStorage.getItem('layout');
    //   // Parse the JSON string to an object
    //   const savedLayout = JSON.parse(savedLayoutString);
    const [layout, setLayout] = useState([]);

    const handleFetchLayouts = async () => {
        try {
          const layouts = await layoutService.getLayouts();
          if (layouts && layouts.length > 0) {
            setLayout(layouts[layouts.length-1].layoutItems);  // Set the first layout
            console.log('Fetched layouts:', layouts);
          }
        } catch (error) {
          console.error('Failed to fetch layouts:', error);
        }
      };
    
      // Fetch layouts when the component mounts
      useEffect(() => {
        handleFetchLayouts();
      }, []);
      
console.log("preview layout",layout);

    return (
  
        <div style={{display: 'flex'}}>
        <Canvas savedlayout={layout} isPreview={isPreview}/>
       </div>
      
      );
}

export default Preview


      // <div className="canvas-container">
        //   {layout ? (
        //     <ReactGridLayout
        //       className="layout"
        //       layout={layout}
        //       cols={12}
        //       rowHeight={39}
        //       width={845}
        //       autoSize={true}
        //       isDraggable={false}  // Control whether the outer grid is draggable
        //       isResizable={false}
        //       compactType={null}
        //       preventCollision={true}
        //       // onLayoutChange={
        //       //   onOuterLayoutChange}
        //       style={{ pointerEvents: 'none' }} 
        //     >
        //       {layout.map(sectionLayout => (
        //         <div
        //           key={sectionLayout.i}
        //         //   data-grid={sectionLayout}
        //           className={`section ${sectionLayout.i}`}
        //         //   ref={(el) => contentRefs.current[sectionLayout.i] = el}
        //         //   contentEditable
        //           suppressContentEditableWarning={true}
        //           // onBlur={() => handleBlur(sectionLayout.i)
        //           style={{
        //             position: 'relative',
        //             display: 'flex',
        //             justifyContent: 'center',
        //             // alignItems: 'center',
        //             backgroundColor: '#f0f0f0',
        //             minHeight: '20px',
        //             textAlign: 'center',
        //             writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
        //             textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
        //             // padding: '10px'
        //           }}
        //         >
        //           { (
        //             <ReactGridLayout
        //               key={`nested-${sectionLayout.i}`}
        //               className="components"
        //               layout={sectionLayout.elements}
        //               cols={12}
        //               rowHeight={39}
        //               width={845}
        //               autoSize={true}
        //               isDraggable={false}  // Disable nested grid dragging
        //               isResizable={false}  // Disable nested grid resizing
        //               draggableHandle=""    // Ensure no draggable handles
        //               draggableCancel=""
        //               compactType={null}
        //               preventCollision={true}
        //               style={{
        //                 pointerEvents: 'none',  // Prevent interactions
        //               }}
        //             >
        //               {sectionLayout.elements.map(component => (
        //                 <div
        //                   key={component.i}
        //                   data-grid={component}
        //                   style={{
        //                     // border: '1px dashed #28a745',
        //                     backgroundColor: '#ffffff',
        //                     textAlign: 'center',
        //                     // display: 'flex',
        //                     position:'fixed',
        //                     justifyContent: 'center',
        //                     alignItems: 'center',
        //                     // padding: '1px',
        //                     margin:'2px',
        //                     minHeight: '50px',
        //                     pointerEvents: 'auto',
        //                   }}
        //                 >
        //                   {RenderComponent(component)}
        //                 </div>
        //               ))}
        //             </ReactGridLayout>
        //           )}
        //         </div>
        //       ))}
        //     </ReactGridLayout>
        //   ) : (
        //     <p>Please select a layout</p>
        //   )}
        // </div>
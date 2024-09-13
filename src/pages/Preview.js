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
    <div  > 
      <Canvas savedlayout={layout} isPreview={isPreview} />
    </div>
  );
};

// const RenderComponent = ( component ) => {
    
//   switch (component.type) {
//     case 'button':
//       return (
//         <button style={{ width: '100%', height: '100%', backgroundColor: 'lightblue', borderRadius: '5px' }}  onClick={()=>{console.log(layout)}}>
//           {component.content || 'Submit'}
//         </button>
//       );

//     case 'textarea':
//       return (
//         <textarea style={{ width: '100%', height: '100%' }} rows={4} cols={20} value={component.content} />
        
//       );

//       case 'textBoxWidget':
//         return(
//           <Input setIsPopupOpen={setIsPopupOpen} style={{ width: '100%', height: '100%' }} rows={4} cols={20} value={component.content} widgetId={component.i}/>
//         )

//       case 'box':
//         return (
//           <div style={{ flexGrow: 1, display:'flex', position: 'relative', border: '1px solid #ccc', width: '100%', height: '100%' }}>
//             <Charts Styles={component.Styles} typeOfChart={component.chartType}  widgetId={component.i} Ox={component.xorganization} Px={component.xplant} Bx={component.xblock} Dx={component.xdevice} Parameterx={component.xparameter} Oy={component.yorganization} Py={component.yplant} By={component.yblock} Dy={component.ydevice} Parametery={component.yparameter} style={{  border: '1px solid #ccc', width: '100%', height: '100%' }} />
//         </div>
//         );
   
//     default:
//       return <div>Another Component</div>;
//   }

// };






// console.log("layout",layout);
// console.log("layout2",layout[0]);
// console.log("isPreview",isPreview);

// // console.log("slayout",selectedLayout);

// return (
//     <div>
//       <div style={{ position: 'absolute', top: '10px', right: '10px' }}>

//       </div>
//       <div className={isPreview ? "canvas-container-preview" : "canvas-container"} style={{ position: 'relative',border:'1px solid black' }}>
//         {x && x.length>0 ? (
//           <ReactGridLayout
//             key={`nested-main`}
//             className="components"
//             layout={x[0]?.elements}
//             cols={12}
//             rowHeight={39}
//             width={845}
//             autoSize={true}
//             // isDraggable={isPreview ? false : (isConfig ? false : isOuterGridDraggableRef.current)}  // Lock dragging in Preview mode
//             // isResizable={isPreview ? false : (isConfig ? false : isOuterGridDraggableRef.current)}  // Lock resizing in Preview mode
//             isDraggable={false}  // Lock draggable behavior
//             isResizable={false}
//             compactType={null}
//             preventCollision={true}
//             // onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, layout[0]?.i)}
//           >
//             {x[0]?.elements.map((component) => (
//               <div
//                 key={component.i}
//                 data-grid={{ ...component, static: true }}
//                 className={`section main`}
//                 ref={(el) => contentRefs.current[component.i] = el}
//                 // onMouseEnter={() => setHoveredSection(component.i)}
//                 // onMouseLeave={() => setHoveredSection(null)}
//                 style={{
//                   // border: hoveredSection === component.i ? '2px dashed #007bff' : '2px solid transparent',
//                   position: 'fixed',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'flex-start',
//                   backgroundColor: '#f0f0f0',
//                   minHeight: '20px',
//                   textAlign: 'center',
//                   writingMode: component.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
//                   textOrientation: component.i.includes('vertical') ? 'upright' : 'mixed',
//                 }}
//               >
//                 {RenderComponent(component)}
//               </div>
//             ))}
//           </ReactGridLayout>
//         ) : (
//           <div>Select a layout</div>
//         )}
//       </div>
//     </div>
//   );
  
// }
export default Preview;


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
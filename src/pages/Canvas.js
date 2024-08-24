import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import '../styles/Canvas.css';
import ChartPopup from './ChartPopup';

const ReactGridLayout = WidthProvider(GridLayout);
const defaultLayoutConfig={
  header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false, elements: [] },
  horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false, elements: [] },
  verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false, elements: [] },
  verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false, elements: [] },
  main: { i: 'main', x: 0, y: 1, w: 12, h: 12, static: false, elements: [] },
  footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false, elements: [] }
};
function Canvas({ selectedLayout, selectedComponent,selectedWidget }) {
  const [components, setComponents] = useState([]);
  const[widgets,setWidgets]=useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [layoutConfig, setLayoutConfig] = useState(defaultLayoutConfig);


  const isOuterGridDraggableRef = useRef(true);
  const isInnerGridDraggableRef = useRef(true);
  const contentRefs = useRef({});

  const setIsPopupOpen = (isOpen) => {debugger
    isOuterGridDraggableRef.current = !isOpen;
    isInnerGridDraggableRef.current = !isOpen;
  };

  // const handleContentChanges = (section) => {
  //   if (contentRefs.current[section]) {
  //     const newElement = contentRefs.current[section].innerHTML;
  //     setLayoutConfig(prevConfig => ({
  //       ...prevConfig,
  //       [section]: {
  //         ...prevConfig[section],
  //         elements: [...prevConfig[section].elements, newElement]
  //       }
  //     }));
  //   }
  // };

  // const handleBlur = (section) => {
  //   handleContentChanges(section);
  // };

  const getLayout = () => {
    const layout = [];
    let contentHeight = 12;
    let mainwidth=12;
    if (selectedLayout) {
      if (selectedLayout.header) {
        layout.push(layoutConfig.header);
      }
      if (selectedLayout.footer) {
        layout.push(layoutConfig.footer);
        contentHeight -= 1;
        layoutConfig.verticalLeftNavbar.h -= 1;
        layoutConfig.verticalRightNavbar.h -= 1;
      }
      if (selectedLayout.ishorizontalnav === 'true') {
        layout.push(layoutConfig.horizontalNavbar);
        contentHeight -= 1;
        layoutConfig.verticalLeftNavbar.h -= 1;
        layoutConfig.verticalRightNavbar.h -= 1;
      }
      if (selectedLayout.isverticalleftnav === 'true') {
        layout.push(layoutConfig.verticalLeftNavbar);
        layoutConfig.main.x = 1;
        layoutConfig.main.w -= 1;
        mainwidth-=1;
      }
      if (selectedLayout.isverticalrightnav === 'true') {
        layout.push(layoutConfig.verticalRightNavbar);
        layoutConfig.main.w -= 1;
        mainwidth-=1;
      }
      layoutConfig.main.h = contentHeight;
      layoutConfig.main.w=mainwidth;
      layout.push(layoutConfig.main);
    }

    return layout;
  };





  const onContentChange = (componentId, newContent) => {
    setLayoutConfig(prevConfig => {
      // Update the content of the component with the given ID
      const updatedElements = prevConfig.main.elements.map(item => {
        if (item.i === componentId) {
          return {
            ...item,
            content: newContent
          };
        }
        return item;
      });
  
      // Return the updated layout config
      return {
        ...prevConfig,
        main: {
          ...prevConfig.main,
          elements: updatedElements
        }
      };
    });
  };
  

  const RenderComponent = ( component ) => {
    
    switch (component.type) {
      case 'button':
        return (
          <button style={{ width: '100%', height: '100%', backgroundColor: 'lightblue', borderRadius: '5px' }}  onClick={()=>{console.log(layout)}}>
            {component.content || 'Submit'}
          </button>
        );
  
      case 'textarea':
        return (
          <textarea style={{ width: '100%', height: '100%' }} rows={4} cols={20} value={component.content} onChange={(event) => onContentChange(component.i, event.target.value)}/>
        );

        case 'box':
          return (
            <div style={{ flexGrow: 1, display:'flex', position: 'relative', border: '1px solid #ccc', width: '100%', height: '100%' }}>
              <ChartPopup setIsPopupOpen={setIsPopupOpen}  style={{  border: '1px solid #ccc', width: '100%', height: '100%' }} />
          </div>
          );
  
      default:
        return <div>Another Component</div>;
    }

  };
  


// Function to add a new component to the layout
const addComponentToLayout = (component) => {
  const newComponent = {
    i: `${component.type}-${components.length + 1}`,
    x: 0,
    y: components.length * 2,
    w: 2,
    h: 1,
    static: false,
    type: component.type,
    content: '', // Initialize the content for the component
    // rows: component.type === 'table' ? 3 : undefined,
    // cols: component.type === 'table' ? 4 : undefined
  };
  console.log("newcomp",newComponent);

  setLayoutConfig(prevConfig => {
    const updatedMain = {
      ...prevConfig.main,
      elements: [...prevConfig.main.elements, newComponent]
    };
    return { ...prevConfig, main: updatedMain };
  });

  setComponents(prevComponents => [...prevComponents, newComponent]);
};

// Effect to handle the addition of a selected component to the layout
useEffect(() => {
  if (selectedComponent) {
    addComponentToLayout(selectedComponent);
  }
}, [selectedComponent]);

// Function to update layout and content
const onNestedLayoutChange = (newLayout, sectionKey) => {
  console.log('Nested layout changed for section:', sectionKey, newLayout);

  try {
    // Update the elements inside the section layout
    setLayoutConfig(prevConfig => {
      const updatedElements = prevConfig[sectionKey].elements.map((item) => {
        const updatedItem = newLayout.find(layoutItem => layoutItem.i === item.i);

        if (updatedItem) {
          console.log(`Updating item with key: ${item.i}`, updatedItem);

          return {
            ...item,
            ...updatedItem,
            isDraggable: true,
            isResizable: true,
            static: false,
          };
        } else {
          console.warn(`No updated layout found for item with key: ${item.i}`);
          return item;
        }
      });

      console.log('Updated elements:', updatedElements);

      return {
        ...prevConfig,
        [sectionKey]: {
          ...prevConfig[sectionKey],
          elements: updatedElements
        }
      };
    });
  } catch (error) {
    console.error('Error updating nested layout for section:', sectionKey, error);
  }
};

  const onNestedDragStart = () => {
    console.log('Nested drag started');
    isOuterGridDraggableRef.current = false;
    console.log('Outer grid draggable:', isOuterGridDraggableRef.current);
  };

  const onNestedDragStop = () => {
    console.log('Nested drag stopped');
    isOuterGridDraggableRef.current = true;
    console.log('Outer grid draggable:', isOuterGridDraggableRef.current);
  };

  const onOuterLayoutChange = (newLayout) => {
    try {
      setLayoutConfig((prevConfig) => {
        const updatedSections = newLayout.map((updatedSection) => {
          const existingSection = prevConfig[updatedSection.i];

          if (existingSection && !areSectionsEqual(existingSection, updatedSection)) {
            return {
              ...existingSection,
              ...updatedSection,
            };
          }
          return existingSection;
        }).filter(Boolean);

        const newConfig = {
          ...prevConfig,
          ...Object.fromEntries(updatedSections.map((section) => [section.i, section])),
        };

        if (!areConfigsEqual(prevConfig, newConfig)) {
          return newConfig;
        }

        return prevConfig;
      });
    } catch (error) {
      console.error("Error updating outer layout:", error);
    }
  };

  const areSectionsEqual = (section1, section2) => {
    return JSON.stringify(section1) === JSON.stringify(section2);
  };

  const areConfigsEqual = (config1, config2) => {
    return JSON.stringify(config1) === JSON.stringify(config2);
  };


 
//  useEffect(() => {
//     setLayoutConfig(defaultLayoutConfig);
// }, [selectedLayout]);
const layout = getLayout();

console.log("config",layoutConfig);
console.log("layout",layout);

const addwidgetToLayout = (widget) => {
  const newWidget = {
    i: `${widget.type}-${widgets.length + 1}`,
    x: 0,
    y: widgets.length * 2,
    w: 6,
    h: 4,
    static: false,
    type: widget.type,
    content: '', // Initialize the content for the component

  };
  console.log("new Widget",newWidget);

  setLayoutConfig(prevConfig => {
    const updatedMain = {
      ...prevConfig.main,
      elements: [...prevConfig.main.elements, newWidget]
    };
    return { ...prevConfig, main: updatedMain };
  });

  setWidgets(prevWidgets => [...prevWidgets, newWidget]);
};

// Effect to handle the addition of a selected component to the layout
useEffect(() => {
  if (selectedWidget) {
    addwidgetToLayout(selectedWidget);
  }
}, [selectedWidget]);

  return (
    <div className="canvas-container">
      {selectedLayout ? (
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={39}
          width={700}
          autoSize={true}
          isDraggable={isOuterGridDraggableRef.current}  // Control whether the outer grid is draggable
          isResizable={true}
          compactType={null}
          preventCollision={true}
          onLayoutChange={
            onOuterLayoutChange}
        >
          {layout.map(sectionLayout => (
            <div
              key={sectionLayout.i}
              data-grid={sectionLayout}
              className={`section ${sectionLayout.i}`}
              ref={(el) => contentRefs.current[sectionLayout.i] = el}
              contentEditable
              suppressContentEditableWarning={true}
              // onBlur={() => handleBlur(sectionLayout.i)}
              onMouseEnter={() => setHoveredSection(sectionLayout.i)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: '#f0f0f0',
                minHeight: '20px',
                textAlign: 'center',
                writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
                textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
                padding: '10px'
              }}
            >
              { sectionLayout.elements.length>0 && (
                <ReactGridLayout
                  key={`nested-${sectionLayout.i}`}
                  className="components"
                  layout={sectionLayout.elements}
                  cols={12}
                  rowHeight={39}
                  width={845}
                  autoSize={true}
                  isDraggable={isInnerGridDraggableRef.current}
                  isResizable={true}
                  compactType={null}
                  preventCollision={true}
                  onDragStart={onNestedDragStart}
                  onDragStop={onNestedDragStop}
                  onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, sectionLayout.i)}
                >
                  {sectionLayout.elements.map(component => (
                    <div
                      key={component.i}
                      data-grid={component}
                      style={{
                        border: hoveredSection === component.i ? '2px dashed #007bff' : '2px solid transparent',
                        // border: '1px dashed #28a745',
                        backgroundColor: '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1px',
                        minHeight: '50px',
                      }}
                    >
                      {RenderComponent(component)}
                    </div>
                  ))}
                </ReactGridLayout>
              )}
            </div>
          ))}
        </ReactGridLayout>
      ) : (
        <p>Please select a layout</p>
      )}
    </div>
  );
}

export default Canvas;




// import React, { useState, useRef, useEffect } from 'react';
// import GridLayout from 'react-grid-layout';
// import { WidthProvider } from 'react-grid-layout';
// import '../styles/Canvas.css'; // Ensure your CSS file exists and has necessary styles

// const ReactGridLayout = WidthProvider(GridLayout);

// function Canvas({ selectedLayout, selectedComponent }) {
//   const [components, setComponents] = useState([]);
//   const [hoveredSection, setHoveredSection] = useState(null);
//   const [layoutConfig, setLayoutConfig] = useState({
//     header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false, elements: [] },
//     horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false, elements: [] },
//     verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false, elements: [] },
//     verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false, elements: [] },
//     main: { i: 'main', x: 1, y: 1, w: 10, h: 10, static: false, elements: [] }, // Adjusted to fit between sidebars
//     footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false, elements: [] }
//   });

//   const contentRefs = useRef({});

//   const handleContentChange = (section) => {
//     if (contentRefs.current[section]) {
//       const newElement = contentRefs.current[section].innerHTML;
//       setLayoutConfig(prevConfig => ({
//         ...prevConfig,
//         [section]: {
//           ...prevConfig[section],
//           elements: [...prevConfig[section].elements, newElement]
//         }
//       }));
//     }
//   };

//   const handleBlur = (section) => {
//     handleContentChange(section);
//   };

//   const getLayout = () => {
//     const layout = [];
//     let contentHeight = 12; // Default height for the content area

//     if (selectedLayout) {
//       if (selectedLayout.header) {
//         layout.push(layoutConfig.header);
//       }
//       if (selectedLayout.footer) {
//         layout.push(layoutConfig.footer);
//         contentHeight -= 1;
//         layoutConfig.verticalLeftNavbar.h -= 1;
//         layoutConfig.verticalRightNavbar.h -= 1;
//       }
//       if (selectedLayout.ishorizontalnav === 'true') {
//         layout.push(layoutConfig.horizontalNavbar);
//         contentHeight -= 1;
//         layoutConfig.verticalLeftNavbar.h -= 1;
//         layoutConfig.verticalRightNavbar.h -= 1;
//       }
//       if (selectedLayout.isverticalleftnav === 'true') {
//         layout.push(layoutConfig.verticalLeftNavbar);
//         layoutConfig.main.x = 1;
//         layoutConfig.main.w -= 1;
//       }
//       if (selectedLayout.isverticalrightnav === 'true') {
//         layout.push(layoutConfig.verticalRightNavbar);
//         layoutConfig.main.w -= 1;
//       }
//       layoutConfig.main.h = contentHeight;
//       layout.push(layoutConfig.main);
//     }

//     return layout;
//   };

//   const addComponentToLayout = (component) => {
//     const newComponent = {
//       i: `${component.type}-${components.length + 1}`,
//       x: 0,
//       y: components.length * 2,
//       w: 1,
//       h: 1,
//       static: false,
//       type: component.type,
//     };

//     setLayoutConfig(prevConfig => {
//       const updatedMain = {
//         ...prevConfig.main,
//         elements: [...prevConfig.main.elements, newComponent]
//       };
//       return { ...prevConfig, main: updatedMain };
//     });

//     setComponents(prevComponents => [...prevComponents, newComponent]);
//   };

//   useEffect(() => {
//     if (selectedComponent) {
//       addComponentToLayout(selectedComponent);
//     }
//   }, [selectedComponent]);

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case 'button':
//         return <button style={{ width: '100%', height: '100%', backgroundColor: 'lightblue', borderRadius: '5px' }}>Button</button>;
//       case 'textarea':
//         return <textarea style={{ width: '100%', height: '100%' }} rows={4} cols={20} />;
//       default:
//         return <div>Another Component</div>;
//     }
//   };

//   const onNestedLayoutChange = (newLayout, itemKey) => {
//     console.log('Nested layout changed for:', itemKey, newLayout);
  
//     // Debug itemKey and layoutConfig.main.elements
//     console.log('Current elements:', layoutConfig.main.elements);
    
//     const itemIndex = layoutConfig.main.elements.findIndex((item) => item.i === itemKey);
//     console.log('Item index:', itemIndex);
  
//     if (itemIndex !== -1) {
//       const updatedElements = [
//         ...layoutConfig.main.elements.slice(0, itemIndex),
//         {
//           ...layoutConfig.main.elements[itemIndex],
//           layout: newLayout
//         },
//         ...layoutConfig.main.elements.slice(itemIndex + 1)
//       ];
      
//       // Debug updatedElements
//       console.log('Updated elements:', updatedElements);
      
//       const updatedLayoutConfig = {
//         ...layoutConfig,
//         main: {
//           ...layoutConfig.main,
//           elements: updatedElements
//         }
//       };
  
//       // Update state and debug layoutConfig update
//       setLayoutConfig(updatedLayoutConfig);
//       console.log("Layout config updated", updatedLayoutConfig);
//     } else {
//       console.error('ItemKey not found:', itemKey);
//     }
//   };
  

//   const layout = getLayout();
//   // console.log("Main layout", layout);

//   return (
//     <div className="canvas-container">
//       {selectedLayout ? (
//         <ReactGridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={39}
//           width={845}
//           autoSize={true}
//           isDraggable={true}
//           isResizable={true}
//           compactType={null}
//           preventCollision={true}
//           onLayoutChange={(newLayout) => {
//             console.log("Main layout changed", newLayout);
//             // Handle main layout change if needed
//           }}
//         >
//           {layout.map(sectionLayout => (
//             <div
//               key={sectionLayout.i}
//               data-grid={sectionLayout}
//               className={`section ${sectionLayout.i}`}
//               ref={(el) => contentRefs.current[sectionLayout.i] = el}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onBlur={() => handleBlur(sectionLayout.i)}
//               onMouseEnter={() => setHoveredSection(sectionLayout.i)}
//               onMouseLeave={() => setHoveredSection(null)}
//               style={{
//                 border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#f0f0f0',
//                 minHeight: '20px',
//                 textAlign: 'center',
//                 writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
//                 textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
//                 padding: '10px'
//               }}
//             >
//               {sectionLayout.elements.length > 0 && (
//                 <ReactGridLayout
//                   key={`nested-${sectionLayout.i}`}
//                   className="components"
//                   layout={sectionLayout.elements}
//                   cols={12}
//                   rowHeight={39}
//                   width={845}
//                   autoSize={true}
//                   isDraggable={true}
//                   isResizable={true}
//                   compactType={null}
//                   preventCollision={true}
//                   onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, sectionLayout.i)}
//                 >
//                   {sectionLayout.elements.map(component => (
//                     <div
//                       key={component.i}
//                       data-grid={component}
//                       style={{
//                         border: '1px dashed #28a745',
//                         backgroundColor: '#ffffff',
//                         textAlign: 'center',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         padding: '1px',
//                         minHeight: '20px',
//                       }}
//                       onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, sectionLayout.i)}
//                     >
//                       {renderComponent(component)}
//                     </div>
//                   ))}
//                 </ReactGridLayout>
//               )}
//             </div>
//           ))}
//         </ReactGridLayout>
//       ) : (
//         <p>Select a layout to start designing your page!</p>
//       )}
//     </div>
//   );
// }

// export default Canvas;



// import React, { useState, useRef, useEffect } from 'react';
// import GridLayout from 'react-grid-layout';
// import { WidthProvider } from 'react-grid-layout';
// import '../styles/Canvas.css'; // Ensure your CSS file exists and has necessary styles
// const ReactGridLayout = WidthProvider(GridLayout);
// function Canvas({ selectedLayout, selectedComponent }) {
//   const [content, setContent] = useState({});
//   const [components, setComponents] = useState([]);
//   const [hoveredSection, setHoveredSection] = useState(null);
//   const [layoutConfig, setLayoutConfig] = useState({
//     header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false, elements: [] },
//     horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false, elements: [] },
//     verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false, elements: [] },
//     verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false, elements: [] },
//     main: { i: 'main', x: 0, y: 1, w: 12, h: 10, static: false, elements: [] }, // Adjusted to fit between sidebars
//     footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false, elements: [] }
//   });

//   const contentRefs = useRef({});

//   const handleContentChange = (section) => {
//     if (contentRefs.current[section]) {
//       const newElement = contentRefs.current[section].innerHTML;
//       setLayoutConfig(prevConfig => ({
//         ...prevConfig,
//         [section]: {
//           ...prevConfig[section],
//           elements: [...prevConfig[section].elements, newElement]
//         }
//       }));
//     }
//   };

//   const handleBlur = (section) => {
//     handleContentChange(section);
//   };


//   // Layout configurations including an initialized `elements` array
//   // const layutConfig = {
//   //   header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false, elements: [] },
//   //   horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false, elements: [] },
//   //   verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false, elements: [] },
//   //   verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false, elements: [] },
//   //   main: { i: 'main', x: 0, y: 1, w: 12, h: 10, static: false, elements: [] }, // Adjusted to fit between sidebars
//   //   footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false, elements: [] }
//   // };

//   const getLayout = () => {
//     const layout = [];
//     let contentHeight = 12; // Default height for the content area

//     if (selectedLayout) {
//       if (selectedLayout.header) {
//         layout.push(layoutConfig.header);
//       }
//       if (selectedLayout.footer) {
//         layout.push(layoutConfig.footer);
//         contentHeight -= 1;
//         layoutConfig.verticalLeftNavbar.h -= 1;
//         layoutConfig.verticalRightNavbar.h -= 1;
//       }
//       if (selectedLayout.ishorizontalnav === 'true') {
//         layout.push(layoutConfig.horizontalNavbar);
//         contentHeight -= 1;
//         layoutConfig.verticalLeftNavbar.h -= 1;
//         layoutConfig.verticalRightNavbar.h -= 1;
//       }
//       if (selectedLayout.isverticalleftnav === 'true') {
//         layout.push(layoutConfig.verticalLeftNavbar);
//         layoutConfig.main.x = 1;
//         layoutConfig.main.w -= 1;
//       }
//       if (selectedLayout.isverticalrightnav === 'true') {
//         layout.push(layoutConfig.verticalRightNavbar);
//         layoutConfig.main.w -= 1;
//       }
//       layoutConfig.main.h = contentHeight;
//       layout.push(layoutConfig.main);
//     }

//     return layout;
//   };

//   const addComponentToLayout = (component) => {
//     const newComponent = {
//       i: `${component.type}-${components.length + 1}`,
//       x: 0,
//       y: components.length * 2,
//       w: 1,
//       h: 1,
//       static: false,
//       type: component.type,
//     };

//     setLayoutConfig(prevConfig => {
//       const updatedMain = {
//         ...prevConfig.main,
//         elements: [...prevConfig.main.elements, newComponent]
//       };
//       return { ...prevConfig, main: updatedMain };
//     });

//     setComponents(prevComponents => [...prevComponents, newComponent]);
//   };

//   useEffect(() => {
//     if (selectedComponent) {
//       addComponentToLayout(selectedComponent);
//     }
//   }, [selectedComponent]);


//   // Render components based on type
//   const renderComponent = (component) => {
//     switch (component.type) {
//       case 'button':
//         return <button style={{ width: '100%', height: '100%', backgroundColor:'lightblue', borderRadius:'5px' }}>Button</button>;
//       case 'textarea':
//         return <textarea style={{ width: '100%', height: '100%' }} rows={4} cols={20} />;
//       default:
//         return <div>Another Component</div>;
//     }
//   };
//   const layout = getLayout();
//   console.log("layout",layout);
//   return (
//     <div className="canvas-container">
//       {selectedLayout ? (
//         <ReactGridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={39}
//           width={845}
//           autoSize={true}
//           isDraggable={true}
//           isResizable={true}
//           compactType={null}
//           preventCollision={true}
//         >
//           {layout.map(sectionLayout => (
//             <div
//               key={sectionLayout.i}
//               data-grid={sectionLayout}
//               className={`section ${sectionLayout.i}`}
//               ref={(el) => contentRefs.current[sectionLayout.elements] = el}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onBlur={() => handleBlur(sectionLayout.elements)}
//               onMouseEnter={() => setHoveredSection(sectionLayout.i)}
//               onMouseLeave={() => setHoveredSection(null)}
//               style={{
//                 border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#f0f0f0',
//                 minHeight: '20px',
//                 textAlign: 'center',
//                 writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
//                 textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
//                 padding: '10px'
//               }}
//             >
//               <ReactGridLayout
//                   className="components"
//                   layout={sectionLayout.elements}
//                   cols={12}
//                   rowHeight={39}
//                   width={845}
//                   autoSize={true}
//                   isDraggable={true}
//                   isResizable={true}
//                   compactType={null}
//                   preventCollision={true}
//                 >
//                   {sectionLayout.elements.map(component => (
//                     <div
//                       key={component.i}
//                       data-grid={component}
//                       style={{
//                         border: '1px dashed #28a745',
//                         backgroundColor: '#ffffff',
//                         textAlign: 'center',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         padding: '1px',
//                         minHeight: '20px',
//                       }}
//                     >
//                       {renderComponent(component)}
//                     </div>
//                   ))}
//                 </ReactGridLayout>
//             </div>
//           ))}
//         </ReactGridLayout>
//       ) : (
//         <p>Select a layout to start designing your page!</p>
//       )}
//     </div>
//   );
// }

// export default Canvas;


  // const addComponentToLayout = (component) => {
  //   // Calculate the next available position for the component within the main content area
  //   const xPos = 0; // Adjust X position as needed
  //   const yPos = components.length * 2; // Stack components vertically
  //   const newComponent = {
  //     i: `${component.type}-${components.length + 1}`,
  //     x: xPos,
  //     y: yPos,
  //     w: 2, // Default width
  //     h: 2, // Default height
  //     static: false,
  //     type: component.type
  //   };
  //   layout?.main?.elements.push(newComponent);
  //   console.log("ele",layout?.main?.elements);
  //   setComponents(prevComponents => [...prevComponents, newComponent]);
  //   console.log("Updated Components", [...components, newComponent]); // Log updated components
  // };

//   // Handle new component added
//   useEffect(() => {
//     if (selectedComponent) {
//       addComponentToLayout(selectedComponent);
//     }
//     console.log("Selected Component", selectedComponent);
//   }, [selectedComponent]);

//   // Render components based on type
//   const renderComponent = (component) => {
//     switch (component.type) {
//       case 'button':
//         return <button>Button</button>;
//       case 'textarea':
//         return <textarea rows={4} cols={20} />;
//       // Add more cases as needed for different component types
//       default:
//         return <div>Another Component</div>;
//     }
//   };

//   return (
//     <div className="canvas-container">
//       {selectedLayout ? (
//         <GridLayout
//           className="layout"
//           layout={[...layout, ...components]}
//           cols={12}
//           rowHeight={39}
//           width={845}
//           autoSize={true}
//           isDraggable={true}
//           isResizable={true}
//           compactType={null}
//           preventCollision={true}
//         >
//           {layout.map(sectionLayout => (
//             <div
//               key={sectionLayout.i}
//               data-grid={sectionLayout}
//               className={`section ${sectionLayout.i}`}
//               ref={(el) => contentRefs.current[sectionLayout.elements] = el}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onBlur={() => handleBlur(sectionLayout.elements)}
//               onMouseEnter={() => setHoveredSection(sectionLayout.i)}
//               onMouseLeave={() => setHoveredSection(null)}
//               style={{
//                 border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#f0f0f0',
//                 minHeight: '20px',
//                 textAlign: 'center',
//                 writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
//                 textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
//                 padding: '10px'
//               }}
//             >
//             {sectionLayout.elements.map(component => (
//             <div
//               key={component.i}
//               data-grid={component}
//               style={{
//                 border: '2px dashed #28a745',
//                 backgroundColor: '#ffffff',
//                 textAlign: 'center',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 padding: '10px',
//                 minHeight: '20px'
//               }}
//             >
//               {renderComponent(component)}
//             </div>
//           ))}
//               {/* {content[sectionLayout.i] ||
//                 (sectionLayout.i === 'horizontalNavbar' && selectedLayout.horizontalNavbar) ||
//                 (sectionLayout.i === 'verticalLeftNavbar' && selectedLayout.verticalLeftNavbar) ||
//                 (sectionLayout.i === 'verticalRightNavbar' && selectedLayout.verticalRightNavbar) ||
//                 (sectionLayout.i === 'header' && selectedLayout.header) ||
//                 (sectionLayout.i === 'footer' && selectedLayout.footer) ||
//                 sectionLayout.i.toUpperCase()
//               } */}
//             </div>
//           ))}
//           {/* {components.map(component => (
//             <div
//               key={component.i}
//               data-grid={component}
//               style={{
//                 border: '2px dashed #28a745',
//                 backgroundColor: '#ffffff',
//                 textAlign: 'center',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 padding: '10px',
//                 minHeight: '40px'
//               }}
//             >
//               {renderComponent(component)}
//             </div>
//           ))} */}
//         </GridLayout>
//       ) : (
//         <p>Select a layout to start designing your page!</p>
//       )}
//     </div>
//   );
// }

// export default Canvas;




// import React, { useState, useRef, useEffect } from 'react';
// import GridLayout from 'react-grid-layout';
// import '../styles/Canvas.css'; // Ensure your CSS file exists and has necessary styles

// function Canvas({ selectedLayout, selectedComponent }) {
//   const [content, setContent] = useState({});
//   const [components, setComponents] = useState([]);
//   const [hoveredSection, setHoveredSection] = useState(null);

//   // Refs to store editable divs
//   const contentRefs = useRef({});

//   const handleContentChange = (section) => {
//     if (contentRefs.current[section]) {
//       const newText = contentRefs.current[section].innerText;
//       setContent(prevContent => ({
//         ...prevContent,
//         [section]: newText
//       }));
//     }
//   };

//   const handleBlur = (section) => {
//     handleContentChange(section);
//   };

//   // Define layout configurations for different sections
  // const layoutConfig = {
  //   header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false },
  //   horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false },
  //   verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false },
  //   verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false },
  //   main: { i: 'main', x: 0, y: 1, w: 12, h: 10, static: false }, // Adjusted to fit between sidebars
  //   footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false }
  // };

  // // Calculate layout based on selected layout properties
  // const getLayout = () => {
  //   const layout = [];
  //   let contentHeight = 12; // Default height for the content area

  //   if (selectedLayout) {
  //     if (selectedLayout.header) {
  //       layout.push(layoutConfig.header);
  //     }
  //     if (selectedLayout.footer) {
  //       layout.push(layoutConfig.footer);
  //       contentHeight -= 1; // Reduce content height for footer
  //       layoutConfig.verticalLeftNavbar.h -= 1;
  //       layoutConfig.verticalRightNavbar.h -= 1;
  //     }
  //     if (selectedLayout.ishorizontalnav === 'true') {
  //       layout.push(layoutConfig.horizontalNavbar);
  //       contentHeight -= 1; // Reduce content height for horizontal navbar
  //       layoutConfig.verticalLeftNavbar.h -= 1;
  //       layoutConfig.verticalRightNavbar.h -= 1;
  //     }
  //     if (selectedLayout.isverticalleftnav === 'true') {
  //       layout.push(layoutConfig.verticalLeftNavbar);
  //       layoutConfig.main.x = 1; // Adjust X for main content
  //       layoutConfig.main.w -= 1; // Adjust width for main content
  //     }
  //     if (selectedLayout.isverticalrightnav === 'true') {
  //       layout.push(layoutConfig.verticalRightNavbar);
  //       layoutConfig.main.w -= 1; // Adjust width for main content
  //     }
  //     layoutConfig.main.h = contentHeight; // Set height for main content
  //     layout.push(layoutConfig.main);
  //   }

  //   return layout;
  // };

//   const layout = getLayout();

//   const addComponentToLayout = (component) => {
//     const newComponent = {
//       i: `${component.type}-${components.length + 1}`,
//       x: 4,
//       y: 4,
//       w: 2,
//       h: 2,
//       static: false,
//       type: component.type
//     };
//     setComponents(prevComponents => [...prevComponents, newComponent]);
//     console.log("Updated Components", [...components, newComponent]); // Log updated components
//   };

//   // Handle new component added
//   useEffect(() => {
//     if (selectedComponent) {
//       addComponentToLayout(selectedComponent);
//     }
//     console.log("Selected Component", selectedComponent);
//   }, [selectedComponent]);

//   return (
//     <div className="canvas-container">
//       {selectedLayout ? (
//         <GridLayout
//           className="layout"
//           layout={[...layout, ...components]}
//           cols={12}
//           rowHeight={39}
//           width={845}
//           autoSize={true}
//           isDraggable={true}
//           isResizable={true}
//           compactType={null}
//           preventCollision={true}
//         >
//           {layout.map(sectionLayout => (
//             <div
//               key={sectionLayout.i}
//               data-grid={sectionLayout}
//               className={`section ${sectionLayout.i}`}
//               ref={(el) => contentRefs.current[sectionLayout.i] = el}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onBlur={() => handleBlur(sectionLayout.i)}
//               onMouseEnter={() => setHoveredSection(sectionLayout.i)}
//               onMouseLeave={() => setHoveredSection(null)}
//               style={{
//                 border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#f0f0f0',
//                 minHeight: '20px',
//                 textAlign: 'center',
//                 writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
//                 textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
//                 padding: '10px'
//               }}
//             >
//               {content[sectionLayout.i] ||
//                 (sectionLayout.i === 'horizontalNavbar' && selectedLayout.horizontalNavbar) ||
//                 (sectionLayout.i === 'verticalLeftNavbar' && selectedLayout.verticalLeftNavbar) ||
//                 (sectionLayout.i === 'verticalRightNavbar' && selectedLayout.verticalRightNavbar) ||
//                 (sectionLayout.i === 'header' && selectedLayout.header) ||
//                 (sectionLayout.i === 'footer' && selectedLayout.footer) ||
//                 sectionLayout.i.toUpperCase()
//               }
//             </div>
//           ))}
//           {components.map(component => (
//             <div
//               key={component.i}
//               data-grid={component}
//               style={{
//                 border: '2px dashed #28a745',
//                 backgroundColor: '#ffffff',
//                 textAlign: 'center',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 padding: '10px',
//                 minHeight: '40px'
//               }}
//             >
//               {component.type.toUpperCase()}
//               xyz
//             </div>
//           ))}
//         </GridLayout>
//       ) : (
//         <p>Select a layout to start designing your page!</p>
//       )}
//     </div>
//   );
// }

// export default Canvas;




// import React, { useState } from 'react';
// import GridLayout from 'react-grid-layout';
// import '../styles/Canvas.css'; // Ensure your CSS file exists and has necessary styles

// function Canvas({ selectedLayout }) { debugger
//   const [content, setContent] = useState({});
//   const [hoveredSection, setHoveredSection] = useState(null);

//   const handleContentChange = (section, event) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       [section]: event.target.textContent
//     }));
//   };

//   const layoutConfig = {
//     header: { i: 'header', x: 0, y: 0, w: 20, h: 1, static: false },
//     sidebar: { i: 'sidebar', x: 0, y: 1, w: 1, h: 13, static: false },
//     footer: { i: 'footer', x: 0, y: 14, w: 20, h: 1, static: false },
//     main: { i: 'main', x: 2, y: 1, w: 10, h: 9, static: false }
//   };

//   const layout = selectedLayout
//     ? selectedLayout.sections.map(section => layoutConfig[section])
//     : [];

//   return (
//     <div className="canvas-container">
//       {selectedLayout ? (
//         <GridLayout
//           className="layout"
//           layout={layout}
//           cols={20}
//           // rows={20}
//           rowHeight={30}
//           width={800}
//           autoSize={true}
//           isDraggable={true}
//           isResizable={true}
//           compactType={null}
//           preventCollision={true}
//           // margin={[10, 10]} // Adjust the margin between grid items
//           // containerPadding={[10, 10]} // Padding around the grid layout
//         >
//           {selectedLayout.sections.map(section => (
//             <div
//               key={section}
//               data-grid={layoutConfig[section]}
//               className={`section ${section}`}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onInput={(e) => handleContentChange(section, e)}
//               onMouseEnter={() => setHoveredSection(section)}
//               onMouseLeave={() => setHoveredSection(null)}
//               style={{
//                 border: hoveredSection === section ? '2px dashed #007bff' : '2px solid transparent',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 backgroundColor: '#f0f0f0',
//               }}
//             >
//               {hoveredSection === section && (
//                 <span className="section-name">
//                   {section.toUpperCase()}
//                 </span>
//               )}
//               {content[section] || `${section.toUpperCase()} (Click to edit)`}
//             </div>
//           ))}
//         </GridLayout>
//       ) : (
//         <p>Select a layout to start designing your page!</p>
//       )}
//     </div>
//   );
// }

// export default Canvas;


// import React, { useState } from 'react';

// function Canvas({ selectedLayout }) {
//   const [content, setContent] = useState({});
//   const [hoveredSection, setHoveredSection] = useState(null);

//   const handleContentChange = (section, event) => {
//     setContent({
//       ...content,
//       [section]: event.target.textContent
//     });
//   };

//   return (
    // <div className="canvas">
    //   {selectedLayout ? (
    //     selectedLayout.sections.map(section => (
    //       <div
    //         key={section}
    //         className={`section ${section}`}
    //         contentEditable
    //         suppressContentEditableWarning={true}
    //         onInput={(e) => handleContentChange(section, e)}
    //         onMouseEnter={() => setHoveredSection(section)}
    //         onMouseLeave={() => setHoveredSection(null)}
    //         style={{
    //           border: hoveredSection === section ? '2px dashed #007bff' : '2px solid transparent',
    //           position: 'relative',
    //         }}
    //       >
    //         {hoveredSection === section && (
    //           <span className="section-name">
    //             {section.toUpperCase()}
    //           </span>
    //         )}
    //         {content[section] || `${section.toUpperCase()} (Click to edit)`}
    //       </div>
    //     ))
    //   ) : (
    //     <p>Select a layout to start designing your page!</p>
    //   )}
    // </div>
//   );
// }

// export default Canvas;



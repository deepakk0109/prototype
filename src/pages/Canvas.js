import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import '../styles/Canvas.css';
import ChartPopup from '../widgets/Charts';
import Input from '../widgets/Input';
import { json, useLocation } from 'react-router-dom';
import Form from '../widgets/Form';
import Charts from '../widgets/Charts';
import layoutService from '../services/layoutService';


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
  const [selectedComponentId, setSelectedComponentId] = useState(null); // State for selected component
  // const [layout,setLayout]=useState(null);

  const isOuterGridDraggableRef = useRef(true);
  const isInnerGridDraggableRef = useRef(true);
  const contentRefs = useRef({});
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';


  const setIsPopupOpen = (isOpen) => {
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
    let maincontentHeight = 12;
    let mainwidth=12;
    let leftnavh=12;
    let rightnavh=12;
    let mainx=0;
    if (selectedLayout) {
      if (selectedLayout.header) {
        layout.push(layoutConfig.header);
      }
      if (selectedLayout.footer) {
        layout.push(layoutConfig.footer);
        maincontentHeight -= 1;
        // layoutConfig.verticalLeftNavbar.h -= 1;
        // layoutConfig.verticalRightNavbar.h -= 1;
        leftnavh -=1;
        rightnavh-=1;
      }
      if (selectedLayout.ishorizontalnav === 'true') {
        maincontentHeight -= 1;
        // layoutConfig.verticalLeftNavbar.h -= 1;
        // layoutConfig.verticalRightNavbar.h -= 1;
        leftnavh -=1;
        rightnavh-=1;
        layout.push(layoutConfig.horizontalNavbar);
      }
      if (selectedLayout.isverticalleftnav === 'true') {
        mainx+=1;
        // layoutConfig.main.x = 1;
        layoutConfig.main.w -= 1;
        mainwidth-=1;
        layoutConfig.verticalLeftNavbar.h=leftnavh;
        layout.push(layoutConfig.verticalLeftNavbar);
      }
      if (selectedLayout.isverticalrightnav === 'true') {
        layoutConfig.main.w -= 1;
        mainwidth-=1;
        layoutConfig.verticalRightNavbar.h=rightnavh;
        layout.push(layoutConfig.verticalRightNavbar);

      }
      layoutConfig.main.h = maincontentHeight;
      layoutConfig.main.w=mainwidth;
      layoutConfig.main.x=mainx;
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

        case 'textBoxWidget':
          return(
            <Input setIsPopupOpen={setIsPopupOpen} style={{ width: '100%', height: '100%' }} rows={4} cols={20} value={component.content} onChange={(event) => onContentChange(component.i, event.target.value)}/>
          )

        case 'box':
          return (
            <div style={{ flexGrow: 1, display:'flex', position: 'relative', border: '1px solid #ccc', width: '100%', height: '100%' }}>
              <Charts setIsPopupOpen={setIsPopupOpen}  style={{  border: '1px solid #ccc', width: '100%', height: '100%' }} />
          </div>
          );

        case 'form':
          return(
            <Form setIsPopupOpen={setIsPopupOpen}/>
          )
  
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


let layout = getLayout();
// if(!selectedLayout){
//   const savelayout=localStorage.getItem('layout')
//   layout =JSON.parse(savelayout);
//   console.log("xlayout",layout);
// }

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


const handleKeyDown = (event) => {
  if (event.key === 'Delete' && selectedComponentId) {debugger
    setLayoutConfig(prevConfig => {
      const updatedElements = prevConfig.main.elements.filter(item => item.i !== selectedComponentId);
      return {
        ...prevConfig,
        main: {
          ...prevConfig.main,
          elements: updatedElements
        }
      };
    });
    setSelectedComponentId(null); // Clear selection
  }
};

useEffect(() => {
  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [selectedComponentId]);



const handleSaveLayout = async () => {
  try {
    // Save the layout to the server (POST)
    const response = await layoutService.createLayout({ layoutItems: layout });
    console.log('Layout saved successfully:', response);
  } catch (error) {
    console.error('Failed to save layout:', error);
  }
};




return (
    <div className="canvas-container"  style={{ position: 'relative', paddingTop: '40px' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                {selectedLayout && (<button 
                onClick={() => {{
                  localStorage.setItem('layout', JSON.stringify(layout));
                  handleSaveLayout();
                }}}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
                )}
        </div>
      {selectedLayout ? (
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={39}
          width={845}
          autoSize={true}
          isDraggable={isConfig? false:isOuterGridDraggableRef.current }  // Control whether the outer grid is draggable
          isResizable={isConfig? false:isOuterGridDraggableRef.current}
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
                alignItems: 'flex-start',
                backgroundColor: '#f0f0f0',
                minHeight: '20px',
                textAlign: 'center',
                writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
                textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
                // padding: '10px'
                overflow: 'auto',
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
                  isDraggable={isConfig? false:isInnerGridDraggableRef.current}
                  isResizable={isConfig? false:isInnerGridDraggableRef.current}
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
                      onMouseEnter={() => setHoveredSection(component.i)}
                      onMouseLeave={() => setHoveredSection(null)}
                      style={{
                        // border: hoveredSection === component.i ? '2px dashed #007bff' : '2px solid transparent',
                        // border: '1px dashed #28a745',
                        backgroundColor: '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '1px',
                        margin:'2px',
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
        <p >Please select a layout</p>
      )}
    </div>
  );
}

export default Canvas;





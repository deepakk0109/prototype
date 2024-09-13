import React, { useState, useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import '../styles/Canvas.css';
import ChartPopup from '../widgets/Charts';
import Input from '../widgets/Input';
import { json, useLocation } from 'react-router-dom';
import Form from '../widgets/Form';
import {Charts} from '../widgets/Charts';
import layoutService from '../services/layoutService';
import {Table} from '../widgets/Table';
import {Checkbox} from '../widgets/Checkbox';
import {Dropdown} from '../widgets/Dropdown';
import Datepicker from '../widgets/Datepicker';
import Timepicker from '../widgets/Timepicker';
import {ImagePicker} from '../widgets/ImagePicker';
import Searchbar from '../widgets/Searchbar';
import ButtonComponent from '../components/Button';
import GrapesJSButtonComponent from '../components/Button';
import {RadioButton} from '../widgets/RadioButton';
import {File} from '../widgets/File';
import Audio from '../widgets/Audio';
import Line from '../components/Line';
import SimpleLine from '../components/Line';
import MyStatefulEditor from '../widgets/Text-editor';
import TextEditor from '../widgets/Text-editor';
import Datagrid from '../widgets/DataGrid';
import ImagePickerCarousel from '../widgets/Carousel';
import { FormBuilder } from '../widgets/FormBuilder';
import { TextBox } from '../widgets/rte';
import FormBuilderComponent from '../widgets/fb';


const ReactGridLayout = WidthProvider(GridLayout);
const defaultLayoutConfig={
//   header: { i: 'header', x: 0, y: 0, w: 12, h: 1, static: false, elements: [] },
//   horizontalNavbar: { i: 'horizontalNavbar', x: 0, y: 1, w: 12, h: 1, static: false, elements: [] },
//   verticalLeftNavbar: { i: 'verticalLeftNavbar', x: 0, y: 1, w: 1, h: 12, static: false, elements: [] },
//   verticalRightNavbar: { i: 'verticalRightNavbar', x: 11, y: 1, w: 1, h: 12, static: false, elements: [] },
  main: { i: 'main', x: 0, y: 0, w: 12, h: 12, static: false, elements: [] },
//   footer: { i: 'footer', x: 0, y: 12, w: 12, h: 1, static: false, elements: [] }
};
const mergeLayouts = (defaultConfig, fetchedLayouts) => {
  const updatedConfig = { ...defaultConfig };

  fetchedLayouts.forEach(layout => {
    if (layout.i in updatedConfig) {
      updatedConfig[layout.i] = {
        ...updatedConfig[layout.i],
        ...layout,
        elements: layout.elements || updatedConfig[layout.i].elements
      };
    }
  });

  return updatedConfig;
};

function Canvas({ selectedLayout, selectedComponent,selectedWidget,savedlayout,isPreview}) {
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';
  console.log("Slayout",selectedLayout);
  const [components, setComponents] = useState([]);
  const[widgets,setWidgets]=useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [layoutConfig, setLayoutConfig] = useState(defaultLayoutConfig);
  const [selectedComponentId, setSelectedComponentId] = useState(null); // State for selected component
  const[layoutMain,setLayoutMain]=useState(null);
  // const [layout,setLayout]=useState(null);

  const isOuterGridDraggableRef = useRef(true);
  const isInnerGridDraggableRef = useRef(true);
  const contentRefs = useRef({});



  const setIsPopupOpen = (isOpen) => {
    isOuterGridDraggableRef.current = !isOpen;
    isInnerGridDraggableRef.current = !isOpen;
  };


  function updateSelectedLayout(fetchedLayout) {
    // Define the initial state of the selectedLayout
    const selectedLayout = {
      header: "",
      footer: "",
      navbarType: "horizontal-and-vertical",
      ishorizontalnav: "false",
      isverticalleftnav: "false",
      isverticalrightnav: "false",
      horizontalNavbar: "",
      verticalLeftNavbar: "",
      verticalRightNavbar: ""
    };
  
    // Iterate over fetchedLayout to update selectedLayout
    fetchedLayout.forEach(item => {
      switch (item.i) {
        case 'header':
        case 'footer':
          selectedLayout[item.i] = true;
          break;
        case 'horizontalNavbar':
          selectedLayout.horizontalNavbar = item.i;
          selectedLayout.ishorizontalnav = "true";
          break;
        case 'verticalLeftNavbar':
          selectedLayout.verticalLeftNavbar = item.i;
          selectedLayout.isverticalleftnav = "true";
          break;
        case 'verticalRightNavbar':
          selectedLayout.verticalRightNavbar = item.i;
          selectedLayout.isverticalrightnav = "true";
          break;
        case 'navbarType':
          selectedLayout.navbarType = item.value || selectedLayout.navbarType;
          break;
        default:
          break;
      }
    });
  
    return selectedLayout;
  }
  
  
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
  


  


// Function to add a new component to the layout
const addComponentToLayout = (component) => {
  const newComponent = {
    i: `${component.type}-${Date.now()}`,
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



const addwidgetToLayout = (widget) => {
  const newWidget = {
    i: `${widget.type}-${Date.now()}`,
    type: widget.type,
    x: 0,
    y: widgets.length * 2,
    w: 6,
    h: 4,
    static: false,
    content: '', // Initialize the content for the component
    chartType:'',
    xorganization:'',
    xplant:'',
    xblock:'',
    xdevice:'',
    xparameter:'',
    yorganization:'',
    yplant:'',
    yblock:'',
    ydevice:'',
    yparameter:'',
    formInputs:[],
    formBackendLink:'',
    tableDataUrl:'',
      // checkboxLabel:'',
      // checkboxFlag:false,
      // checkboxSize:'',
      // checkboxLabelFontSize:'',
    imageDataUrl:'',
   Styles: {
      // backgroundColor: '#007bff',
      // color: '#fff',
      // padding: '10px 15px',
      // border: 'none',
      // borderRadius: '5px',
    },
  };
  if (widget.type === 'checkbox') {
    newWidget.w=1;
    newWidget.h=1;
    newWidget.checkboxLabel = '';
    newWidget.checkboxFlag = false;
    newWidget.checkboxSize = '';
    newWidget.checkboxLabelFontSize = '';
  }
  if(widget.type==='dropdown'){
    newWidget.w=2;
    newWidget.h=1;
    newWidget.dropdownLabel=''
    newWidget.dropdownSource = '';
    newWidget.dropdownOptions = [];
    newWidget.dropdownUrl = '';
    newWidget.dropdownFontSize = '';
  }
  if(widget.type==='radiobutton'){
    newWidget.w=2;
    newWidget.h=1;
    newWidget.radioLabel='';
    newWidget.radioOptions=[];
    newWidget.selectedRadioOption='';
    newWidget.radiodataSource='';
    newWidget.radioApiUrl='';
    newWidget.radioFontSize='';
  }
  if (widget.type === 'file') {
    // Initialize properties specific to file widgets
    newWidget.h=1;
    newWidget.w=2;
    newWidget.fileBackendUrl = ''; // URL to be set for file uploads
  }
  if(widget.type==='datepicker'){
    newWidget.h=1;
    newWidget.w=3;
    newWidget.selectedDate='';
  }
  if(widget.type==='texteditor'){
    newWidget.w=3;
    newWidget.h=2;
    newWidget.textEditorContent='';
  }

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

const updateWidgetChart = (
  widgetId, 
  chartType,
  organizationx,
  plantx,
  blockx,
  devicex,
  parameterx,
  organizationy,
  planty,
  blocky,
  devicey,
  parametery,
  widgetStyles
) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget, 
          chartType: chartType,
          xorganization: organizationx,
          xplant: plantx,
          xblock: blockx,
          xdevice: devicex,
          xparameter: parameterx,
          yorganization: organizationy,
          yplant: planty,
          yblock: blocky,
          ydevice: devicey,
          yparameter: parametery,
          Styles:widgetStyles
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
          ...widget, 
          chartType: chartType,
          xorganization: organizationx,
          xplant: plantx,
          xblock: blockx,
          xdevice: devicex,
          xparameter: parameterx,
          yorganization: organizationy,
          yplant: planty,
          yblock: blocky,
          ydevice: devicey,
          yparameter: parametery,
          Styles:widgetStyles
        } 
      : widget
    )
  );
};

const updateFormWidget = (inputs, backendLink,widgetId) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget, 
          formInputs: inputs,
          formBackendLink: backendLink,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget, 
        formInputs: inputs,
        formBackendLink: backendLink,
        } 
      : widget
    )
  );
};

const updateTableWidget = (tableDataUrl,widgetId) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget, 
          tableDataUrl: tableDataUrl,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget, 
        tableDataUrl: tableDataUrl,
        } 
      : widget
    )
  );
};

const updateCheckboxWidget= (checkboxLabel,checkboxFlag,checkboxSize,labelFontSize,widgetId,widgetStyles) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget,
          checkboxLabel:checkboxLabel, 
          checkboxFlag: checkboxFlag,
          checkboxSize:checkboxSize,
          checkboxLabelFontSize:labelFontSize,
          Styles:widgetStyles
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        checkboxLabel:checkboxLabel, 
        checkboxFlag: checkboxFlag,
        checkboxSize:checkboxSize,
        checkboxLabelFontSize:labelFontSize,
        Styles:widgetStyles
        } 
      : widget
    )
  );
};

const updateImageWidget= (newDataUri,widgetId) => {debugger
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget,
          imageDataUrl:newDataUri
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        imageDataUrl:newDataUri
        } 
      : widget
    )
  );
};

const updateDropdownWidget=(label,dropdownOptions, dropdownSource,dropdownUrl,dropdownFontSize,widgetId,widgetStyles) => {debugger
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget,
          dropdownLabel:label,
          dropdownOptions:dropdownOptions, 
          dropdownSource:dropdownSource,
          dropdownUrl:dropdownUrl,
          dropdownFontSize:dropdownFontSize,
          Styles:widgetStyles,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        dropdownLabel:label,
        dropdownOptions:dropdownOptions, 
        dropdownSource:dropdownSource,
        dropdownUrl:dropdownUrl,
        dropdownFontSize:dropdownFontSize,
        Styles:widgetStyles,
        } 
      : widget
    )
  );
}

const updateRadioButtonWidget=(radioLabel, radioOptions, selectedRadioOption,radiodataSource,radioApiUrl,radioFontSize, widgetId,widgetStyles) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return { 
          ...widget,
          radioLabel:radioLabel,
          radioOptions:radioOptions, 
          selectedRadioOption:selectedRadioOption,
          radiodataSource:radiodataSource,
          radioApiUrl:radioApiUrl,
          radioFontSize:radioFontSize,
          Styles:widgetStyles,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        radioLabel:radioLabel,
        radioOptions:radioOptions, 
        selectedRadioOption:selectedRadioOption,
        radiodataSource:radiodataSource,
        radioApiUrl:radioApiUrl,
        radioFontSize:radioFontSize,
        Styles:widgetStyles,
        } 
      : widget
    )
  );
}

const updateFileWidget = (fileBackendUrl, uploadButtonStyle, widgetId) => {debugger
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return {
          ...widget,
          fileBackendUrl: fileBackendUrl,
          styles: uploadButtonStyle,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        fileBackendUrl: fileBackendUrl,
        styles: uploadButtonStyle,
      } 
      : widget
    )
  );
}
const updateDateWidget=(widgetId,selectedDate) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return {
          ...widget,
          selectedDate: selectedDate,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        selectedDate: selectedDate,
      } 
      : widget
    )
  );
}

const updateTextEditorWidget=(widgetId,htmlContent) => {
  setLayoutConfig(prevConfig => {
    const updatedElements = prevConfig.main.elements.map(widget => {
      if (widget.i === widgetId) {
        return {
          ...widget,
          textEditorContent: htmlContent,
        };
      }
      return widget;
    });

    return {
      ...prevConfig,
      main: {
        ...prevConfig.main,
        elements: updatedElements,
      },
    };
  });

  setWidgets(prevWidgets => 
    prevWidgets.map(widget => 
      widget.i === widgetId 
      ? { 
        ...widget,
        textEditorContent: htmlContent,
      } 
      : widget
    )
  );
}



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
    console.log("saving",layout);
    const response = await layoutService.createLayout({ layoutItems: layout });
    console.log('Layout saved successfully:', response);
  } catch (error) {
    console.error('Failed to save layout:', error);
  }
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
          <Input setIsPopupOpen={setIsPopupOpen} style={{ width: '100%', height: '100%' }} rows={4} cols={20} value={component.content} onChange={(event) => onContentChange(component.i, event.target.value)} widgetId={component.i}/>
        )

      case 'box':
        return (
          <div style={{ flexGrow: 1, display:'flex', position: 'relative', border: '1px solid #ccc', width: '100%', height: '100%' }}>
            <Charts setIsPopupOpen={setIsPopupOpen} Styles={component.Styles} updateWidgetChart={updateWidgetChart} typeOfChart={component.chartType}  widgetId={component.i} Ox={component.xorganization} Px={component.xplant} Bx={component.xblock} Dx={component.xdevice} Parameterx={component.xparameter} Oy={component.yorganization} Py={component.yplant} By={component.yblock} Dy={component.ydevice} Parametery={component.yparameter} style={{  border: '1px solid #ccc', width: '100%', height: '100%' }} />
        </div>
        );
        case 'table':
          return(
            <Table setIsPopupOpen={setIsPopupOpen} updateTableWidget={updateTableWidget} widgetId={component.i} tableDataUrl={component.tableDataUrl}/>
          )

        case 'checkbox':
          return(
            <Checkbox updateCheckboxWidget={updateCheckboxWidget} widgetId={component.i}  flag={component.checkboxFlag} label={component.checkboxLabel} size={component.checkboxSize} labelfontsize={component.checkboxLabelFontSize} Styles={component.Styles}/>
          )

      case 'form':
        return(
          <Form updateFormWidget={updateFormWidget} widgetId={component.i} formInputs={component.formInputs} formBackendLink={component.formBackendLink} isPreview={isPreview}/>
          // <FormBuilder/>
          // <FormBuilderComponent/>
        )

      case 'dropdown':
        return(
          <Dropdown isConfig={isConfig} updateDropdownWidget={updateDropdownWidget} widgetId={component.i} Source={component.dropdownSource} Url={component.dropdownUrl} Options={component.dropdownOptions} FontSize={component.dropdownFontSize} Label={component.dropdownLabel} Styles={component.Styles}/>
        )

        case 'datepicker':
          return(
            <Datepicker widgetId={component.i} updateDateWidget={updateDateWidget} SelectedDate={component.selectedDate} isPreview={isPreview}/>
          )
      
      case 'timepicker':
        return(
          <Timepicker/>
        )

      case 'image':
        return(
          <ImagePicker isConfig={isConfig} updateImageWidget={updateImageWidget} widgetId={component.i} DataUrl={component.imageDataUrl}/>
        )

      case 'searchbar':
        return(
          <Searchbar/>
        )

      case 'radiobutton':
        return(
          <RadioButton updateRadioButtonWidget={updateRadioButtonWidget} label={component.radioLabel} options={component.radioOptions} selectedOption={component.selectedRadioOption} fontSize={component.radioFontSize} dataSource={component.radiodataSource} ApiUrl={component.radioApiUrl} isConfig={isConfig} widgetId={component.i} Styles={component.Styles}/>
        )

      case 'file':
        return(
          <File isConfig={isConfig} widgetId={component.i} updateFileWidget={updateFileWidget} ButtonsStyle={component.styles} BackendUrl={component.fileBackendUrl}/>
        )

      case 'audio':
        return(
          <Audio/>
        )

      case 'line':
        return(
          <SimpleLine setIsPopupOpen={setIsPopupOpen}/>
        )

      case 'texteditor':
        return(
          <TextEditor isConfig={isConfig} isPreview={isPreview} widgetId={component.i} updateTextEditorWidget={updateTextEditorWidget} TextEditorContent={component.textEditorContent}/>
          // <TextBox widgetId={component.i}/>
        )

      case 'datagrid':
        return(
          <Datagrid/>
        )

      case 'carousel':
        return(
          <ImagePickerCarousel isConfig={isConfig} updateImageWidget={updateImageWidget} widgetId={component.id}/>
        )

    default:
      return <div>Another Component</div>;
  }

};


const [flayout, setFlayout] = useState([]);

const handleFetchLayouts = async () => {
    try {
      const layouts = await layoutService.getLayouts();
      if (layouts && layouts.length > 0) {
        // setFlayout(layouts[layouts.length-1].layoutItems);  // Set the first layout
        const fetchedLayout = layouts[layouts.length - 1].layoutItems;
        const updatedLayoutConfig = mergeLayouts(defaultLayoutConfig, fetchedLayout);
        setLayoutConfig(updatedLayoutConfig);
        selectedLayout = updateSelectedLayout(fetchedLayout);
        console.log("slayout",selectedLayout);
        layout=getLayout();
                console.log('configsup:', layoutConfig);
                   console.log("flayout",fetchedLayout);
      }
    } catch (error) {
      console.error('Failed to fetch layouts:', error);
    }
  };

  // Fetch layouts when the component mounts
  // useEffect(() => {
  //   handleFetchLayouts();
  // }, []);
  // if(!selectedLayout){
  //   layout=flayout;
  //   // selectedLayout=savedlayout;
  //   console.log("flayout",flayout);
  //   console.log("state",layoutConfig);
  // }

if(isPreview){
  layout=savedlayout;
  // selectedLayout=savedlayout;
  // console.log("selected layout",selectedLayout);
}

console.log("layout",layout);
console.log("layout2",layout[0]);
console.log("isPreview",isPreview);

// console.log("slayout",selectedLayout);

return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {!isPreview && (
          <button 
            onClick={() => {
              localStorage.setItem('layout', JSON.stringify(layout));
              handleSaveLayout();
            }}
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
      <div className={isPreview ? "canvas-container-preview" : "canvas-container"} style={{ position: 'relative',border:'1px solid black' }}>
        {layout && layout.length>0 ? (
          <ReactGridLayout
            key={`nested-main`}
            className="components"
            layout={layout[0]?.elements}
            cols={12}
            rowHeight={39}
            width={845}
            autoSize={true}
            isDraggable={isPreview ? false : (isConfig ? false : isOuterGridDraggableRef.current)}  // Lock dragging in Preview mode
            isResizable={isPreview ? false : (isConfig ? false : isOuterGridDraggableRef.current)}  // Lock resizing in Preview mode
            // isDraggable={false}  // Lock draggable behavior
            // isResizable={false}
            compactType={null}
            preventCollision={true}
            onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, layout[0]?.i)}
          >
            {layout[0]?.elements.map((component) => (
              <div
                key={component.i}
                data-grid={component}
                className={`section main`}
                ref={(el) => contentRefs.current[component.i] = el}
                onMouseEnter={() => setHoveredSection(component.i)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  border: hoveredSection === component.i ? '2px dashed #007bff' : '2px solid transparent',
                  position: 'fixed',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  backgroundColor: '#f0f0f0',
                  minHeight: '20px',
                  textAlign: 'center',
                  writingMode: component.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
                  textOrientation: component.i.includes('vertical') ? 'upright' : 'mixed',
                }}
              >
                {RenderComponent(component)}
              </div>
            ))}
          </ReactGridLayout>
        ) : (
          <div>Select a layout</div>
        )}
      </div>
    </div>
  );
  
}

export default Canvas;

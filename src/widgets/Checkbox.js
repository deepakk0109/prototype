import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckboxState,setWidgetStyles, setwidgetStyles } from '../redux/slices/checkboxSlice';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Modal from 'react-modal';
import { StyleModel } from './StyleModel';

Modal.setAppElement('#root');
const Checkbox = ({ updateCheckboxWidget, widgetId, flag: propFlag, label: propLabel, size: propSize, labelfontsize: propLabelFontSize,Styles }) => {
    const dispatch = useDispatch();
    const State=useSelector((state) => state.checkbox[widgetId]) || {}

    const { label, flag, size, labelFontSize,widgetStyles } = State;
    useEffect(() => {
        dispatch(setCheckboxState({ widgetId,
            label: propLabel || '',
            flag: propFlag || false,
            size: propSize || '24px',
            labelFontSize: propLabelFontSize || '16px',
    }));
        dispatch(setWidgetStyles({ widgetId, widgetStyles: Styles || {
          height:'',
          width:'',
          backgroundColor: '',
          color: '',
          padding: '',
          margin:'',
          fontSize:'',
          border: '',
          borderRadius: '',
        } }));
      }, [Styles, widgetId, dispatch]);
    

    const location = useLocation();
    const isConfig = location.pathname === '/configurations';

    const toggleSettings = () => {
        const sidebarElement = document.getElementById('sidebar');

        if (!sidebarElement) {
            console.warn('Sidebar element not found');
            return;
        }
        const root = ReactDOM.createRoot(sidebarElement);
        root.render(
            <React.StrictMode>
                <Provider store={store}>
                    <CheckboxSidebar 
                        widgetId={widgetId} 
                        updateCheckboxWidget={updateCheckboxWidget} 
                    />
                </Provider>
            </React.StrictMode>
        );
    };

    const handleCheckboxChange = () => {
        dispatch(setCheckboxState({
            widgetId,
            label,
            flag: !flag,
            size,
            labelFontSize,
        }));
        updateCheckboxWidget(label, !flag, size, labelFontSize, widgetId,widgetStyles);
    };

    return (
        <div onClick={toggleSettings} style={{...widgetStyles, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
            {isConfig && (
                <button
                    style={{
                        position: 'absolute',
                        top: '1px',
                        right: '1px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                    }}
                    onClick={toggleSettings}
                >
                    ⚙️
                </button>
            )}

            <input
                type="checkbox"
                checked={flag}
                onChange={handleCheckboxChange}
                style={{
                    transform: `scale(${parseInt(size, 10) / 24})`, // Adjust the scale factor as needed
                    margin: '0 10px', // Add margin for spacing
                }}
            />
            <label
                style={{
                    marginLeft: '10px',
                    fontSize: labelFontSize,
                }}
            >
                {label}
            </label>
        </div>
    );
};

const CheckboxSidebar = ({ widgetId, updateCheckboxWidget }) => {
    const dispatch = useDispatch();
    const checkboxState = useSelector((state) => state.checkbox[widgetId]) || {
        // label: 'Enter Label',
        // flag: false,
        // size: '24px',
        // labelFontSize: '16px',
        // widgetStyles:Styles,
    };

    const { label, flag, size, labelFontSize,widgetStyles } = checkboxState;

    const handleInputChange = (key, value) => {
        dispatch(setCheckboxState({
            widgetId,
            ...checkboxState,
            [key]: value,
        }));
    };

    const handleSave = () => {debugger
        updateCheckboxWidget(label, flag, size, labelFontSize, widgetId,widgetStyles);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openSettingsModal = () => {
      setModalIsOpen(true);
    };
  
    const closeSettingsModal = () => {
      setModalIsOpen(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Checkbox Configuration</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Label:
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => handleInputChange('label', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Label Font Size (px):
                    <input
                        type="number"
                        value={parseInt(labelFontSize, 10)}
                        onChange={(e) => handleInputChange('labelFontSize', `${e.target.value}px`)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Checked:
                    <input
                        type="checkbox"
                        checked={flag}
                        onChange={(e) => handleInputChange('flag', e.target.checked)}
                        style={{
                            marginLeft: '10px',
                        }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Checkbox Size (px):
                    <input
                        type="number"
                        value={parseInt(size, 10)}
                        onChange={(e) => handleInputChange('size', `${e.target.value}px`)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </label>
            </div>

            <div>


            <div style={{ marginBottom: '10px' }}>Add styles  <button onClick={openSettingsModal}  style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '1px 10px', cursor: 'pointer' }}>+</button></div>
        <button onClick={()=>{handleSave(); closeSettingsModal()}}  style={{ backgroundColor: 'blue', borderRadius: '5px', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }} >
          Save
        </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
            // pointerEvents: 'none', // Disable pointer events on overlay
          },
          content: {
            top: '50%',
            right: '10px', // Distance from the right edge
            left: 'auto', // Remove left alignment
            bottom: 'auto',
            marginRight: '0', // No margin on the right
            transform: 'translateY(-50%)', // Center vertically
            // padding: '20px',
            width: '200px',
            // textAlign: 'center',
            pointerEvents: 'auto', // Enable pointer events for the modal content
            overflowY:'auto',
          },
        }}
      >
        <StyleModel widgetId={widgetId} setWidgetStyles={setWidgetStyles} state={checkboxState}/>
        <button onClick={()=>{handleSave(); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
      
       {/* {modalIsOpen &&( */}
        {/* <>
        <div style={{ marginBottom: '10px' }}>
          <label>Height:</label>
          <input
            type="text"
            value={widgetStyles.height}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  height: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Width:</label>
          <input
            type="text"
            value={widgetStyles.width}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  width: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Background color:</label>
          <input
            type="color"
            value={widgetStyles.backgroundColor}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  backgroundColor: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Color:</label>
          <input
            type="color"
            value={widgetStyles.color}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  color: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          
      
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Font Size</label>
          <input
            type="text"
            value={widgetStyles.fontSize}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  fontSize: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Padding:</label>
          <input
            type="text"
            value={widgetStyles.padding}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  padding: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Margin:</label>
          <input
            type="text"
            value={widgetStyles.margin}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  margin: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Border:</label>
          <input
            type="text"
            value={widgetStyles.border}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  border: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Border Radius:</label>
          <input
            type="text"
            value={widgetStyles.borderRadius}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  borderRadius: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
      
        <button onClick={()=>{handleSave(); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </> */}
        {/* )}  */}
        </Modal>
            </div>
        </div>
    );
};

export { Checkbox, CheckboxSidebar };



// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useLocation } from 'react-router-dom';

// // Ensure Modal is properly initialized
// Modal.setAppElement('#root');

// const Checkbox = ({ updateCheckboxWidget, widgetId, flag, label, size, labelfontsize }) => {
//     const location = useLocation();
//     const isConfig = location.pathname === '/configurations';

//     const [isModalOpen, setIsModalOpen] = useState(false);
    
//     const [checkboxSize, setCheckboxSize] = useState(size || '24'); // Single size input for both width and height
//     const [labelFontSize, setLabelFontSize] = useState(labelfontsize || '16'); // Input for label font size
//     const [checkboxLabel, setCheckboxLabel] = useState(label || '');
//     const [checkboxFlag, setCheckboxFlag] = useState(flag || false);

//     const handleSave = () => {
//         updateCheckboxWidget(checkboxLabel, checkboxFlag, checkboxSize, labelFontSize, widgetId);
//         setIsModalOpen(false);
//     };

//     const handleButtonClick = (e) => {
//         e.stopPropagation();
//         setIsModalOpen(true);
//     };

//     const handleCheckboxChange = () => {
//         // setCheckboxFlag(!checkboxFlag); // Toggle the checkboxFlag state
//         updateCheckboxWidget(checkboxLabel, checkboxFlag, checkboxSize, labelFontSize, widgetId); // Update with the toggled state
//     };
//     console.log("checkboxFlag",checkboxFlag);

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
//             {isConfig && (
//                 <>
//                     <button
//                         style={{
//                             position: 'absolute',
//                             top: '1px',
//                             right: '1px',
//                             background: 'none',
//                             border: 'none',
//                             cursor: 'pointer',
//                             fontSize: '20px',
//                         }}
//                         onClick={handleButtonClick}
//                     >
//                         ⚙️
//                     </button>

//                     <Modal
//                         isOpen={isModalOpen}
//                         onRequestClose={() => setIsModalOpen(false)}
//                         style={{
//                             overlay: {
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                             },
//                             content: {
//                                 top: '50%',
//                                 left: '50%',
//                                 right: 'auto',
//                                 bottom: 'auto',
//                                 marginRight: '-50%',
//                                 transform: 'translate(-50%, -50%)',
//                                 padding: '20px',
//                                 borderRadius: '8px',
//                                 width: '300px',
//                                 textAlign: 'center',
//                             },
//                         }}
//                         contentLabel="Configure Checkbox"
//                     >
//                         <h2>Checkbox Configuration</h2>

//                         {/* Input for Checkbox Label */}
//                         <div style={{ marginTop: '10px' }}>
//                             <label>
//                                 Label:
//                                 <input
//                                     type="text"
//                                     value={checkboxLabel}
//                                     onChange={(e) => setCheckboxLabel(e.target.value)}
//                                     style={{ marginLeft: '10px', width: '100%' }}
//                                 />
//                             </label>
//                         </div>

//                         {/* Input for Label Font Size */}
//                         <div style={{ marginTop: '10px' }}>
//                             <label>
//                                 Label Font Size (px):
//                                 <input
//                                     type="number"
//                                     value={parseInt(labelFontSize, 10)}
//                                     onChange={(e) => setLabelFontSize(`${e.target.value}px`)}
//                                     style={{ marginLeft: '10px', width: '100%' }}
//                                 />
//                             </label>
//                         </div>

//                         {/* Input for Checkbox Flag */}
//                         <div style={{ marginTop: '10px' }}>
//                             <label>
//                                 Checked:
//                                 <input
//                                     type="checkbox"
//                                     checked={checkboxFlag}
//                                     onChange={(e) => setCheckboxFlag(e.target.checked)}
//                                     style={{ marginLeft: '10px' }}
//                                 />
//                             </label>
//                         </div>

//                         {/* Input for Checkbox Size */}
//                         <div style={{ marginTop: '10px' }}>
//                             <label>
//                                 Checkbox Size (px):
//                                 <input
//                                     type="number"
//                                     value={parseInt(checkboxSize, 10)}
//                                     onChange={(e) => setCheckboxSize(`${e.target.value}px`)}
//                                     style={{ marginLeft: '10px', width: '100%' }}
//                                 />
//                             </label>
//                         </div>

//                         <div style={{ marginTop: '20px' }}>
//                             <button
//                                 onClick={handleSave}
//                                 style={{
//                                     padding: '10px 15px',
//                                     margin: '5px',
//                                     border: 'none',
//                                     borderRadius: '4px',
//                                     backgroundColor: '#007bff',
//                                     color: 'white',
//                                     cursor: 'pointer',
//                                 }}
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 style={{
//                                     padding: '10px 15px',
//                                     margin: '5px',
//                                     border: 'none',
//                                     borderRadius: '4px',
//                                     backgroundColor: '#ccc',
//                                     cursor: 'pointer',
//                                 }}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </Modal>
//                 </>
//             )}

//             <input
//                 type="checkbox"
//                 checked={checkboxFlag}
//                 onChange={(e) =>{ setCheckboxFlag(e.target.checked); handleCheckboxChange()}}
//                 style={{
//                     width: checkboxSize, // Apply the size to both width and height
//                     height: checkboxSize,
//                 }}
//             />
//             <label
//                 style={{
//                     marginLeft: '10px',
//                     fontSize: labelFontSize,
//                 }}
//             >
//                 {checkboxLabel}
//             </label>
//         </div>
//     );
// };

// export default Checkbox;



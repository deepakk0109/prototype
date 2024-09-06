import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckboxState } from '../redux/slices/checkboxSlice';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Checkbox = ({ updateCheckboxWidget, widgetId, flag: propFlag, label: propLabel, size: propSize, labelfontsize: propLabelFontSize }) => {debugger
    const dispatch = useDispatch();
    const checkboxState = useSelector((state) => state.checkbox[widgetId]) || {
        label: propLabel || '',
        flag: propFlag || false,
        size: propSize || '24px',
        labelFontSize: propLabelFontSize || '16px',
    };

    const { label, flag, size, labelFontSize } = checkboxState;
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
        updateCheckboxWidget(label, !flag, size, labelFontSize, widgetId);
    };

    return (
        <div onClick={toggleSettings} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
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
        label: 'Default Label',
        flag: false,
        size: '24px',
        labelFontSize: '16px',
    };

    const { label, flag, size, labelFontSize } = checkboxState;

    const handleInputChange = (key, value) => {
        dispatch(setCheckboxState({
            widgetId,
            ...checkboxState,
            [key]: value,
        }));
    };

    const handleSave = () => {
        updateCheckboxWidget(label, flag, size, labelFontSize, widgetId);
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
                <button
                    onClick={handleSave}
                    style={{
                        padding: '10px 15px',
                        margin: '5px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
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



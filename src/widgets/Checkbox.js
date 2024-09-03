import React, { useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

// Ensure Modal is properly initialized
Modal.setAppElement('#root');

const Checkbox = ({ updateCheckboxWidget, widgetId, flag, label, size, labelfontsize }) => {
    const location = useLocation();
    const isConfig = location.pathname === '/configurations';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkboxSize, setCheckboxSize] = useState(size || '24'); // Single size input for both width and height
    const [labelFontSize, setLabelFontSize] = useState(labelfontsize || '16'); // Input for label font size
    const [checkboxLabel, setCheckboxLabel] = useState(label || '');
    const [checkboxFlag, setCheckboxFlag] = useState(flag || false);

    const handleSave = () => {
        updateCheckboxWidget(checkboxLabel, checkboxFlag, checkboxSize, labelFontSize, widgetId);
        setIsModalOpen(false);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCheckboxChange = () => {
        // setCheckboxFlag(!checkboxFlag); // Toggle the checkboxFlag state
        updateCheckboxWidget(checkboxLabel, checkboxFlag, checkboxSize, labelFontSize, widgetId); // Update with the toggled state
    };
    console.log("checkboxFlag",checkboxFlag);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
            {isConfig && (
                <>
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
                        onClick={handleButtonClick}
                    >
                        ⚙️
                    </button>

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '300px',
                                textAlign: 'center',
                            },
                        }}
                        contentLabel="Configure Checkbox"
                    >
                        <h2>Checkbox Configuration</h2>

                        {/* Input for Checkbox Label */}
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                Label:
                                <input
                                    type="text"
                                    value={checkboxLabel}
                                    onChange={(e) => setCheckboxLabel(e.target.value)}
                                    style={{ marginLeft: '10px', width: '100%' }}
                                />
                            </label>
                        </div>

                        {/* Input for Label Font Size */}
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                Label Font Size (px):
                                <input
                                    type="number"
                                    value={parseInt(labelFontSize, 10)}
                                    onChange={(e) => setLabelFontSize(`${e.target.value}px`)}
                                    style={{ marginLeft: '10px', width: '100%' }}
                                />
                            </label>
                        </div>

                        {/* Input for Checkbox Flag */}
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                Checked:
                                <input
                                    type="checkbox"
                                    checked={checkboxFlag}
                                    onChange={(e) => setCheckboxFlag(e.target.checked)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>

                        {/* Input for Checkbox Size */}
                        <div style={{ marginTop: '10px' }}>
                            <label>
                                Checkbox Size (px):
                                <input
                                    type="number"
                                    value={parseInt(checkboxSize, 10)}
                                    onChange={(e) => setCheckboxSize(`${e.target.value}px`)}
                                    style={{ marginLeft: '10px', width: '100%' }}
                                />
                            </label>
                        </div>

                        <div style={{ marginTop: '20px' }}>
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
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '10px 15px',
                                    margin: '5px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: '#ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </>
            )}

            <input
                type="checkbox"
                checked={checkboxFlag}
                onChange={(e) =>{ setCheckboxFlag(e.target.checked); handleCheckboxChange()}}
                style={{
                    width: checkboxSize, // Apply the size to both width and height
                    height: checkboxSize,
                }}
            />
            <label
                style={{
                    marginLeft: '10px',
                    fontSize: labelFontSize,
                }}
            >
                {checkboxLabel}
            </label>
        </div>
    );
};

export default Checkbox;




// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useLocation } from 'react-router-dom';

// // Ensure Modal is properly initialized
// Modal.setAppElement('#root');

// const Checkbox = ({updateCheckboxWidget,widgetId}) => {
//     const location = useLocation();
//     const isConfig = location.pathname === '/configurations';

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [textboxSize, setTextboxSize] = useState({ width: '24px', height: '24px' });
//     const [checkedAction, setCheckedAction] = useState('none');
//     // const [isChecked, setIsChecked] = useState(false);
//     const [checkboxLabel, setCheckboxLabel] = useState('');
//     const [checkboxFlag, setCheckboxFlag] = useState(false);

//     const handleSave = () => {
//         updateCheckboxWidget(checkboxLabel,checkboxFlag,widgetId); // Call the function to update the widget
//         setIsModalOpen(false); // Close the modal
//     };
    

//     const handleButtonClick = (e) => {
//         e.stopPropagation();
//         setIsModalOpen(true);
//     };

//     const handleCheckboxChange = () => {
//         updateCheckboxWidget(checkboxLabel,checkboxFlag,widgetId);
//     };

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
//                     isOpen={isModalOpen}
//                     onRequestClose={() => setIsModalOpen(false)}
//                     style={{
//                         overlay: {
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                         },
//                         content: {
//                             top: '50%',
//                             left: '50%',
//                             right: 'auto',
//                             bottom: 'auto',
//                             marginRight: '-50%',
//                             transform: 'translate(-50%, -50%)',
//                             padding: '20px',
//                             borderRadius: '8px',
//                             width: '300px',
//                             textAlign: 'center',
//                         },
//                     }}
//                     contentLabel="Configure Checkbox"
//                 >
//                     <h2>Checkbox Configuration</h2>

//                     {/* Input for Checkbox Label */}
//                     <div style={{ marginTop: '10px' }}>
//                         <label>
//                             Label:
//                             <input
//                                 type="text"
//                                 value={checkboxLabel}
//                                 onChange={(e) => setCheckboxLabel(e.target.value)}
//                                 style={{ marginLeft: '10px', width: '100%' }}
//                             />
//                         </label>
//                     </div>

//                     {/* Input for Checkbox Flag */}
//                     <div style={{ marginTop: '10px' }}>
//                         <label>
//                             Checked:
//                             <input
//                                 type="checkbox"
//                                 checked={checkboxFlag}
//                                 onChange={(e) => setCheckboxFlag(e.target.checked)}
//                                 style={{ marginLeft: '10px' }}
//                             />
//                         </label>
//                     </div>

//                     {/* Existing Inputs for Width, Height, and On Checked Action */}
//                     <div style={{ marginTop: '10px' }}>
//                         <label>
//                             Width (px):
//                             <input
//                                 type="number"
//                                 value={parseInt(textboxSize.width, 10)}
//                                 onChange={(e) =>
//                                     setTextboxSize({
//                                         ...textboxSize,
//                                         width: `${e.target.value}px`,
//                                     })
//                                 }
//                                 style={{ marginLeft: '10px', width: '100%' }}
//                             />
//                         </label>
//                     </div>

//                     <div style={{ marginTop: '10px' }}>
//                         <label>
//                             Height (px):
//                             <input
//                                 type="number"
//                                 value={parseInt(textboxSize.height, 10)}
//                                 onChange={(e) =>
//                                     setTextboxSize({
//                                         ...textboxSize,
//                                         height: `${e.target.value}px`,
//                                     })
//                                 }
//                                 style={{ marginLeft: '10px', width: '100%' }}
//                             />
//                         </label>
//                     </div>

//                     <div style={{ marginTop: '20px' }}>
//                         <button
//                             onClick={handleSave}
//                             style={{
//                                 padding: '10px 15px',
//                                 margin: '5px',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 backgroundColor: '#007bff',
//                                 color: 'white',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Save
//                         </button>
//                         <button
//                             onClick={() => setIsModalOpen(false)}
//                             style={{
//                                 padding: '10px 15px',
//                                 margin: '5px',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 backgroundColor: '#ccc',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                     </Modal>

//                 </>
//             )}

//             <input
//             type="checkbox"
//             checked={checkboxFlag} // This will ensure the checkbox is checked based on checkboxFlag
//             onChange={handleCheckboxChange}
//             style={{
//                 width: textboxSize.width,
//                 height: textboxSize.height,
//             }}
//             />
//             {/* Display the label next to the checkbox */}
//             <label style={{ marginLeft: '10px' }}>
//                 {checkboxLabel}
//             </label>
//         </div>
//     );
// };

// export default Checkbox;

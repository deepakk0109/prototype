// // src/components/SomeOtherComponent.js
// import React, { useState } from 'react';
// import DropdownSettingsModal from '../widgets/DropdownSettingsModel';
// const SomeOtherComponent = () => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = () => setModalIsOpen(true);
//   const closeModal = () => setModalIsOpen(false);

//   const updateDropdownWidget = (label, options, source, url, fontSize, widgetId) => {
//     // Implement logic to update the dropdown widget settings in this context
//     console.log('Updated Dropdown Settings:', { label, options, source, url, fontSize, widgetId });
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Open Dropdown Settings</button>

//       <DropdownSettingsModal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         updateDropdownWidget={updateDropdownWidget}
//         widgetId="some-widget-id"
//       />
//     </div>
//   );
// };

// export default SomeOtherComponent;



// // // src/components/ParentComponent.js
// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Dropdown } from '../widgets/Dropdown';
// // import { setDropdownOptions, setDropdownSource, setDropdownUrl, setDropdownFontSize, setLabel } from '../redux/slices/dropdownSlice';

// // const ParentComponent = () => {
// //   const dispatch = useDispatch();  
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [newOption, setNewOption] = useState('');

// //   // State from Redux
// //   const { dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, label } = useSelector((state) => state.dropdown);

// //   // Handler to open the modal
// //   const openSettingsModal = () => {
// //     setModalIsOpen(true);
// //   };

// //   // Handler to close the modal
// //   const closeSettingsModal = () => {
// //     setModalIsOpen(false);
// //   };

// //   // Handler to update the dropdown settings
// //   const updateDropdownSettings = (label, options, source, url, fontSize) => {
// //     dispatch(setLabel(label));
// //     dispatch(setDropdownOptions(options));
// //     dispatch(setDropdownSource(source));
// //     dispatch(setDropdownUrl(url));
// //     dispatch(setDropdownFontSize(fontSize));
// //   };

// //   return (
// //     <div>
// //       <button onClick={openSettingsModal}>Open Dropdown Settings</button>

// //       <Dropdown
// //         updateDropdownWidget={updateDropdownSettings}
// //         isConfig={true}
// //         widgetId={1} // Example widget ID
// //         Source={dropdownSource}
// //         Url={dropdownUrl}
// //         Options={dropdownOptions}
// //         FontSize={dropdownFontSize}
// //         Label={label}
// //       />


// //         <h2>Dropdown Settings</h2>
// //         <div style={{ marginBottom: '20px' }}>
// //           <label>Label:</label>
// //           <input
// //             type="text"
// //             value={label}
// //             onChange={(e) => dispatch(setLabel(e.target.value))}
// //             placeholder="Enter dropdown label"
// //             className="label-input"
// //           />
// //         </div>

// //         <div style={{ marginBottom: '20px' }}>
// //           <label>Font Size (enter with unit):</label>
// //           <input
// //             type="text"
// //             value={dropdownFontSize}
// //             onChange={(e) => dispatch(setDropdownFontSize(e.target.value))}
// //             placeholder="Enter font size"
// //             className="fontsize-input"
// //           />
// //         </div>

// //         <div style={{ marginTop: '20px' }}>
// //           <label>
// //             <input
// //               type="radio"
// //               value="manual"
// //               checked={dropdownSource === 'manual'}
// //               onChange={() => dispatch(setDropdownSource('manual'))}
// //             />
// //             Manual Entry
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="api"
// //               checked={dropdownSource === 'api'}
// //               onChange={() => dispatch(setDropdownSource('api'))}
// //             />
// //             From API
// //           </label>
// //         </div>

// //         {dropdownSource === 'api' && (
// //           <input
// //             type="text"
// //             value={dropdownUrl}
// //             onChange={(e) => dispatch(setDropdownUrl(e.target.value))}
// //             placeholder="Enter API URL"
// //             className="backend-input"
// //           />
// //         )}

// //         {dropdownSource === 'manual' && (
// //           <>
// //             {dropdownOptions.map((option) => (
// //               <div key={option.id} className="input-group">
// //                 <input
// //                   type="text"
// //                   placeholder="Dropdown Option"
// //                   value={option.value}
// //                   onChange={(e) =>
// //                     dispatch(
// //                       setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
// //                     )
// //                   }
// //                   className="input-field"
// //                 />
// //                 <button onClick={() => dispatch(setDropdownOptions(dropdownOptions.filter((opt) => opt.id !== option.id)))} className="remove-btn">
// //                   -
// //                 </button>
// //               </div>
// //             ))}
// //             <div className="add-input-group">
// //               <input
// //                 type="text"
// //                 value={newOption}
// //                 onChange={(e) => setNewOption(e.target.value)}
// //                 placeholder="Enter new option"
// //                 className="new-input-label"
// //               />
// //               <button onClick={() => dispatch(setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]))} className="add-btn">
// //                 +
// //               </button>
// //             </div>
// //           </>
// //         )}

// //         <div className="modal-actions">
// //           <button onClick={() => updateDropdownSettings(label, dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize)} className="confirm-btn">
// //             Save
// //           </button>
// //           <button onClick={closeSettingsModal} className="cancel-btn">
// //             Cancel
// //           </button>
// //         </div>

// //     </div>
// //   );
// // };

// // export default ParentComponent;

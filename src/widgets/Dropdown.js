import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import {
  setDropdownOptions,
  setDropdownSource,
  setDropdownUrl,
  setDropdownFontSize,
  setLabel,
} from '../redux/slices/dropdownSlice';
import '../styles/Dropdown.css';
import Modal from 'react-modal';
import { StyleModel } from './StyleModel';
import { setWidgetStyles } from '../redux/slices/dropdownSlice';

Modal.setAppElement('#root');

const Dropdown = ({ onClick,updateDropdownWidget, isConfig, widgetId, Source, Url, Options, FontSize, Label,Styles }) => {
  const dispatch = useDispatch();
  const dropdownState = useSelector((state) => state.dropdown[widgetId]) || {};

  const { dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, label,widgetStyles } = dropdownState;

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    dispatch(setDropdownOptions({ widgetId, options: Options || [] }));
    dispatch(setDropdownSource({ widgetId, source: Source || 'manual' }));
    dispatch(setDropdownUrl({ widgetId, url: Url || '' }));
    dispatch(setDropdownFontSize({ widgetId, fontSize: FontSize || '16px' }));
    dispatch(setLabel({ widgetId, label: Label || '' }));
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
  }, [Options, Source, Url, FontSize, Label, dispatch, widgetId,Styles]);

  useEffect(() => {
    if (dropdownSource === 'api' && dropdownUrl) {
      fetch(dropdownUrl)
        .then((response) => response.json())
        .then((data) => {
          const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
          dispatch(setDropdownOptions({ widgetId, options: apiOptions }));
        })
        .catch((error) => console.error('Error fetching dropdown data:', error));
    }
  }, [dropdownSource, dropdownUrl, dispatch, widgetId]);

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
            <DropdownSidebar
              updateDropdownWidget={updateDropdownWidget}
              widgetId={widgetId}
            />
          </Provider>
        </React.StrictMode>
      );
  };

  return (
    <div className="dropdown-container" onClick={()=>{onClick();toggleSettings()}} style={{...widgetStyles}}>
      {isConfig && (
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
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

      <label style={{ fontSize: dropdownFontSize }}>{label}</label>
      <select className="dropdown" style={{color:widgetStyles?.color, backgroundColor:widgetStyles?.backgroundColor, fontSize: dropdownFontSize }}>
        {dropdownOptions?.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};



const DropdownSidebar = ({ updateDropdownWidget, widgetId }) => {
  const dispatch = useDispatch();
  const dropdownState = useSelector((state) => state.dropdown[widgetId]) || {};
  const {
    dropdownOptions,
    dropdownSource,
    dropdownUrl,
    dropdownFontSize,
    label,
    widgetStyles,
  } = dropdownState;

  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    if (dropdownSource === 'api' && dropdownUrl) {
      fetch(dropdownUrl)
        .then((response) => response.json())
        .then((data) => {
          const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
          dispatch(setDropdownOptions({ widgetId, options: apiOptions }));
        })
        .catch((error) => console.error('Error fetching dropdown data:', error));
    }
  }, [dropdownSource, dropdownUrl, dispatch, widgetId]);

  const addDropdownOption = () => {
    dispatch(setDropdownOptions({ widgetId, options: [...dropdownOptions, { id: Date.now(), value: newOption }] }));
    setNewOption('');
  };

  const removeDropdownOption = (id) => {
    dispatch(setDropdownOptions({ widgetId, options: dropdownOptions.filter((option) => option.id !== id) }));
  };

  const handleSubmit = () => {
    updateDropdownWidget(label, dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, widgetId,widgetStyles);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openSettingsModal = () => {
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='dropdown-sidebar'>
      <h2>Dropdown</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => dispatch(setLabel({ widgetId, label: e.target.value }))}
          placeholder="Enter dropdown label"
          className="label-input"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Font Size (enter with unit):</label>
        <input
          type="text"
          value={dropdownFontSize}
          onChange={(e) => dispatch(setDropdownFontSize({ widgetId, fontSize: e.target.value }))}
          placeholder="Enter font size"
          className="fontsize-input"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="radio"
            value="manual"
            checked={dropdownSource === 'manual'}
            onChange={() => dispatch(setDropdownSource({ widgetId, source: 'manual' }))}
          />
          Manually Enter
        </label>
        <label>
          <input
            type="radio"
            value="api"
            checked={dropdownSource === 'api'}
            onChange={() => dispatch(setDropdownSource({ widgetId, source: 'api' }))}
          />
          From Api
        </label>
      </div>

      {dropdownSource === 'api' && (
        <div style={{ marginTop: '20px' }}>
          <label>API URL:</label>
          <input
            type="text"
            value={dropdownUrl}
            onChange={(e) => dispatch(setDropdownUrl({ widgetId, url: e.target.value }))}
            placeholder="Enter API URL"
            className="url-input"
          />
        </div>
      )}

      {dropdownSource === 'manual' && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>Options: </label>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Enter dropdown option"
              className="option-input"
            />
            <button onClick={addDropdownOption} className="add-option-btn"     style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '3px 10px', cursor: 'pointer' }}>+</button>
          </div>

          <ul className="option-list">
            {dropdownOptions.map((option) => (
              <li key={option.id}>
                {option.value}
                <button onClick={() => removeDropdownOption(option.id)} className="remove-option-btn"  style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>-</button>
              </li>
            ))}
          </ul>
        </>
      )}
       <div style={{ marginBottom: '10px' }}>Add styles  <button onClick={openSettingsModal}  style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '1px 10px', cursor: 'pointer' }}>+</button></div>
        <button onClick={()=>{handleSubmit(); closeSettingsModal()}}  style={{ backgroundColor: 'blue', borderRadius: '5px', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }} >
          Save
        </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
          },
          content: {
            top: '50%',
            right: '10px', // Distance from the right edge
            left: 'auto', // Remove left alignment
            bottom: 'auto',
            marginRight: '0', // No margin on the right
            transform: 'translateY(-50%)', // Center vertically
            width: '200px',
            pointerEvents: 'auto', // Enable pointer events for the modal content
            overflowY:'auto',
          },
        }}
      >
        <StyleModel widgetId={widgetId} setWidgetStyles={setWidgetStyles} state={dropdownState}/>
        <button onClick={()=>{handleSubmit(); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </Modal>


    </div>
  );
};


export { Dropdown,DropdownSidebar };


// // src/components/Dropdown.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import DropdownSettingsModal from './DropdownSettingsModal';
// import DropdownSettingsModal from './DropdownSettingsModel';
// import {
//   setDropdownOptions,
//   setDropdownSource,
//   setDropdownUrl,
//   setDropdownFontSize,
//   setLabel,
// } from '../redux/slices/dropdownSlice';

// const Dropdown = ({ updateDropdownWidget, isConfig, widgetId, Source, Url, Options, FontSize, Label }) => {
//   const dispatch = useDispatch();
//   const { dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, label } = useSelector((state) => state.dropdown);

//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   useEffect(() => {
//     dispatch(setDropdownOptions(Options || []));
//     dispatch(setDropdownSource(Source || 'manual'));
//     dispatch(setDropdownUrl(Url || ''));
//     dispatch(setDropdownFontSize(FontSize || '16px'));
//     dispatch(setLabel(Label || ''));
//   }, [Options, Source, Url, FontSize, Label, dispatch]);

//   useEffect(() => {
//     if (dropdownSource === 'api' && dropdownUrl) {
//       fetch(dropdownUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//           dispatch(setDropdownOptions(apiOptions));
//         })
//         .catch((error) => console.error('Error fetching dropdown data:', error));
//     }
//   }, [dropdownSource, dropdownUrl, dispatch]);

//   const openSettingsModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeSettingsModal = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="dropdown-container">
//       {isConfig && (
//         <button
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '20px',
//           }}
//           onClick={openSettingsModal}
//         >
//           ⚙️
//         </button>
//       )}

//       <label style={{ fontSize: dropdownFontSize }}>{label}</label>
//       <select className="dropdown" style={{ fontSize: dropdownFontSize }}>
//         {dropdownOptions.map((option) => (
//           <option key={option.id} value={option.value}>
//             {option.value}
//           </option>
//         ))}
//       </select>

//       <DropdownSettingsModal
//         isOpen={modalIsOpen}
//         onRequestClose={closeSettingsModal}
//         updateDropdownWidget={updateDropdownWidget}
//         widgetId={widgetId}
//       />
//     </div>
//   );
// };

// export { Dropdown };



// // src/components/Dropdown.js
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setDropdownOptions,
//   setDropdownSource,
//   setDropdownUrl,
//   setDropdownFontSize,
//   setLabel,
// } from '../redux/slices/dropdownSlice';

// Modal.setAppElement('#root');

// const Dropdown = ({ updateDropdownWidget, isConfig, widgetId, Source, Url, Options, FontSize, Label }) => {
//   const dispatch = useDispatch();

//   // Get state from Redux store
//   const {
//     dropdownOptions,
//     dropdownSource,
//     dropdownUrl,
//     dropdownFontSize,
//     label,
//   } = useSelector((state) => state.dropdown);

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [newOption, setNewOption] = useState('');

//   // Initialize state from props or Redux
//   useEffect(() => {
//     dispatch(setDropdownOptions(Options || []));
//     dispatch(setDropdownSource(Source || 'manual'));
//     dispatch(setDropdownUrl(Url || ''));
//     dispatch(setDropdownFontSize(FontSize || '16px'));
//     dispatch(setLabel(Label || ''));
//   }, [Options, Source, Url, FontSize, Label, dispatch]);

//   useEffect(() => {
//     if (dropdownSource === 'api' && dropdownUrl) {
//       fetch(dropdownUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//           dispatch(setDropdownOptions(apiOptions));
//         })
//         .catch((error) => console.error('Error fetching dropdown data:', error));
//     }
//   }, [dropdownSource, dropdownUrl, dispatch]);

//   const addDropdownOption = () => {
//     dispatch(setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]));
//     setNewOption('');
//   };

//   const removeDropdownOption = (id) => {
//     dispatch(setDropdownOptions(dropdownOptions.filter((option) => option.id !== id)));
//   };

//   const handleModalSubmit = () => {
//     if (dropdownSource === 'api' && dropdownUrl) {
//       fetch(dropdownUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//           dispatch(setDropdownOptions(apiOptions));
//         })
//         .catch((error) => console.error('Error fetching dropdown data:', error));
//     }

//     updateDropdownWidget(label, dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, widgetId);
//     closeSettingsModal();
//   };

//   const openSettingsModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeSettingsModal = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="dropdown-container">
//       {isConfig && (
//         <button
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '20px',
//           }}
//           onClick={openSettingsModal}
//         >
//           ⚙️
//         </button>
//       )}

//       <label style={{ fontSize: dropdownFontSize }}>{label}</label>
//       <select className="dropdown" style={{ fontSize: dropdownFontSize }}>
//         {dropdownOptions.map((option) => (
//           <option key={option.id} value={option.value}>
//             {option.value}
//           </option>
//         ))}
//       </select>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeSettingsModal}
//         contentLabel="Settings Modal"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '300px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <h2>Dropdown</h2>
//         <div style={{ marginBottom: '20px' }}>
//           <label>Label:</label>
//           <input
//             type="text"
//             value={label}
//             onChange={(e) => dispatch(setLabel(e.target.value))}
//             placeholder="Enter dropdown label"
//             className="label-input"
//           />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <label>Font Size(enter with unit):</label>
//           <input
//             type="text"
//             value={dropdownFontSize}
//             onChange={(e) => dispatch(setDropdownFontSize(e.target.value))}
//             placeholder="Enter font size"
//             className="fontsize-input"
//           />
//         </div>

//         <div style={{ marginTop: '20px' }}>
//           <label>
//             <input
//               type="radio"
//               value="manual"
//               checked={dropdownSource === 'manual'}
//               onChange={() => dispatch(setDropdownSource('manual'))}
//             />
//             Manual Entry
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="api"
//               checked={dropdownSource === 'api'}
//               onChange={() => dispatch(setDropdownSource('api'))}
//             />
//             From API
//           </label>
//         </div>

//         {dropdownSource === 'api' && (
//           <input
//             type="text"
//             value={dropdownUrl}
//             onChange={(e) => dispatch(setDropdownUrl(e.target.value))}
//             placeholder="Enter API URL"
//             className="backend-input"
//           />
//         )}

//         {dropdownSource === 'manual' && (
//           <>
//             {dropdownOptions.map((option) => (
//               <div key={option.id} className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Dropdown Option"
//                   value={option.value}
//                   onChange={(e) =>
//                     dispatch(
//                       setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
//                     )
//                   }
//                   className="input-field"
//                 />
//                 <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
//                   -
//                 </button>
//               </div>
//             ))}
//             <div className="add-input-group">
//               <input
//                 type="text"
//                 value={newOption}
//                 onChange={(e) => setNewOption(e.target.value)}
//                 placeholder="Enter new option"
//                 className="new-input-label"
//               />
//               <button onClick={addDropdownOption} className="add-btn">
//                 +
//               </button>
//             </div>
//           </>
//         )}

//         <div className="modal-actions">
//           <button onClick={handleModalSubmit} className="confirm-btn">
//             Save
//           </button>
//           <button onClick={closeSettingsModal} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export { Dropdown };




// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// // import '../styles/Dropdown.css';

// Modal.setAppElement('#root');

// const Dropdown = ({ updateDropdownWidget, isConfig,widgetId,Source,Url,Options,FontSize,Label }) => {
//   const [dropdownOptions, setDropdownOptions] = useState(Options || []);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [dropdownSource, setDropdownSource] = useState(Source || 'manual'); // 'manual' or 'api'
//   const [dropdownUrl, setDropdownUrl] = useState(Url || '');
//   const [dropdownFontSize, setDropdownFontSize] = useState(FontSize || '16px');
//   const [newOption, setNewOption] = useState('');
//   const [label, setLabel] = useState(Label || ''); // Label for the dropdown

//   useEffect(() => {
//     if (dropdownSource === 'api' && dropdownUrl) {
//       fetch(dropdownUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//           setDropdownOptions(apiOptions);
//         })
//         .catch((error) => console.error('Error fetching dropdown data:', error));
//     }
//   }, [dropdownSource, dropdownUrl]);

//   const addDropdownOption = () => {
//     setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]);
//     setNewOption('');
//   };

//   const removeDropdownOption = (id) => {
//     setDropdownOptions(dropdownOptions.filter((option) => option.id !== id));
//   };

//   const handleModalSubmit = () => {
//     if (dropdownSource === 'api' && dropdownUrl) {
//       fetch(dropdownUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//           setDropdownOptions(apiOptions);
//         })
//         .catch((error) => console.error('Error fetching dropdown data:', error));
//     }

//         updateDropdownWidget(label,dropdownOptions, dropdownSource,dropdownUrl,dropdownFontSize,widgetId);

//     closeSettingsModal();
//   };

//   const openSettingsModal = () => {
//     const node = document.createElement("div");

// // Create a text node:
// const textnode = document.createTextNode("Water");

// // Append the text node to the "li" node:
// node.appendChild(textnode);

// // Append the "li" node to the list:
//     document.getElementById("sidebar").appendChild(node);
//     setModalIsOpen(true);
//   };

//   const closeSettingsModal = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="dropdown-container">
//     { (isConfig &&<button
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '20px',
//         }}
//         onClick={openSettingsModal}
//       >
//         ⚙️
//       </button>
//     )}

//       <label style={{fontSize:dropdownFontSize}}>{label}</label>
//       <select className="dropdown" style={{fontSize:dropdownFontSize}}>
//         {dropdownOptions.map((option) => (
//           <option key={option.id} value={option.value}>
//             {option.value}
//           </option>
//         ))}
//       </select>

//       {/* Settings Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeSettingsModal}
//         contentLabel="Settings Modal"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '300px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <h2>Dropdown</h2>
//         <div style={{ marginBottom: '20px' }}>
//         <label>Label:</label>
//         <input
//           type="text"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           placeholder="Enter dropdown label"
//           className="label-input"
//         />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//         <label >Font Size(enter with unit):</label>
//         <input
//           type="text"
//           value={dropdownFontSize}
//           onChange={(e) => setDropdownFontSize(e.target.value)}
//           placeholder="Enter font size"
//           className="fontsize-input"
//         />
//         </div>

//         <div style={{ marginTop: '20px' }}>
//           <label>
//             <input
//               type="radio"
//               value="manual"
//               checked={dropdownSource === 'manual'}
//               onChange={() => setDropdownSource('manual')}
//             />
//             Manual Entry
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="api"
//               checked={dropdownSource === 'api'}
//               onChange={() => setDropdownSource('api')}
//             />
//             From API
//           </label>
//         </div>

//         {dropdownSource === 'api' && (
//           <input
//             type="text"
//             value={dropdownUrl}
//             onChange={(e) => setDropdownUrl(e.target.value)}
//             placeholder="Enter API URL"
//             className="backend-input"
//           />
//         )}

//         {dropdownSource === 'manual' && (
//           <>
//             {dropdownOptions.map((option) => (
//               <div key={option.id} className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Dropdown Option"
//                   value={option.value}
//                   onChange={(e) =>
//                     setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
//                   }
//                   className="input-field"
//                 />
//                 <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
//                   -
//                 </button>
//               </div>
//             ))}
//             <div className="add-input-group">
//               <input
//                 type="text"
//                 value={newOption}
//                 onChange={(e) => setNewOption(e.target.value)}
//                 placeholder="Enter new option"
//                 className="new-input-label"
//               />
//               <button onClick={addDropdownOption} className="add-btn">
//                 +
//               </button>
//             </div>
//           </>
//         )}

//         <div className="modal-actions">
//           <button onClick={handleModalSubmit} className="confirm-btn">
//             Save
//           </button>
//           <button onClick={closeSettingsModal} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </Modal>

//     </div>
//   );
// };

// export  {Dropdown};

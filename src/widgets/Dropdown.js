// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// // Dropdown Component
// const Dropdown = ({ updateDropdownWidget, isConfig,widgetId,Source,Url,Options,FontSize,Label }) => {
//     const [dropdownOptions, setDropdownOptions] = useState(Options || []);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [dropdownSource, setDropdownSource] = useState(Source || 'manual'); // 'manual' or 'api'
//     const [dropdownUrl, setDropdownUrl] = useState(Url || '');
//     const [dropdownFontSize, setDropdownFontSize] = useState(FontSize || '16px');
//     const [newOption, setNewOption] = useState('');
//     const [label, setLabel] = useState(Label || ''); // Label for the dropdown
  
//     useEffect(() => {
//       if (dropdownSource === 'api' && dropdownUrl) {
//         fetch(dropdownUrl)
//           .then((response) => response.json())
//           .then((data) => {
//             const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//             setDropdownOptions(apiOptions);
//           })
//           .catch((error) => console.error('Error fetching dropdown data:', error));
//       }
//     }, [dropdownSource, dropdownUrl]);
  
//     const addDropdownOption = () => {
//       setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]);
//       setNewOption('');
//     };
  
//     const removeDropdownOption = (id) => {
//       setDropdownOptions(dropdownOptions.filter((option) => option.id !== id));
//     };
  
//     const handleModalSubmit = () => {debugger
//       if (dropdownSource === 'api' && dropdownUrl) {
//         fetch(dropdownUrl)
//           .then((response) => response.json())
//           .then((data) => {
//             const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
//             setDropdownOptions(apiOptions);
//           })
//           .catch((error) => console.error('Error fetching dropdown data:', error));
//       }
  
//           updateDropdownWidget(label,dropdownOptions, dropdownSource,dropdownUrl,dropdownFontSize,widgetId);
  
//       closeSettingsModal();
//     };
  
//     const openSettingsModal = () => {
//       setModalIsOpen(true);
//     };
  
//     const closeSettingsModal = () => {
//       setModalIsOpen(false);
//     };
  
//     return (
//       <div className="dropdown-container">
//       { (isConfig &&<button
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
  
//         <label style={{fontSize:dropdownFontSize}}>{label}</label>
//         <select className="dropdown" style={{fontSize:dropdownFontSize}}>
//           {dropdownOptions.map((option) => (
//             <option key={option.id} value={option.value}>
//               {option.value}
//             </option>
//           ))}
//         </select>
  
//         {/* Settings Modal */}
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeSettingsModal}
//           contentLabel="Settings Modal"
//           style={{
//             content: {
//               top: '50%',
//               left: '50%',
//               right: 'auto',
//               bottom: 'auto',
//               marginRight: '-50%',
//               transform: 'translate(-50%, -50%)',
//               padding: '20px',
//               width: '300px',
//               textAlign: 'center',
//             },
//           }}
//         >
//           <h2>Dropdown</h2>
//           <div style={{ marginBottom: '20px' }}>
//           <label>Label:</label>
//           <input
//             type="text"
//             value={label}
//             onChange={(e) => setLabel(e.target.value)}
//             placeholder="Enter dropdown label"
//             className="label-input"
//           />
//           </div>
  
//           <div style={{ marginBottom: '20px' }}>
//           <label >Font Size(enter with unit):</label>
//           <input
//             type="text"
//             value={dropdownFontSize}
//             onChange={(e) => setDropdownFontSize(e.target.value)}
//             placeholder="Enter font size"
//             className="fontsize-input"
//           />
//           </div>
  
//           <div style={{ marginTop: '20px' }}>
//             <label>
//               <input
//                 type="radio"
//                 value="manual"
//                 checked={dropdownSource === 'manual'}
//                 onChange={() => setDropdownSource('manual')}
//               />
//               Manual Entry
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="api"
//                 checked={dropdownSource === 'api'}
//                 onChange={() => setDropdownSource('api')}
//               />
//               From API
//             </label>
//           </div>
  
//           {dropdownSource === 'api' && (
//             <input
//               type="text"
//               value={dropdownUrl}
//               onChange={(e) => setDropdownUrl(e.target.value)}
//               placeholder="Enter API URL"
//               className="backend-input"
//             />
//           )}
  
//           {dropdownSource === 'manual' && (
//             <>
//               {dropdownOptions.map((option) => (
//                 <div key={option.id} className="input-group">
//                   <input
//                     type="text"
//                     placeholder="Dropdown Option"
//                     value={option.value}
//                     onChange={(e) =>
//                       setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
//                     }
//                     className="input-field"
//                   />
//                   <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
//                     -
//                   </button>
//                 </div>
//               ))}
//               <div className="add-input-group">
//                 <input
//                   type="text"
//                   value={newOption}
//                   onChange={(e) => setNewOption(e.target.value)}
//                   placeholder="Enter new option"
//                   className="new-input-label"
//                 />
//                 <button onClick={addDropdownOption} className="add-btn">
//                   +
//                 </button>
//               </div>
//             </>
//           )}
  
//           <div className="modal-actions">
//             <button onClick={handleModalSubmit} className="confirm-btn">
//               Save
//             </button>
//             <button onClick={closeSettingsModal} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </Modal>
//       </div>
//     );
//   };
// // DropdownSidebar Component
// const DropdownSidebar = ({
//   label,
//   setLabel,
//   dropdownOptions,
//   setDropdownOptions,
//   dropdownSource,
//   setDropdownSource,
//   dropdownUrl,
//   setDropdownUrl,
//   dropdownFontSize,
//   setDropdownFontSize,
//   updateDropdownWidget,
// }) => {
//   const addDropdownOption = (newOption) => {
//     setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]);
//   };

//   const removeDropdownOption = (id) => {
//     setDropdownOptions(dropdownOptions.filter((option) => option.id !== id));
//   };

//   return (
//     <>
//       <h2>Dropdown</h2>
//       <div style={{ marginBottom: '20px' }}>
//         <label>Label:</label>
//         <input
//           type="text"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           placeholder="Enter dropdown label"
//           className="label-input"
//         />
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Font Size (enter with unit):</label>
//         <input
//           type="text"
//           value={dropdownFontSize}
//           onChange={(e) => setDropdownFontSize(e.target.value)}
//           placeholder="Enter font size"
//           className="fontsize-input"
//         />
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             value="manual"
//             checked={dropdownSource === 'manual'}
//             onChange={() => setDropdownSource('manual')}
//           />
//           Manual Entry
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="api"
//             checked={dropdownSource === 'api'}
//             onChange={() => setDropdownSource('api')}
//           />
//           From API
//         </label>
//       </div>

//       {dropdownSource === 'api' && (
//         <input
//           type="text"
//           value={dropdownUrl}
//           onChange={(e) => setDropdownUrl(e.target.value)}
//           placeholder="Enter API URL"
//           className="backend-input"
//         />
//       )}

//       {dropdownSource === 'manual' && (
//         <>
//           {dropdownOptions.map((option) => (
//             <div key={option.id} className="input-group">
//               <input
//                 type="text"
//                 placeholder="Dropdown Option"
//                 value={option.value}
//                 onChange={(e) =>
//                   setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
//                 }
//                 className="input-field"
//               />
//               <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
//                 -
//               </button>
//             </div>
//           ))}
//           <div className="add-input-group">
//             <input
//               type="text"
//               onChange={(e) => addDropdownOption(e.target.value)}
//               placeholder="Enter new option"
//               className="new-input-label"
//             />
//             <button className="add-btn">+</button>
//           </div>
//         </>
//       )}

//       <div className="modal-actions">
//         <button
//           onClick={() => updateDropdownWidget(label, dropdownOptions, dropdownSource, dropdownUrl, dropdownFontSize, 1)}
//           className="confirm-btn"
//         >
//           Save
//         </button>
//       </div>
//     </>
//   );
// };

// // DropdownContainer Component (Parent Component)
// const DropdownContainer = () => {
// //   const [label, setLabel] = useState('');
// //   const [dropdownOptions, setDropdownOptions] = useState([]);
// //   const [dropdownSource, setDropdownSource] = useState('manual');
// //   const [dropdownUrl, setDropdownUrl] = useState('');
// //   const [dropdownFontSize, setDropdownFontSize] = useState('16px');
//   const{label,dropdownOptions,dropdownSource,dropdownUrl,dropdownFontSize,updateDropdownWidget,setLabel,setDropdownOptions,setDropdownSource,setDropdownUrl,setDropdownFontSize}=Dropdown();

// //   const updateDropdownWidget = (newLabel, options, source, url, fontSize, widgetId) => {
// //     setLabel(newLabel);
// //     setDropdownOptions(options);
// //     setDropdownSource(source);
// //     setDropdownUrl(url);
// //     setDropdownFontSize(fontSize);
// //   };

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* <Dropdown
//         updateDropdownWidget={updateDropdownWidget}
//         isConfig={true}
//         widgetId={1}
//         Source={dropdownSource}
//         Url={dropdownUrl}
//         Options={dropdownOptions}
//         FontSize={dropdownFontSize}
//         Label={label}
//       /> */}
//       <DropdownSidebar
//         label={label}
//         setLabel={setLabel}
//         dropdownOptions={dropdownOptions}
//         setDropdownOptions={setDropdownOptions}
//         dropdownSource={dropdownSource}
//         setDropdownSource={setDropdownSource}
//         dropdownUrl={dropdownUrl}
//         setDropdownUrl={setDropdownUrl}
//         dropdownFontSize={dropdownFontSize}
//         setDropdownFontSize={setDropdownFontSize}
//         updateDropdownWidget={updateDropdownWidget}
//       />
//     </div>
//   );
// };

// // Exporting all components
// export { Dropdown, DropdownSidebar, DropdownContainer };




import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// import '../styles/Dropdown.css';

Modal.setAppElement('#root');

const Dropdown = ({ updateDropdownWidget, isConfig,widgetId,Source,Url,Options,FontSize,Label }) => {
  const [dropdownOptions, setDropdownOptions] = useState(Options || []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dropdownSource, setDropdownSource] = useState(Source || 'manual'); // 'manual' or 'api'
  const [dropdownUrl, setDropdownUrl] = useState(Url || '');
  const [dropdownFontSize, setDropdownFontSize] = useState(FontSize || '16px');
  const [newOption, setNewOption] = useState('');
  const [label, setLabel] = useState(Label || ''); // Label for the dropdown

  useEffect(() => {
    if (dropdownSource === 'api' && dropdownUrl) {
      fetch(dropdownUrl)
        .then((response) => response.json())
        .then((data) => {
          const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
          setDropdownOptions(apiOptions);
        })
        .catch((error) => console.error('Error fetching dropdown data:', error));
    }
  }, [dropdownSource, dropdownUrl]);

  const addDropdownOption = () => {
    setDropdownOptions([...dropdownOptions, { id: Date.now(), value: newOption }]);
    setNewOption('');
  };

  const removeDropdownOption = (id) => {
    setDropdownOptions(dropdownOptions.filter((option) => option.id !== id));
  };

  const handleModalSubmit = () => {debugger
    if (dropdownSource === 'api' && dropdownUrl) {
      fetch(dropdownUrl)
        .then((response) => response.json())
        .then((data) => {
          const apiOptions = data.map((item, index) => ({ id: index, value: item.value || item }));
          setDropdownOptions(apiOptions);
        })
        .catch((error) => console.error('Error fetching dropdown data:', error));
    }

        updateDropdownWidget(label,dropdownOptions, dropdownSource,dropdownUrl,dropdownFontSize,widgetId);

    closeSettingsModal();
  };

  const openSettingsModal = () => {
    const node = document.createElement("div");

// Create a text node:
const textnode = document.createTextNode("Water");

// Append the text node to the "li" node:
node.appendChild(textnode);

// Append the "li" node to the list:
    document.getElementById("sidebar").appendChild(node);
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="dropdown-container">
    { (isConfig &&<button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
        }}
        onClick={openSettingsModal}
      >
        ⚙️
      </button>
    )}

      <label style={{fontSize:dropdownFontSize}}>{label}</label>
      <select className="dropdown" style={{fontSize:dropdownFontSize}}>
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>

      {/* Settings Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '300px',
            textAlign: 'center',
          },
        }}
      >
        <h2>Dropdown</h2>
        <div style={{ marginBottom: '20px' }}>
        <label>Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter dropdown label"
          className="label-input"
        />
        </div>

        <div style={{ marginBottom: '20px' }}>
        <label >Font Size(enter with unit):</label>
        <input
          type="text"
          value={dropdownFontSize}
          onChange={(e) => setDropdownFontSize(e.target.value)}
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
              onChange={() => setDropdownSource('manual')}
            />
            Manual Entry
          </label>
          <label>
            <input
              type="radio"
              value="api"
              checked={dropdownSource === 'api'}
              onChange={() => setDropdownSource('api')}
            />
            From API
          </label>
        </div>

        {dropdownSource === 'api' && (
          <input
            type="text"
            value={dropdownUrl}
            onChange={(e) => setDropdownUrl(e.target.value)}
            placeholder="Enter API URL"
            className="backend-input"
          />
        )}

        {dropdownSource === 'manual' && (
          <>
            {dropdownOptions.map((option) => (
              <div key={option.id} className="input-group">
                <input
                  type="text"
                  placeholder="Dropdown Option"
                  value={option.value}
                  onChange={(e) =>
                    setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
                  }
                  className="input-field"
                />
                <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
                  -
                </button>
              </div>
            ))}
            <div className="add-input-group">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Enter new option"
                className="new-input-label"
              />
              <button onClick={addDropdownOption} className="add-btn">
                +
              </button>
            </div>
          </>
        )}

        <div className="modal-actions">
          <button onClick={handleModalSubmit} className="confirm-btn">
            Save
          </button>
          <button onClick={closeSettingsModal} className="cancel-btn">
            Cancel
          </button>
        </div>
      </Modal>
      
    </div>
  );
};

export  {Dropdown};

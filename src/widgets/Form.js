// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFile, setFileBackendUrl, setUploadButtonStyle } from '../redux/slices/fileSlice';
// import '../styles/SidebarStyles.css'; // CSS for the sidebar

// function File({ updateFileWidget, isConfig, ButtonsStyle, widgetId, BackendUrl }) {
//   const dispatch = useDispatch();
//   const fileState = useSelector((state) => state.file[widgetId]) || {};
//   const { file, fileBackendUrl, uploadButtonStyle = {} } = fileState; // Ensure uploadButtonStyle has a default empty object

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
//   const [styleSettings, setStyleSettings] = useState({
//     ...uploadButtonStyle,
//     height: uploadButtonStyle.height || '',
//     width: uploadButtonStyle.width || '',
//     backgroundColor: uploadButtonStyle.backgroundColor || '#007bff',
//     fontSize: uploadButtonStyle.fontSize || '16px',
//     padding: uploadButtonStyle.padding || '10px 15px',
//     margin: uploadButtonStyle.margin || '10px',
//   });

//   useEffect(() => {
//     dispatch(setFileBackendUrl({ widgetId, fileBackendUrl: BackendUrl || '' }));
//     dispatch(setUploadButtonStyle({
//       widgetId, 
//       uploadButtonStyle: ButtonsStyle || {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px 15px',
//         border: 'none',
//         borderRadius: '5px',
//       },
//     }));
//   }, [ButtonsStyle, widgetId, BackendUrl, dispatch]);

//   function handleChange(event) {
//     dispatch(setFile({ widgetId, file: event.target.files[0] }));
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (!fileBackendUrl) {
//       alert('Please provide a backend URL.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     fetch(fileBackendUrl, {
//       method: 'POST',
//       body: formData,
//       headers: { 'Accept': 'application/json' },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           console.log('Upload successful:', data);
//         } else {
//           console.error('Upload failed:', data.message);
//           alert(`Upload failed: ${data.message}`);
//         }
//       })
//       .catch((error) => {
//         console.error('Error uploading file:', error);
//         alert('Error uploading file. Please check the console for details.');
//       });
//   }

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleStyleChange = (property, value) => {
//     const updatedStyles = { ...styleSettings, [property]: value };
//     setStyleSettings(updatedStyles);
//     dispatch(setUploadButtonStyle({ widgetId, uploadButtonStyle: updatedStyles }));
//   };

//   return (
//     <div className="file-container">
//       {isConfig && (
//         <button className="settings-button" onClick={toggleSidebar}>
//           ⚙️
//         </button>
//       )}

//       <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
//         <input type="file" onChange={handleChange} style={{ marginRight: '10px' }} />
//         {file && (
//           <button
//             type="submit"
//             style={{ ...styleSettings, marginLeft: '10px' }}
//           >
//             Upload
//           </button>
//         )}
//       </form>

//       {isSidebarOpen && (
//         <div className="sidebar">
//           <h3>Style Settings</h3>
//           <div className="style-row">
//             <label>Height:</label>
//             <input
//               type="text"
//               value={styleSettings.height}
//               onChange={(e) => handleStyleChange('height', e.target.value)}
//             />
//           </div>
//           <div className="style-row">
//             <label>Width:</label>
//             <input
//               type="text"
//               value={styleSettings.width}
//               onChange={(e) => handleStyleChange('width', e.target.value)}
//             />
//           </div>
//           <div className="style-row">
//             <label>Background Color:</label>
//             <input
//               type="color"
//               value={styleSettings.backgroundColor}
//               onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
//             />
//           </div>
//           <div className="style-row">
//             <label>Font Size:</label>
//             <input
//               type="number"
//               value={styleSettings.fontSize}
//               onChange={(e) => handleStyleChange('fontSize', e.target.value)}
//             />
//           </div>
//           <div className="style-row">
//             <label>Padding:</label>
//             <input
//               type="text"
//               value={styleSettings.padding}
//               onChange={(e) => handleStyleChange('padding', e.target.value)}
//             />
//           </div>
//           <div className="style-row">
//             <label>Margin:</label>
//             <input
//               type="text"
//               value={styleSettings.margin}
//               onChange={(e) => handleStyleChange('margin', e.target.value)}
//             />
//           </div>
//           <button className="close-sidebar" onClick={toggleSidebar}>Close Sidebar</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export  {File};












import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/Form.css'
import { useLocation } from 'react-router-dom';

// Set up the modal root element
Modal.setAppElement('#root');

const Form = ({updateFormWidget,widgetId,formInputs,formBackendLink,isPreview}) => {
    const location = useLocation();
    const isConfig = location.pathname === '/configurations';
  const [inputs, setInputs] = useState(formInputs || []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [formActionModalIsOpen, setFormActionModalIsOpen] = useState(false);
  const [formAction, setFormAction] = useState('');
  const [backendLink, setBackendLink] = useState(formBackendLink | '');
  const [newLabel, setNewLabel] = useState('');
console.log("backend link",formBackendLink);
  const addInput = () => {
    setInputs([...inputs, { id: Date.now(), label: newLabel, value: '' }]);
    setNewLabel(''); // Clear label input after adding
  };

  const removeInput = (id) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  const handleInputChange = (id, value) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, value } : input
    ));
  };

  const handleSubmit = () => {
    // setFormActionModalIsOpen(true);
    console.log('Form Data:', inputs);
    console.log('Submit to:', backendLink);
  };

  const handleModalSubmit = () => {debugger
    // setFormActionModalIsOpen(false);
    console.log('Form Data:', inputs);
    console.log('Submit to:', backendLink);
    if (updateFormWidget) {
        updateFormWidget(inputs, backendLink, widgetId); // Call the passed function
      }
    closeSettingsModal();
    // Add your API call here using the backendLink
  };

  const openSettingsModal = () => {
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="form-container" style={{height:'100%',width:'100%'}}>
        {isConfig &&(
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
                 onClick={openSettingsModal}
               >
                 ⚙️
               </button>
        )}
      <h3>Form</h3>
      {inputs.map((input) => (
        <div key={input.id} className="input-group">
          <label>{input.label}</label>
          <input
            type="text"
            placeholder={input.label}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="input-field"
          />
          { !isPreview &&(<button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
          )}
        </div>
      ))}

    { !isPreview &&(  <div className="add-input-group">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter label for new input"
          className="new-input-label"
        />
        <button
          onClick={addInput}
          className="add-btn"
        >
          +
        </button>
      </div>
    )}

      <button
        onClick={handleSubmit}
        className="submit-btn"
      >
        Submit
      </button>

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
        <h2>Form</h2>
        <label>Backend URL(To save form data):</label>
        <input
          type="text"
          value={backendLink}
          onChange={(e) => setBackendLink(e.target.value)}
          placeholder="Enter backend URL"
          className="backend-input"
        />
        <div className="modal-actions">
          <button
            onClick={handleModalSubmit}
            className="confirm-btn"
          >
            Submit
          </button>
          <button
            onClick={closeSettingsModal}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Form;

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

  const handleModalSubmit = () => {
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
      <h4>Reach out to us</h4>
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

const FormSidebar=()=>{

}
export default Form;

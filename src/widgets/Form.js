import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../styles/Form.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setFormSubmitUrl, setFormInputs,setWidgetStyles} from '../redux/slices/formSlice'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
// Set up the modal root element
Modal.setAppElement('#root');

const Form = ({ onClick,updateFormWidget, widgetId, Inputs, formBackendLink, isPreview }) => {
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';
  const dispatch=useDispatch();
  const formState=useSelector((state) => state.form[widgetId]) || {};
  const {formInputs,formSubmitUrl,widgetStyles}=formState;
  useEffect(() => {
    dispatch(setFormInputs({ widgetId, formInputs: Inputs || []}));
    dispatch(setFormSubmitUrl({ widgetId, formSubmitUrl: formBackendLink || '' }));
  }, [Inputs, widgetId, formBackendLink, dispatch]);

  const handleInputChange = (id, value) => {
    dispatch(setFormInputs({ widgetId, formInputs:formInputs.map(input =>
      input.id === id ? { ...input, value } : input
    )}));
  };


  const handleSubmit = () => {
    // setFormActionModalIsOpen(true);
    console.log('Form Data:', formInputs);
    console.log('Submit to:', formSubmitUrl);
  };


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
            <FormSidebar
              updateFormWidget={updateFormWidget}
              widgetId={widgetId}
            />
          </Provider>
        </React.StrictMode>
      );
  };
  return (
    <div onClick={()=>{onClick(); toggleSettings()}} className="form-container" style={{ height: '100%', width: '100%' }}>
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
      <div style={{fontWeight:'bold'}}>Reach out to us</div>
      {/* Display Refined Form */}
      {formInputs?.map((input) => (
        <div key={input.id} className="input-group">
          <label>{input.label}</label>
          {input.type === 'text' && (
            <input
              type="text"
              placeholder={input.label}
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className="input-field"
            />
          )}
          {input.type === 'textarea' && (
            <textarea
              placeholder={input.label}
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className="input-field"
            />
          )}
          {input.type === 'dropdown' && (
            <select
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className="input-field"
            >
              {input.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {input.type === 'radio' && (
            <div className="radio-group">
              {input.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`radio-group-${input.id}`}
                    value={option}
                    checked={input.value === option}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {input.type === 'file' && (
            <input
              type="file"
              onChange={(e) => handleInputChange(input.id, e.target.files[0])}
              className="input-field"
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit} className="confirm-btn">Submit</button>
      {/* Settings Modal */}

    </div>
  );
};

const FormSidebar=({updateFormWidget, widgetId, Inputs, formBackendLink, isPreview})=>{
  const dispatch=useDispatch();
  const formState=useSelector((state) => state.form[widgetId]) || {};
  const {formInputs,formSubmitUrl,widgetStyles}=formState;
  // const [inputs, setInputs] = useState(formInputs || []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [backendLink, setBackendLink] = useState(formBackendLink || '');
  const [newLabel, setNewLabel] = useState('');
  const [newInputType, setNewInputType] = useState('text');
  const [newOptions, setNewOptions] = useState(''); // For dropdown and radio options
  const [newFileType, setNewFileType] = useState(''); // For file upload types
  
  const inputTypes = ['text', 'textarea', 'dropdown', 'radio', 'file'];

  const addInput = () => {
    const inputConfig = {
      id: Date.now(),
      label: newLabel,
      type: newInputType,
      value: '',
      options: newOptions.split(','), // Convert options string to array
      fileType: newFileType,
    };
    // setInputs([...formInputs, inputConfig]);
    console.log("formInputs",formInputs);
    dispatch(setFormInputs({widgetId,formInputs:[...formInputs, inputConfig]}))
    setNewLabel('');
    setNewInputType('text');
    setNewOptions('');
    setNewFileType('');
  };

  const removeInput = (id) => {
    dispatch(setFormInputs({ widgetId, formInputs:formInputs.filter(input => input.id !== id)}));
  };

  const handleInputChange = (id, value) => {
    dispatch(setFormInputs({ widgetId, formInputs:formInputs.map(input =>
      input.id === id ? { ...input, value } : input
    )}));
  };

  const handleOptionChange = (id, option) => {
    dispatch(setFormInputs({ widgetId, formInputs:formInputs.map(input =>
      input.id === id ? { ...input, options: option.split(',') } : input
    )}));
  };

  const handleFileTypeChange = (id, fileType) => {
    dispatch(setFormInputs({ widgetId, formInputs:formInputs.map(input =>
      input.id === id ? { ...input, fileType } : input
    )}));
  };


  const handleSubmit = () => {
    // setFormActionModalIsOpen(true);
    console.log('Form Data:', formInputs);
    console.log('Submit to:', formSubmitUrl);
  };

  const handleModalSubmit = () => {debugger
    // setFormActionModalIsOpen(false);
    console.log('Form Data:', formInputs);
    console.log('Submit to:', formSubmitUrl);
    if (updateFormWidget) {
        updateFormWidget(formInputs, formSubmitUrl, widgetId); // Call the passed function
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
 return(
  <div style={{padding:'10px'}}>
  <h2>Edit Form</h2>
  <div >
    <label>Backend URL (To save form data):</label>
    <input
      type="text"
      value={formSubmitUrl}
      onChange={(e) =>{ dispatch(setFormSubmitUrl({ widgetId, formSubmitUrl:e.target.value}))}}
      placeholder="Enter backend URL"
      className="backend-input"
    />

  {formInputs?.map((input) => (
    <div key={input.id} className="input-group">
      <label>{input.label}</label>
      {input.type === 'text' && (
        <>
          <input
            type="text"
            placeholder={input.label}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="input-field"
            readOnly={isPreview}
          />
          <button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
        </>
      )}
      {input.type === 'textarea' && (
        <>
          <textarea
            placeholder={input.label}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="input-field"
            readOnly={isPreview}
          />
          <button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
        </>
      )}
      {input.type === 'dropdown' && (
        <>
          <select
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="input-field"
            disabled={isPreview}
          >
            {input.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
        </>
      )}
      {input.type === 'radio' && (
        <div className="radio-group">
          {input.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`radio-group-${input.id}`}
                value={option}
                checked={input.value === option}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                disabled={isPreview}
              />
              {option}
            </label>
          ))}
          <button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
        </div>
      )}
      {input.type === 'file' && (
        <>
          <input
            type="file"
            onChange={(e) => handleInputChange(input.id, e.target.files[0])}
            className="input-field"
            disabled={isPreview}
          />
          <button
            onClick={() => removeInput(input.id)}
            className="remove-btn"
          >
            -
          </button>
        </>
      )}
    </div>
  ))}


    <div className="add-input-group">
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="Enter label for new input"
        className="new-input-label"
      />
      <select
        value={newInputType}
        onChange={(e) => setNewInputType(e.target.value)}
        className="input-type-select"
      >
        {inputTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {newInputType === 'dropdown' || newInputType === 'radio' ? (
        <input
          type="text"
          value={newOptions}
          onChange={(e) => setNewOptions(e.target.value)}
          placeholder="Enter options separated by commas"
          className="new-options-input"
        />
      ) : null}
      {newInputType === 'file' ? (
        <select
          value={newFileType}
          onChange={(e) => setNewFileType(e.target.value)}
          className="file-type-select"
        >
          <option value="">Select file type</option>
          <option value="image">Image</option>
          <option value="document">Document</option>
          <option value="video">Video</option>
        </select>
      ) : null}
      <button
        onClick={addInput}
        className="add-btn"
      >
        +
      </button>
    </div>
    <div className="modal-actions">
      <button
        onClick={handleModalSubmit}
        className="confirm-btn"
      >
        Save
      </button>
      {/* <button
        onClick={closeSettingsModal}
        className="cancel-btn"
      >
        Cancel
      </button> */}
    </div>
  </div>
  </div>
 )
}
export default Form;

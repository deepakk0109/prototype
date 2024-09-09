import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/FormBuilder.css';  // Import the CSS file

// Component to render and edit individual form fields
const FormField = ({ field, onUpdate, onRemove }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onUpdate({ ...field, [name]: value });
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...field.options];
    newOptions[index] = event.target.value;
    onUpdate({ ...field, options: newOptions });
  };

  return (
    <div className="form-field">
      <button className="remove-field" type="button" onClick={onRemove}>Remove Field</button>
      <div className="field-group">
        <label>
          Label:
          <input
            type="text"
            name="label"
            value={field.label}
            onChange={handleChange}
            placeholder="Enter label"
            className="input-field"
          />
        </label>
      </div>
      <div className="field-group">
        <label>
          Placeholder:
          <input
            type="text"
            name="placeholder"
            value={field.placeholder}
            onChange={handleChange}
            placeholder="Enter placeholder"
            className="input-field"
          />
        </label>
      </div>
      {field.type === 'dropdown' && (
        <div className="field-group">
          <label>Type: Dropdown</label>
          <div>
            {field.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                  className="input-field"
                />
              </div>
            ))}
            <button
              className="add-option"
              type="button"
              onClick={() => onUpdate({ ...field, options: [...field.options, ''] })}
            >
              Add Option
            </button>
          </div>
        </div>
      )}
      {field.type === 'radio' && (
        <div className="field-group">
          <label>Type: Radio Buttons</label>
          <div>
            {field.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                  className="input-field"
                />
              </div>
            ))}
            <button
              className="add-option"
              type="button"
              onClick={() => onUpdate({ ...field, options: [...field.options, ''] })}
            >
              Add Option
            </button>
          </div>
        </div>
      )}
      {field.type === 'checkbox' && (
        <div className="field-group">
          <label>Type: Checkboxes</label>
          <div>
            {field.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                  className="input-field"
                />
              </div>
            ))}
            <button
              className="add-option"
              type="button"
              onClick={() => onUpdate({ ...field, options: [...field.options, ''] })}
            >
              Add Option
            </button>
          </div>
        </div>
      )}
      {field.type === 'multiple-choice' && (
        <div className="field-group">
          <label>Type: Multiple Choice</label>
          <div>
            {field.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                  className="input-field"
                />
              </div>
            ))}
            <button
              className="add-option"
              type="button"
              onClick={() => onUpdate({ ...field, options: [...field.options, ''] })}
            >
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component to render the preview of the built form
const PreviewForm = ({ fields }) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            <input type="text" placeholder={field.placeholder} />
          </div>
        );
      case 'textarea':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            <textarea placeholder={field.placeholder} />
          </div>
        );
      case 'dropdown':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            <select>
              {field.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index}>
                <input type="radio" id={`radio-${field.id}-${index}`} name={field.id} value={option} />
                <label htmlFor={`radio-${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index}>
                <input type="checkbox" id={`checkbox-${field.id}-${index}`} value={option} />
                <label htmlFor={`checkbox-${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'multiple-choice':
        return (
          <div className="form-preview-field" key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index}>
                <input type="radio" id={`mc-${field.id}-${index}`} name={field.id} value={option} />
                <label htmlFor={`mc-${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-preview">
      <h2>Form Preview</h2>
      {fields.map(renderField)}
    </div>
  );
};

// Main Form Builder Component
const FormBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: '',
      options: type === 'multiple-choice' ? [''] : [],
      placeholder: '',
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updatedField) => {
    setFields(fields.map(field => (field.id === id ? updatedField : field)));
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', fields);
  };

  return (
    <div className="form-builder">
      <h2>Form Builder</h2>
      <div className="button-group">
        <button className="add-field-button" onClick={() => addField('text')}>Add Text Field</button>
        <button className="add-field-button" onClick={() => addField('textarea')}>Add Text Area</button>
        <button className="add-field-button" onClick={() => addField('dropdown')}>Add Dropdown</button>
        <button className="add-field-button" onClick={() => addField('radio')}>Add Radio Buttons</button>
        <button className="add-field-button" onClick={() => addField('checkbox')}>Add Checkboxes</button>
        <button className="add-field-button" onClick={() => addField('multiple-choice')}>Add Multiple Choice</button>
      </div>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            onUpdate={(updatedField) => updateField(field.id, updatedField)}
            onRemove={() => removeField(field.id)}
          />
        ))}
        <button className="submit-form" type="submit">Submit Form</button>
      </form>
      <PreviewForm fields={fields} />
    </div>
  );
};
export {FormBuilder,PreviewForm}
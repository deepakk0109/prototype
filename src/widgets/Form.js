import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Form = ({ value, onChange }) => {
  const [textBoxContent, setTextBoxContent] = useState(value || '');
  const [displayOption, setDisplayOption] = useState('manual');
  const [fontWeight, setFontWeight] = useState('normal');
  const [textAlign, setTextAlign] = useState('left');
  const [fontSize, setFontSize] = useState('medium');
  const [apiendpoint, setApiendpoint] = useState('');
  const [formFields, setFormFields] = useState([{ name: '', value: '' }]);
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  const handleSave = (event) => {
    event.preventDefault();
    const finalContent = displayOption === 'api' ? apiendpoint : textBoxContent;
    if (onChange && typeof onChange === 'function') {
      onChange({ target: { value: finalContent } });
    }
  };

  const handleAddField = () => {
    setFormFields([...formFields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFields);
  };

  const handleFieldChange = (index, event) => {
    const newFields = formFields.map((field, i) => 
      i === index ? { ...field, [event.target.name]: event.target.value } : field
    );
    setFormFields(newFields);
  };

  return (
    <div style={{ padding: '20px', width: '400px', maxHeight: '80vh', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h2>Form Configuration</h2>

      <form onSubmit={handleSave}>
        {formFields.map((field, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              value={field.name}
              placeholder="Field Name"
              onChange={(e) => handleFieldChange(index, e)}
              style={{ marginRight: '10px', padding: '5px', width: '40%' }}
            />
            <input
              type="text"
              name="value"
              value={field.value}
              placeholder="Field Value"
              onChange={(e) => handleFieldChange(index, e)}
              style={{ padding: '5px', width: '40%' }}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddField} style={{ marginBottom: '10px' }}>
          Add Field
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px 10px' }}
            onClick={() => {
              setFormFields([{ name: '', value: '' }]); // Reset fields or handle as needed
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
          >
            Save widget
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;



// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useLocation } from 'react-router-dom';

// Modal.setAppElement('#root');

// const Form = ({ setIsPopupOpen, value, onChange }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [textBoxContent, setTextBoxContent] = useState(value || '');
//   const [displayOption, setDisplayOption] = useState('manual');
//   const [fontWeight, setFontWeight] = useState('normal');
//   const [textAlign, setTextAlign] = useState('left');
//   const [fontSize, setFontSize] = useState('medium');
//   const [apiendpoint, setApiendpoint] = useState('');
//   const [formFields, setFormFields] = useState([{ name: '', value: '' }]);
//   const location = useLocation();
//   const isConfig = location.pathname === '/configurations';

//   const openModal = () => {
//     setModalIsOpen(true);
//     setIsPopupOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setIsPopupOpen(false);
//   };

//   const handleSave = () => {
//     const finalContent = displayOption === 'api' ? apiendpoint : textBoxContent;
//     if (onChange && typeof onChange === 'function') {
//       onChange({ target: { value: finalContent } });
//     }
//     closeModal();
//   };

//   const handleAddField = () => {
//     setFormFields([...formFields, { name: '', value: '' }]);
//   };

//   const handleRemoveField = (index) => {
//     const newFields = formFields.filter((_, i) => i !== index);
//     setFormFields(newFields);
//   };

//   const handleFieldChange = (index, event) => {
//     const newFields = formFields.map((field, i) => 
//       i === index ? { ...field, [event.target.name]: event.target.value } : field
//     );
//     setFormFields(newFields);
//   };

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100%' }}>
//       {isConfig && (
//         <button
//           style={{
//             position: 'absolute',
//             top: '1px',
//             right: '1px',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '20px',
//           }}
//           onClick={openModal}
//         >
//           ⚙️
//         </button>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Text Box Content"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '400px',
//             maxHeight: '80vh',
//             overflowY: 'auto',
//           },
//         }}
//       >
//         <h2>Form Configuration</h2>

//         {formFields.map((field, index) => (
//           <div key={index} style={{ marginBottom: '10px' }}>
//             <input
//               type="text"
//               name="name"
//               value={field.name}
//               placeholder="Field Name"
//               onChange={(e) => handleFieldChange(index, e)}
//               style={{ marginRight: '10px', padding: '5px', width: '40%' }}
//             />
//             <input
//               type="text"
//               name="value"
//               value={field.value}
//               placeholder="Field Value"
//               onChange={(e) => handleFieldChange(index, e)}
//               style={{ padding: '5px', width: '40%' }}
//             />
//             <button
//               onClick={() => handleRemoveField(index)}
//               style={{ marginLeft: '10px', cursor: 'pointer' }}
//             >
//               Remove
//             </button>
//           </div>
//         ))}

//         <button onClick={handleAddField} style={{ marginBottom: '10px' }}>
//           Add Field
//         </button>

//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <button
//             style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px 10px' }}
//             onClick={closeModal}
//           >
//             Cancel
//           </button>
//           <button
//             style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
//             onClick={handleSave}
//           >
//             Save widget
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Form;

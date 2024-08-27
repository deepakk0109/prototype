import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

const Input = ({ setIsPopupOpen, value, onChange }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textBoxContent, setTextBoxContent] = useState(value || '');
  const [apiData, setApiData] = useState('');
  const [displayOption, setDisplayOption] = useState('manual'); // 'manual' or 'api'
  const [fontWeight, setFontWeight] = useState('normal');
  const [textAlign, setTextAlign] = useState('left');
  const [fontSize, setFontSize] = useState('medium');
  const [apiendpoint,setApiendpoint]=useState('/assets/db.json');
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';


//   X Value
//   Organization: Input
//   Plant: Input
//   Block: Input
//   Device: Input
//   Parameter: Input


  const openModal = () => {
    setModalIsOpen(true);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // Fetch API data when the component mounts
    fetchApiData();
  }, [apiendpoint]);

  const fetchApiData = async () => {debugger
    try {
      const response = await fetch(apiendpoint); // Replace with your API endpoint
      const data = await response.json();
      setApiData(data.labels[0]); // Assuming the data returned has a 'text' property
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

const handleSave = () => {
    const finalContent = displayOption === 'api' ? apiData : textBoxContent;
    if (onChange && typeof onChange === 'function') {
      onChange({ target: { value: finalContent } }); // Ensure you're passing an object with target and value
    }
    closeModal();
  };
  

  const handleContentChange = (e) => {
    setTextBoxContent(e.target.value);
    // onChange(e.target.value);
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', right: '1px' }}>
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
          onClick={openModal}
        >
          ⚙️
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Text Box Content"
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
            maxHeight: '80vh', // Limit the height of the modal based on viewport height
            overflowY: 'auto', // Enable vertical scrolling
          },
        }}
      >
        <h2>Text</h2>

        <label>Display Option:</label>
        <select
          value={displayOption}
          onChange={(e) => setDisplayOption(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        >
          <option value="manual">Enter manually</option>
          <option value="api">API text</option>
        </select>

        {displayOption === 'manual' ? (
          <textarea
            value={textBoxContent}
            onChange={handleContentChange}
            rows="10"
            style={{
              width: '100%',
              height: '100%',
              padding: '10px',
              fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '20px' : '16px',
              fontWeight: fontWeight,
              textAlign: textAlign,
            }}
          />
        ) : (
          <div
            style={{
              marginBottom: '10px',
            //   fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '20px' : '16px',
            //   fontWeight: fontWeight,
            //   textAlign: textAlign,
            }}
          >
            <label>Enter Api endpoint:</label>
            <input value={apiendpoint}
          onChange={(e) => setApiendpoint(e.target.value)} style={{ marginBottom: '10px', width: '95%', padding: '5px' }}/>
          </div>
        )}

        <label>Font weight:</label>
        <select
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>

        <label>Font size:</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>Alignment:</label>
        <select
          value={textAlign}
          onChange={(e) => setTextAlign(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px 10px' }}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
            onClick={handleSave}
          >
            Save widget
          </button>
        </div>
      </Modal>

      <div
        id="text-box"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <textarea
          value={value}
          onChange={onChange}
          rows="10"
          style={{
            width: '100%',
            height: '100%',
            // padding: '10px',
            fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '20px' : '16px',
            fontWeight: fontWeight,
            textAlign: textAlign,
          }}
        />
      </div>
    </div>
  );
};

export default Input;


//       <div id="text-box" style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//         <textarea
//           value={value}
//           onChange={onChange}
//           rows="10"
//           style={{ width: '80%', height: '80%', padding: '10px', fontSize: '16px' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Input;

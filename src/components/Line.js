import React, { useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

const SimpleLine = ({ setIsPopupOpen, width, onWidthChange }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lineWidth, setLineWidth] = useState(width || '100%');
  const [lineHeight, setLineHeight] = useState('2px'); // Default line height (thickness)
  const [lineColor, setLineColor] = useState('#000000'); // Default line color

  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  const openModal = () => {
    setModalIsOpen(true);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsPopupOpen(false);
  };

  const handleSave = () => {
    if (onWidthChange && typeof onWidthChange === 'function') {
      onWidthChange(lineWidth);
    }
    closeModal();
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
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
        contentLabel="Line Widget Settings"
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
        <h2>Line Settings</h2>

        <label>Line Width (% or px):</label>
        <input
          type="text"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />

        <label>Line Height (px):</label>
        <input
          type="text"
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />

        <label>Line Color:</label>
        <input
          type="color"
          value={lineColor}
          onChange={(e) => setLineColor(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
        />

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
            Save
          </button>
        </div>
      </Modal>

      <div
        id="line-widget"
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: lineColor,
          resize: 'both',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default SimpleLine;

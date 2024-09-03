import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import Modal from 'react-modal';
import '../styles/Text-editor.css'; // Ensure this file doesn't override the editor styles

// Set the app element for accessibility
Modal.setAppElement('#root');

const TextEditor = ({ isConfig,isPreview }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
  const [content, setContent] = useState('<p>Enter text here</p>');

  // Handle RichTextEditor value change
  const handleEditorChange = (newValue) => {
    const htmlContent = newValue.toString('html');
    setEditorValue(newValue);
    setContent(htmlContent); // Update content with HTML from RichTextEditor
  };

  // Handle content editable div change
  const handleContentChange = (event) => {
    const newContent = event.target.innerHTML;
    setContent(newContent);
    setEditorValue(RichTextEditor.createValueFromString(newContent, 'html')); // Update editorValue with HTML from contentEditable div
  };

  // Handle save button click
  const handleSave = () => {
    setContent(editorValue.toString('html'));
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{
        width: '100%',
        height:'100%'}}>
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
        contentLabel="Text Editor"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }
        }}
      >
        <h2>Edit Content</h2>
        <RichTextEditor
          value={editorValue}
          onChange={handleEditorChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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

      {/* Content editable div for formatted input */}
      <div
        id="content-display"
        contentEditable={!isPreview}
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        style={{
          marginTop: '20px',
          width: '100%',
        //   minHeight: '200px',
          height:'100%',
        //   border: '1px solid #ccc',
        //   padding: '10px',
        //   backgroundColor: '#f9f9f9',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  isConfig: PropTypes.bool,
};

export default TextEditor;

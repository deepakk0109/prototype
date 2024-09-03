import React, { useState, useEffect } from 'react';
import ReactImagePickerEditor from 'react-image-picker-editor';
import Modal from 'react-modal';
import 'react-image-picker-editor/dist/index.css';

Modal.setAppElement('#root');

const ImagePicker = ({ isConfig, updateImageWidget, widgetId, DataUrl }) => {
  const [imageSrc, setImageSrc] = useState(DataUrl || '');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const config = {
    borderRadius: '8px',
    language: 'en',
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    compressInitial: null,
  };

  useEffect(() => {
    setImageSrc(DataUrl || ''); // Update imageSrc when DataUrl changes
  }, [DataUrl]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const saveImage = (newDataUri) => {debugger
    setImageSrc(newDataUri); // Update imageSrc state
    updateImageWidget(newDataUri, widgetId); // Notify parent component
  };

  return (
    <div className="container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Resizable Image in Normal Screen */}
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Selected"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              cursor: isConfig ? 'pointer' : 'default',
            }}
            onClick={isConfig ? openModal : null}
          />
        ) : (
          <ReactImagePickerEditor
            config={config}
            imageSrcProp={imageSrc}
            imageChanged={(newDataUri) => {
              setImageSrc(newDataUri);
              saveImage(newDataUri); // Save the image when it changes
            }}
          />
        )}
      </div>

      {/* Button to Open Modal */}
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
          onClick={openModal}
        >
          ⚙️
        </button>
      )}

      {/* Modal for Image Editor */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Picker Editor"
        style={{
          content: {
            top: '25%',
            left: '50%',
            right: 'auto',
            bottom: '25%',
            padding: '20px',
            width: 'auto',
            height: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
            textAlign: 'center',
            overflowY: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h2>Select an Image</h2>
        <ReactImagePickerEditor
          config={config}
          imageSrcProp={imageSrc}
          imageChanged={(newDataUri) => {
            setImageSrc(newDataUri);
            saveImage(newDataUri); // Save the image when it changes
          }}
        />
        <button
          onClick={closeModal}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ImagePicker;

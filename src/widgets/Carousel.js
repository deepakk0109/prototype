import React, { useState, useEffect } from 'react';
import ReactImagePickerEditor from 'react-image-picker-editor';
import Modal from 'react-modal';
import 'react-image-picker-editor/dist/index.css';

Modal.setAppElement('#root');

const ImagePickerCarousel = ({ isConfig, updateImageWidget, widgetId, DataUrls }) => {
  const [imageSrcs, setImageSrcs] = useState(DataUrls || []);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    setImageSrcs(DataUrls || []); // Update imageSrcs when DataUrls changes
  }, [DataUrls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrcs.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [imageSrcs.length]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const saveImage = (newDataUri) => {
    const updatedImageSrcs = [...imageSrcs];
    if (currentIndex < updatedImageSrcs.length) {
      updatedImageSrcs[currentIndex] = newDataUri;
    } else {
      updatedImageSrcs.push(newDataUri);
    }
    setImageSrcs(updatedImageSrcs); // Update imageSrcs state
    updateImageWidget(updatedImageSrcs, widgetId); // Notify parent component
  };

  const addNewImage = () => {
    setCurrentIndex(imageSrcs.length); // Set currentIndex to the next new image
    openModal(); // Open the modal to add a new image
  };

  return (
    <div className="container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imageSrcs.length > 0 && currentIndex < imageSrcs.length ? (
          <img
            src={imageSrcs[currentIndex]}
            alt={`Selected ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              cursor: isConfig ? 'pointer' : 'default',
            }}
            onClick={isConfig ? openModal : null}
          />
        ) : (
          <div>No images available</div>
        )}
      </div>

      {/* Add Image Icon (Similar to Previous Design) */}
      {isConfig && (
        <div
          onClick={addNewImage}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span role="img" aria-label="Add Image">
            ➕
          </span>
        </div>
      )}

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
          imageSrcProp={imageSrcs[currentIndex] || ''}
          imageChanged={(newDataUri) => {
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

export default ImagePickerCarousel;

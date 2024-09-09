import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import {setFile,
  setFileBackendUrl,
  setUploadButtonStyle,
  resetfile} from '../redux/slices/fileSlice'
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
Modal.setAppElement('#root');
function File({ updateFileWidget,isConfig, ButtonsStyle,widgetId,BackendUrl }) {
  const dispatch=useDispatch();
  const fileState=useSelector((state)=>state.file[widgetId]) || {};
  const {file,fileBackendUrl,uploadButtonStyle}=fileState;

  useEffect(() => {
    dispatch(setFileBackendUrl({ widgetId, fileBackendUrl: BackendUrl || '' }));
    dispatch(setUploadButtonStyle({ widgetId, uploadButtonStyle: ButtonsStyle || {
      height:'',
      width:'',
      backgroundColor: '#007bff',
      color: '',
      padding: '',
      margin:'',
      fontSize:'',
      border: '',
      borderRadius: '',
    } }));
  }, [ButtonsStyle, widgetId, BackendUrl, dispatch]);


  function handleChange(event) {
    dispatch(setFile({ widgetId, file: event.target.files[0]}));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!fileBackendUrl) {
      alert('Please provide a backend URL.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    fetch(fileBackendUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Upload successful:', data);
      } else {
        console.error('Upload failed:', data.message);
        alert(`Upload failed: ${data.message}`);
      }
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please check the console for details.');
    });
  }
  
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
            <FileSidebar
              updateFileWidget={updateFileWidget}
              widgetId={widgetId}
            />
          </Provider>
        </React.StrictMode>
      );
  };
  return (
    <div className="file" onClick={toggleSettings} style={{...uploadButtonStyle,position: 'relative', width: '100%', height: '100%' }}>
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

 

      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input type="file" onChange={handleChange} style={{ marginRight: '10px' }} />
        {file && (
          <button
            type="submit"
            style={{ ...uploadButtonStyle, marginLeft: '10px' }}
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

// const modalStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     padding: '20px',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
//     width: '400px',
//   },
// };

const FileSidebar =({updateFileWidget,widgetId})=>{
  const dispatch=useDispatch();
  const fileState=useSelector((state)=>state.file[widgetId]) || {};
  const {file,fileBackendUrl,uploadButtonStyle}=fileState;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function saveSettings() {
    updateFileWidget(fileBackendUrl, uploadButtonStyle, widgetId);
  }

  const openSettingsModal = () => {
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };
  return(
    <div style={{padding:'10px', margin:'10px'}}>
        <h2 >File Upload Configuration</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Backend URL to save file:</label>
          <input
            type="text"
            value={fileBackendUrl}
            onChange={(e) => dispatch(setFileBackendUrl({ widgetId, fileBackendUrl: e.target.value}))}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <br></br>
        <div style={{ marginBottom: '10px' }}>Add styles  <button onClick={openSettingsModal}  style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '1px 10px', cursor: 'pointer' }}>+</button></div>
        <button onClick={()=>{saveSettings(); closeSettingsModal()}}  style={{ backgroundColor: 'blue', borderRadius: '5px', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }} >
          Save
        </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
            // pointerEvents: 'none', // Disable pointer events on overlay
          },
          content: {
            top: '50%',
            right: '10px', // Distance from the right edge
            left: 'auto', // Remove left alignment
            bottom: 'auto',
            marginRight: '0', // No margin on the right
            transform: 'translateY(-50%)', // Center vertically
            // padding: '20px',
            width: '200px',
            // textAlign: 'center',
            pointerEvents: 'auto', // Enable pointer events for the modal content
            overflowY:'auto',
          },
        }}
      >
       {/* {modalIsOpen &&( */}
        <>
        <div style={{ marginBottom: '10px' }}>
          <label>Height:</label>
          <input
            type="text"
            value={uploadButtonStyle.height}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  height: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Width:</label>
          <input
            type="text"
            value={uploadButtonStyle.width}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  width: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Background color:</label>
          <input
            type="color"
            value={uploadButtonStyle.backgroundColor}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  backgroundColor: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Color:</label>
          <input
            type="color"
            value={uploadButtonStyle.color}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  color: e.target.value,
                },
              })
            )
            }
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          
      
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Font Size</label>
          <input
            type="text"
            value={uploadButtonStyle.fontSize}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  fontSize: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Padding:</label>
          <input
            type="text"
            value={uploadButtonStyle.padding}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  padding: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Margin:</label>
          <input
            type="text"
            value={uploadButtonStyle.margin}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  margin: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Border:</label>
          <input
            type="text"
            value={uploadButtonStyle.border}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  border: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Border Radius:</label>
          <input
            type="text"
            value={uploadButtonStyle.borderRadius}
            onChange={(e) =>
              dispatch(setUploadButtonStyle({ widgetId,
                uploadButtonStyle: {
                  ...uploadButtonStyle,
                  borderRadius: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
      
        <button onClick={()=>{saveSettings(); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </>
        {/* )}  */}
        </Modal>

    </div>
  )
}


export  {File, FileSidebar};



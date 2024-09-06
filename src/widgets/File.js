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
function File({ updateFileWidget,isConfig, ButtonsStyle,widgetId,BackendUrl }) {
  const dispatch=useDispatch();
  const fileState=useSelector((state)=>state.file[widgetId]) || {};
  const {file,fileBackendUrl,uploadButtonStyle}=fileState;

  useEffect(() => {
    dispatch(setFileBackendUrl({ widgetId, fileBackendUrl: BackendUrl || '' }));
    dispatch(setUploadButtonStyle({ widgetId, uploadButtonStyle: ButtonsStyle || {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
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
    <div className="file" onClick={toggleSettings} style={{ position: 'relative', width: '100%', height: '100%' }}>
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

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '400px',
  },
};

const FileSidebar =({updateFileWidget,widgetId})=>{
  const dispatch=useDispatch();
  const fileState=useSelector((state)=>state.file[widgetId]) || {};
  const {file,fileBackendUrl,uploadButtonStyle}=fileState;
  function saveSettings() {
    updateFileWidget(fileBackendUrl, uploadButtonStyle, widgetId);
  }
  return(
    <div>
        <h2>File Upload Configuration</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Backend URL:</label>
          <input
            type="text"
            value={fileBackendUrl}
            onChange={(e) => dispatch(setFileBackendUrl({ widgetId, fileBackendUrl: e.target.value}))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Upload Button Background:</label>
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
          <label>Upload Button Text Color:</label>
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

        <button onClick={saveSettings} >
          Save
        </button>
    </div>
  )
}


export  {File, FileSidebar};


// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/File.css'; // Make sure you have the CSS file for styling

// function File() {
//   const [file, setFile] = useState(null); // Initialize with null

//   function handleChange(event) {
//     setFile(event.target.files[0]); // Set the selected file
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     const url = 'http://localhost:3000/uploadFile';
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileName', file.name);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data);
//     });
//   }

//   return (
//     <div className="file" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
//         <input type="file" onChange={handleChange} style={{ marginRight: '10px' }} />
//         {file && (
//           <button type="submit">
//             Upload
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default File;

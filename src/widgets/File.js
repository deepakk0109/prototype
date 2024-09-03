import React, { useState } from 'react';
import axios from 'axios';
import '../styles/File.css'; // Make sure you have the CSS file for styling

function File() {
  const [file, setFile] = useState(null); // Initialize with null

  function handleChange(event) {
    setFile(event.target.files[0]); // Set the selected file
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="file" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input type="file" onChange={handleChange} style={{ marginRight: '10px' }} />
        {file && (
          <button type="submit">
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default File;

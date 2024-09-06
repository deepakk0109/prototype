import React, { useState, useEffect } from 'react';
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css';
import {setImageSrc} from '../redux/slices/imagepickerSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const ImagePicker = ({ isConfig, updateImageWidget, widgetId, DataUrl }) => {
  const dispatch = useDispatch();
  const imagepickerState = useSelector((state) => state.imagepicker[widgetId]) || {};
  const { imageSrc } = imagepickerState;

  const config = {
    borderRadius: '8px',
    language: 'en',
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    compressInitial: null,
  };

  useEffect(() => {
    if (DataUrl && DataUrl !== imageSrc) {
      dispatch(setImageSrc({ widgetId, imageSrc: DataUrl }));
    }
  }, [DataUrl, imageSrc, dispatch, widgetId]);

  const saveImage = (newDataUri) => {
    dispatch(setImageSrc({ widgetId, imageSrc: newDataUri }));
    updateImageWidget(newDataUri, widgetId); // Notify parent component
  };

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
          <ImagePickerSidebar
            updateImageWidget={updateImageWidget}
            widgetId={widgetId}
            saveImage={saveImage}
          />
        </Provider>
      </React.StrictMode>
    );
  };

  return (
    <div className="container" style={{ position: 'relative', width: '100%', height: '100%' }}>
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
            onClick={toggleSettings}
          />
        ) : (
          <ReactImagePickerEditor
            config={config}
            imageSrcProp={imageSrc}
            imageChanged={(newDataUri) =>{
              dispatch(setImageSrc({widgetId,imageSrc:newDataUri}));
              updateImageWidget(imageSrc,widgetId); 
            }}
          />
        )}
      </div>

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
    </div>
  );
};



const ImagePickerSidebar=({widgetId,updateImageWidget,saveImage})=>{
  const dispatch=useDispatch();
  const imagepickerState=useSelector((state)=>state.imagepicker[widgetId]) || {};
  const {imageSrc}=imagepickerState;
  const config = {
    borderRadius: '8px',
    language: 'en',
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    compressInitial: null,
  };
  // const saveImage = (newDataUri) => {
  //   dispatch(setImageSrc({widgetId,imageSrc:newDataUri})); // Update imageSrc state
  //   updateImageWidget(newDataUri, widgetId); // Notify parent component
  // };
  return(
   <div>
   <h2>Select an Image</h2>
   <ReactImagePickerEditor
     config={config}
     imageSrcProp={imageSrc}
     imageChanged={(newDataUri) => {
      dispatch(setImageSrc({widgetId,imageSrc:newDataUri}));
      updateImageWidget(imageSrc,widgetId); 
     }}
   />
   </div>
  );
}

export {ImagePicker,ImagePickerSidebar};

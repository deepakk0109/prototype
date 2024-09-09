import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import Modal from 'react-modal';
import '../styles/Text-editor.css'; // Ensure this file doesn't override the editor styles
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setTextEditorContent } from '../redux/slices/texteditorSlice';
// Set the app element for accessibility
Modal.setAppElement('#root');

const TextEditor = ({ isConfig, isPreview, updateTextEditorWidget, widgetId, TextEditorContent }) => {
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.textEditor[widgetId]?.content || TextEditorContent || RichTextEditor.createEmptyValue());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
  const editorRef = useRef(null); // Create a ref for the editor

  // Initialize editorValue when textEditorContent changes
  useEffect(() => {
    dispatch(setTextEditorContent({widgetId,content:RichTextEditor.createValueFromString(TextEditorContent || '', 'html')}));
  }, [TextEditorContent,widgetId,dispatch]);

  // Handle RichTextEditor value change
  const handleEditorChange = (newValue) => {
    dispatch(setTextEditorContent({widgetId,content:newValue}));
  };

  // Handle content editable div change
  const handleContentChange = (event) => {
    const newContent = event.target.innerHTML;
    dispatch(setTextEditorContent({widgetId,content:RichTextEditor.createValueFromString(newContent, 'html')})); // Update editorValue with HTML from contentEditable div
  };

  // Handle save button click


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
            <TextEditorSidebar
              updateTextEditorWidget={updateTextEditorWidget}
              widgetId={widgetId}
              handleEditorChange={handleEditorChange}
            />
          </Provider>
        </React.StrictMode>
      );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
          onClick={toggleSettings}
        >
          ⚙️
        </button>
      )}


      {/* Content editable div for formatted input */}
      <div
        id="content-display"
        contentEditable={!isPreview}
        dangerouslySetInnerHTML={{ __html: editorValue.toString('html') }}
        onInput={handleContentChange}
        style={{
          marginTop: '20px',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  isConfig: PropTypes.bool,
  isPreview: PropTypes.bool,
  updateTextEditorWidget: PropTypes.func.isRequired,
  widgetId: PropTypes.string.isRequired,
  textEditorContent: PropTypes.string,
};

const TextEditorSidebar =({widgetId,updateTextEditorWidget,handleEditorChange})=>{
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.textEditor[widgetId]?.content || RichTextEditor.createEmptyValue());
  // const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
  const editorRef = useRef(null); // Create a ref for the editor
  const handleSave = () => {debugger
    const htmlContent = editorValue.toString('html');
    updateTextEditorWidget(widgetId, htmlContent);
    
  };
  return(
    <div>
    <h2>Edit Content</h2>
    <RichTextEditor
      value={editorValue}
      onChange={handleEditorChange}
      ref={editorRef} // Apply the ref here if needed
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      {/* <button
        style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px 10px' }}
        onClick={closeModal}
      >
        Cancel
      </button> */}
      <button
        style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
    </div>
  )

}

export default TextEditor;




// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RichTextEditor from 'react-rte';
// import Modal from 'react-modal';
// import '../styles/Text-editor.css'; // Ensure this file doesn't override the editor styles

// // Set the app element for accessibility
// Modal.setAppElement('#root');

// const TextEditor = ({ isConfig,isPreview,updateTextEditorWidget,widgetId,textEditorContent }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
//   const [content, setContent] = useState(textEditorContent || '<p>Enter text here</p>');

//   // Handle RichTextEditor value change
//   const handleEditorChange = (newValue) => {
//     const htmlContent = newValue.toString('html');
//     setEditorValue(newValue);
//     setContent(htmlContent); // Update content with HTML from RichTextEditor
//   };

//   // Handle content editable div change
//   const handleContentChange = (event) => {
//     const newContent = event.target.innerHTML;
//     setContent(newContent);
//     setEditorValue(RichTextEditor.createValueFromString(newContent, 'html')); // Update editorValue with HTML from contentEditable div
//   };

//   // Handle save button click
//   const handleSave = () => {
//     setContent(editorValue.toString('html'));
//     console.log("content",editorValue.toString('html'));
//     updateTextEditorWidget(widgetId,content);
//     closeModal();
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };
//   return (
//     <div style={{
//         width: '100%',
//         height:'100%'}}>
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
//         contentLabel="Text Editor"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '80%',
//             maxHeight: '80vh',
//             overflowY: 'auto'
//           }
//         }}
//       >
//         <h2>Edit Content</h2>
//         <RichTextEditor
//           value={editorValue}
//           onChange={handleEditorChange}
//         />
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
//             Save
//           </button>
//         </div>
//       </Modal>

//       {/* Content editable div for formatted input */}
//       <div
//         id="content-display"
//         contentEditable={!isPreview}
//         dangerouslySetInnerHTML={{ __html: content }}
//         onInput={handleContentChange}
//         style={{
//           marginTop: '20px',
//           width: '100%',
//         //   minHeight: '200px',
//           height:'100%',
//         //   border: '1px solid #ccc',
//         //   padding: '10px',
//         //   backgroundColor: '#f9f9f9',
//           boxSizing: 'border-box',
//         }}
//       />
//     </div>
//   );
// };

// TextEditor.propTypes = {
//   isConfig: PropTypes.bool,
// };

// export default TextEditor;

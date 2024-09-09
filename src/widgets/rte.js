// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setText } from '../redux/slices/texteditorSlice'; // Import the setText action from store
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from '../redux/store';
// import RichTextEditor from 'react-rte';


// // TextBox Component

// const TextBox = ({ widgetId }) => {
//     const dispatch = useDispatch();
//     const text = useSelector((state) => state.text[widgetId]?.value || ''); // Access text for the specific widget

//     const handleInputChange = (e) => {
//       dispatch(setText({ widgetId, text: e.target.value })); // Dispatch action with widgetId
//     };

//     const toggleSettings = () => {
//       const sidebarElement = document.getElementById('sidebar');
//       if (!sidebarElement) {
//         console.warn('Sidebar element not found');
//         return;
//       }
//       const root = ReactDOM.createRoot(sidebarElement);
//       root.render(
//         <React.StrictMode>
//           <Provider store={store}>
//             <RichTextEditorComponent widgetId={widgetId} />
//           </Provider>
//         </React.StrictMode>
//       );
//     };

//     return (
//       <div>
//         <h3 onClick={toggleSettings}>Normal Textbox</h3>
//         <textarea
//           rows="4"
//           cols="50"
//           value={text} // Display raw text
//           onChange={handleInputChange} // Update state on change
//           style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
//         />
//       </div>
//     );
// };
  

// const RichTextEditorComponent = ({ widgetId }) => {
//     const dispatch = useDispatch();
//     const text = useSelector((state) => state.text[widgetId]?.value || ''); // Get the current text for the specific widget

//     // Initialize the rich text editor with HTML
//     const editorValue = RichTextEditor.createValueFromString(text, 'html');

//     const handleEditorChange = (value) => {
//       dispatch(setText({ widgetId, text: value.toString('html') })); // Update the state with HTML from editor
//     };

//     return (
//       <div>
//         <h3>Rich Text Editor</h3>
//         <RichTextEditor
//           value={editorValue}
//           onChange={handleEditorChange}
//         />
//       </div>
//     );
// };

// export  {TextBox,RichTextEditorComponent};

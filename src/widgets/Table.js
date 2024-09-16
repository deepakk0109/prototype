import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData, setTableColumns, setTableUrl } from '../redux/slices/tableSlice';
import '../styles/Table.css';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';


const Table = ({onClick, updateTableWidget, widgetId, tableDataUrl }) => {
  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.table[widgetId]) || {};
  const { data = [], columns = [], url } = tableState;

  const [inputValue, setInputValue] = useState(tableDataUrl || url || '');
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  useEffect(() => {
    if (inputValue) {
      dispatch(setTableUrl({ widgetId, url: inputValue }));

      const fetchData = async () => {
        try {
          const response = await fetch(inputValue);
          const result = await response.json();

          if (result.length > 0) {
            const keys = Object.keys(result[0]);
            dispatch(setTableColumns({ widgetId, columns: keys }));
          }

          dispatch(setTableData({ widgetId, data: result }));
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      };

      fetchData();
    }
  }, [inputValue, widgetId, dispatch]);

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
          <TableSidebar
            widgetId={widgetId}
            updateTableWidget={updateTableWidget}
          />
        </Provider>
      </React.StrictMode>
    );
  };

  return (
    <div className="table-container" style={{ display: 'flex', width: '100%', height: '100%' }}>
      {isConfig && (
        <>
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
            onClick={() => toggleSettings()}
          >
            ⚙️
          </button>
        </>
      )}

      <table className="data-table"  onClick={()=>{onClick();toggleSettings()}} style={{ height: '100%', width: '100%' }}>
        <thead style={{ width: '100%', height: '100%' }}>
          <tr>
            {columns.length > 0 ? (
              columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))
            ) : (
              <th colSpan="3">Configure to see Table data</th>
            )}
          </tr>
        </thead>
        <tbody style={{ width: '100%', height: '100%' }}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{item[column]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length || 3}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableSidebar = ({ widgetId, updateTableWidget }) => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state) => state.table[widgetId]?.url || '');
  const [inputValue, setInputValue] = useState(currentUrl);

  useEffect(() => {
    setInputValue(currentUrl); // Sync with global state when the component mounts
  }, [currentUrl]);

  
  useEffect(() => {
    if (inputValue) {
      dispatch(setTableUrl({ widgetId, url: inputValue }));

      const fetchData = async () => {
        try {
          const response = await fetch(inputValue);
          const result = await response.json();

          if (result.length > 0) {
            const keys = Object.keys(result[0]);
            dispatch(setTableColumns({ widgetId, columns: keys }));
          }

          dispatch(setTableData({ widgetId, data: result }));
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      };

      fetchData();
    }
  }, [inputValue, widgetId, dispatch]);

  const handleSaveUrl = () => {
    dispatch(setTableUrl({ widgetId, url: inputValue }));
    updateTableWidget(inputValue, widgetId);
  };


  return (
    <div style={{ padding: '10px' }}>
      <div style={{fontWeight:'bold'}}>Enter Table Data API Url</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="https://api.example.com/data"
        style={{
          width: '90%',
          padding: '5px',
          marginBottom: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      />
      <div>
        <button
          onClick={handleSaveUrl}
          style={{
            padding: '10px 15px',
            margin: '5px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};


export {Table,TableSidebar};



// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import '../styles/Table.css';
// import { useLocation } from 'react-router-dom';

// // Bind modal to app element
// Modal.setAppElement('#root');

// const Table = ({updateTableWidget,widgetId,tableDataUrl}) => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [apiUrl, setApiUrl] = useState(tableDataUrl || '');
//   const [inputValue, setInputValue] = useState(null);
//   const location = useLocation();
//   const isConfig = location.pathname === '/configurations';
//  console.log("Table URL",apiUrl);
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!apiUrl) return;

//       try {
//         const response = await fetch(apiUrl);
//         const result = await response.json();

//         if (result.length > 0) {
//           const keys = Object.keys(result[0]); // Get the keys from the first item in the data array
//           setColumns(keys); // Set columns dynamically based on the keys
//         }

//         setData(result);
//       } catch (error) {
//         console.error('Error fetching CMS data:', error);
//       }
//     };

//     fetchData();
//   }, [apiUrl]);

//   const handleSaveUrl = () => {
//     setApiUrl(inputValue);
//     updateTableWidget(inputValue,widgetId)
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="table-container" style={{ display: 'flex', width: '100%', height: '100%' }}>
//       {isConfig && (
//         <>
//           <button
//             style={{
//               position: 'absolute',
//               top: '1px',
//               right: '1px',
//               background: 'none',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '20px',
//             }}
//             onClick={() => setIsModalOpen(true)}
//           >
//             ⚙️
//           </button>

//           <Modal
//             isOpen={isModalOpen}
//             onRequestClose={() => setIsModalOpen(false)}
//             style={{
//               overlay: {
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               },
//               content: {
//                 top: '50%',
//                 left: '50%',
//                 right: 'auto',
//                 bottom: 'auto',
//                 marginRight: '-50%',
//                 transform: 'translate(-50%, -50%)',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 width: '300px',
//                 textAlign: 'center',
//               },
//             }}
//             contentLabel="Enter API URL"
//           >
//             <h2>Enter Table Data API URL</h2>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="https://api.example.com/data"
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 marginBottom: '10px',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//               }}
//             />
//             <div>
//               <button
//                 onClick={handleSaveUrl}
//                 style={{
//                   padding: '10px 15px',
//                   margin: '5px',
//                   border: 'none',
//                   borderRadius: '4px',
//                   backgroundColor: '#007bff',
//                   color: 'white',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   padding: '10px 15px',
//                   margin: '5px',
//                   border: 'none',
//                   borderRadius: '4px',
//                   backgroundColor: '#ccc',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </Modal>
//         </>
//       )}

//       <table className="data-table" style={{height:'100%',width:'100%'}}>
//         <thead style={{ width: '100%', height: '100%' }}>
//           <tr>
//             {columns.length > 0 ? (
//               columns.map((column, index) => (
//                 <th key={index}>{column}</th>
//               ))
//             ) : (
//               <th colSpan="3">Configure to see Table data</th>
//             )}
//           </tr>
//         </thead>
//         <tbody style={{ width: '100%', height: '100%' }}>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr key={index}>
//                 {columns.map((column, colIndex) => (
//                   <td key={colIndex}>{item[column]}</td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length || 3}>No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

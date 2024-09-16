import React, { useEffect, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import axios from 'axios';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Datagrid = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [defaultColDef, setDefaultColDef] = useState({});
    const [sortingConfig, setSortingConfig] = useState([]);

    useEffect(() => {
        // Fetch data from JSON file using axios
        axios.get('/assets/Datagrid.json')
            .then((response) => {
                const data = response.data;
                
                // Set row data
                setRowData(data.rowData);
                
                // Set column definitions and attach custom comparators
                setColumnDefs(
                    data.columnDefs.map((colDef) => {
                        if (colDef.field === 'month') {
                            return {
                                ...colDef,
                                comparator: monthComparator(data.sortingConfig.months),
                            };
                        }
                        return colDef;
                    })
                );
                
                // Set default column definitions and sorting config
                setDefaultColDef(data.defaultColDef);
                setSortingConfig(data.sortingConfig);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Month sorting function
    const monthComparator = (months) => (valueA, valueB) => {
        const idxA = months.indexOf(valueA);
        const idxB = months.indexOf(valueB);
        return idxA - idxB;
    };

    return (
        <div
            className="ag-theme-quartz-dark"
            style={{ height:'100%', width:'100%'}}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default Datagrid;




// 'use strict';

// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { ModuleRegistry } from '@ag-grid-community/core';
// import { AgGridReact } from '@ag-grid-community/react';
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-quartz.css';
// import React, { StrictMode, useMemo, useState } from 'react';
// import { createRoot } from 'react-dom/client';

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const gridDiv = document.querySelector('#myGrid');

// const Datagrid = () => {
//     const [rowData, setRowData] = useState([
//         { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
//         { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October' },
//         { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August' },
//         { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February' },
//         { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January' },
//         { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March' },
//         { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July' },
//         { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September' },
//         { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December' },
//         { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April' },
//         { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November' },
//         { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May' },
//         { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
//         { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October' },
//         { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August' },
//         { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February' },
//         { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January' },
//         { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March' },
//         { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July' },
//         { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September' },
//         { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December' },
//         { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April' },
//         { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November' },
//         { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May' },
//         { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
//         { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October' },
//         { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August' },
//         { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February' },
//         { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January' },
//         { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March' },
//         { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July' },
//         { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September' },
//         { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December' },
//         { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April' },
//         { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November' },
//         { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May' },
//     ]);

//     const [columnDefs, setColumnDefs] = useState([
//         {
//             field: 'make',
//             checkboxSelection: true,
//             editable: true,
//             cellEditor: 'agSelectCellEditor',
//             cellEditorParams: {
//                 values: ['Tesla', 'Ford', 'Toyota', 'Mercedes', 'Fiat', 'Nissan', 'Vauxhall', 'Volvo', 'Jaguar'],
//             },
//         },
//         { field: 'model' },
//         { field: 'price', filter: 'agNumberColumnFilter' },
//         { field: 'electric' },
//         {
//             field: 'month',
//             comparator: (valueA, valueB) => {
//                 const months = [
//                     'January',
//                     'February',
//                     'March',
//                     'April',
//                     'May',
//                     'June',
//                     'July',
//                     'August',
//                     'September',
//                     'October',
//                     'November',
//                     'December',
//                 ];
//                 const idxA = months.indexOf(valueA);
//                 const idxB = months.indexOf(valueB);
//                 return idxA - idxB;
//             },
//         },
//     ]);

//     const defaultColDef = useMemo(() => {
//         return {
//             filter: 'agTextColumnFilter',
//             floatingFilter: true,
//         };
//     }, []);

//     return (
//         <div
//             className={
//                 "ag-theme-quartz-dark"
//             }
//             style={{ height: 500 }}
//         >
//             <AgGridReact
//                 rowData={rowData}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 rowSelection="multiple"
//                 suppressRowClickSelection={true}
//                 pagination={true}
//                 paginationPageSize={10}
//                 paginationPageSizeSelector={[10, 25, 50]}
//             />
//         </div>
//     );
// };

// export default Datagrid;




// import React, { useEffect, useState } from 'react';
// import DataGrid from 'react-data-grid';
// import 'react-data-grid/lib/styles.css';
// import axios from 'axios';

// function Datagrid() {
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch columns and rows from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('assets/Datagrid.json'); // Replace with your actual backend link
//         // Ensure all columns are editable for cell input
//         const columnsWithEditable = response.data.columns.map((col) => ({
//           ...col,
//           editable: true // All cells in this column will be editable
//         }));
//         setColumns(columnsWithEditable);
//         setRows(response.data.rows);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle cell value changes
//   const handleRowsChange = (updatedRows) => {
//     setRows(updatedRows); // Update the row data when cells are edited
//   };

//   // Save changes to backend
//   const handleSaveChanges = async () => {
//     try {
//       const response = await axios.put('https://your-backend-api.com/update', { rows }); // Replace with actual backend link
//       console.log('Changes saved:', response.data);
//     } catch (error) {
//       console.error('Error saving changes:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <DataGrid
//         columns={columns}
//         rows={rows}
//         onRowsChange={handleRowsChange}
//         draggable='true'
//         editable= 'true'
//         editorOptions='true'
//         defaultColumnOptions={{ resizable: true, sortable: true, editable: true }} // Enables editing in all columns
//       />
//       {/* <button
//         onClick={handleSaveChanges}
//         style={{
//           marginTop: '10px',
//           padding: '5px 10px',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//         }}
//       >
//         Save Changes
//       </button> */}
//     </div>
//   );
// }

// export default Datagrid;




// import 'react-data-grid/lib/styles.css';

// import DataGrid from 'react-data-grid';

// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' }
// ];

// const rows = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' }
// ];

// function Datagrid() {
//   return <DataGrid columns={columns} rows={rows} />;
// }

// export default Datagrid

// import React, { useState } from 'react';
// import DataGrid from 'react-data-grid';
// import Modal from 'react-modal';
// import '../styles/DataGrid.css';
// import 'react-data-grid/lib/styles.css';

// const initialColumns = [
//   { key: 'col1', name: 'Column 1', editable: true },
//   { key: 'col2', name: 'Column 2', editable: true },
// ];

// const initialRows = [
//   { col1: 'Row 1 - Col 1', col2: 'Row 1 - Col 2' },
//   { col1: 'Row 2 - Col 1', col2: 'Row 2 - Col 2' },
// ];

// Modal.setAppElement('#root');

// export default function Datagrid() {
//   const [columns, setColumns] = useState(initialColumns);
//   const [rows, setRows] = useState(initialRows);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);

//   const handleAddColumn = (position) => {
//     const newColumnKey = `col${columns.length + 1}`;
//     const newColumn = { key: newColumnKey, name: `Column ${columns.length + 1}`, editable: true };

//     const newColumns = [...columns];
//     const index = columns.findIndex(col => col.key === selectedColumnKey);
//     if (position === 'left') {
//       newColumns.splice(index, 0, newColumn);
//     } else {
//       newColumns.splice(index + 1, 0, newColumn);
//     }

//     setColumns(newColumns);
//     const newRows = rows.map(row => ({ ...row, [newColumnKey]: '' }));
//     setRows(newRows);
//     closeModal();
//   };

//   const handleCellChange = (rowIdx, columnKey, value) => {
//     const updatedRows = rows.map((row, idx) =>
//       idx === rowIdx ? { ...row, [columnKey]: value } : row
//     );
//     setRows(updatedRows);
//   };

//   const openModal = (columnKey) => {
//     setSelectedColumnKey(columnKey);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedColumnKey(null);
//   };

//   const renderHeader = (column) => (
//     <div className="column-header">
//       <span>{column.name}</span>
//       <button
//         className="column-menu-button"
//         onClick={(e) => {
//           e.stopPropagation();
//           openModal(column.key);
//         }}
//       >
//         ⋮
//       </button>
//     </div>
//   );

//   const getColumns = () =>
//     columns.map(col => ({
//       ...col,
//       headerRenderer: () => renderHeader(col),
//     }));

//   return (
//     <div className="data-grid-container">
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Column Configuration"
//         className="modal"
//         overlayClassName="modal-overlay"
//       >
//         <h3>Configure Column: {selectedColumnKey}</h3>
//         <button onClick={() => handleAddColumn('left')}>Add Column Left</button>
//         <button onClick={() => handleAddColumn('right')}>Add Column Right</button>
//         <button onClick={() => alert('Insert Formula clicked')}>Insert Formula</button>
//         <button onClick={() => alert('Connect to Data Source clicked')}>Connect to Data Source</button>
//         <button onClick={closeModal}>Close</button>
//       </Modal>

//       <DataGrid
//   columns={getColumns()}
//   rows={rows}
//   onRowsChange={setRows}
//   onCellClick={(e, params) => {

//     if (!params) return;
    
//     const { row, column } = e; // Check if these are available
//     openModal(column.key);
//     if (row && column) {
//       const rowIdx = rows.findIndex(r => r === row); // Find index if needed
//       const columnIdx = getColumns().findIndex(c => c === column); // Find index if needed

//       if (rowIdx >= 0 && columnIdx >= 0) {
//         openModal(column.key);
//       }
//     }
//   }}
// />



//     </div>
//   );
// }

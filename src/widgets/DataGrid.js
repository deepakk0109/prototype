import React, { useState } from 'react';
import DataGrid from 'react-data-grid';
import Modal from 'react-modal';
import '../styles/DataGrid.css';
import 'react-data-grid/lib/styles.css';

const initialColumns = [
  { key: 'col1', name: 'Column 1', editable: true },
  { key: 'col2', name: 'Column 2', editable: true },
];

const initialRows = [
  { col1: 'Row 1 - Col 1', col2: 'Row 1 - Col 2' },
  { col1: 'Row 2 - Col 1', col2: 'Row 2 - Col 2' },
];

Modal.setAppElement('#root');

export default function Datagrid() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null);

  const handleAddColumn = (position) => {
    const newColumnKey = `col${columns.length + 1}`;
    const newColumn = { key: newColumnKey, name: `Column ${columns.length + 1}`, editable: true };

    const newColumns = [...columns];
    const index = columns.findIndex(col => col.key === selectedColumnKey);
    if (position === 'left') {
      newColumns.splice(index, 0, newColumn);
    } else {
      newColumns.splice(index + 1, 0, newColumn);
    }

    setColumns(newColumns);
    const newRows = rows.map(row => ({ ...row, [newColumnKey]: '' }));
    setRows(newRows);
    closeModal();
  };

  const handleCellChange = (rowIdx, columnKey, value) => {
    const updatedRows = rows.map((row, idx) =>
      idx === rowIdx ? { ...row, [columnKey]: value } : row
    );
    setRows(updatedRows);
  };

  const openModal = (columnKey) => {debugger
    setSelectedColumnKey(columnKey);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedColumnKey(null);
  };

  const renderHeader = (column) => (
    <div className="column-header">
      <span>{column.name}</span>
      <button
        className="column-menu-button"
        onClick={(e) => {
          e.stopPropagation();
          openModal(column.key);
        }}
      >
        ⋮
      </button>
    </div>
  );

  const getColumns = () =>
    columns.map(col => ({
      ...col,
      headerRenderer: () => renderHeader(col),
    }));

  return (
    <div className="data-grid-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Column Configuration"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Configure Column: {selectedColumnKey}</h3>
        <button onClick={() => handleAddColumn('left')}>Add Column Left</button>
        <button onClick={() => handleAddColumn('right')}>Add Column Right</button>
        <button onClick={() => alert('Insert Formula clicked')}>Insert Formula</button>
        <button onClick={() => alert('Connect to Data Source clicked')}>Connect to Data Source</button>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <DataGrid
  columns={getColumns()}
  rows={rows}
  onRowsChange={setRows}
  onCellClick={(e, params) => {
    if (!params) return;
    
    const { row, column } = params; // Check if these are available

    if (row && column) {
      const rowIdx = rows.findIndex(r => r === row); // Find index if needed
      const columnIdx = getColumns().findIndex(c => c === column); // Find index if needed

      if (rowIdx >= 0 && columnIdx >= 0) {
        openModal(column.key);
      }
    }
  }}
/>



    </div>
  );
}




// import React, { useState, useCallback } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { evaluate } from 'mathjs'; // Install mathjs for safe formula evaluation

// // Initial column and row definitions
// const initialColumns = [
//   { headerName: 'ID', field: 'id', editable: true },
//   { headerName: 'Title', field: 'title', editable: true }
// ];

// const initialRows = [
//   { id: 0, title: 'Example', value1: 10, value2: 20 },
//   { id: 1, title: 'Demo', value1: 15, value2: 25 }
// ];

// const Datagrid = () => {
//   const [columnDefs, setColumnDefs] = useState(initialColumns);
//   const [rowData, setRowData] = useState(initialRows);
//   const [newColName, setNewColName] = useState('');
//   const [formula, setFormula] = useState('');

//   // Function to add a new column
//   const handleAddColumn = () => {
//     const newColKey = `col${columnDefs.length}`;
//     const newColumn = { headerName: newColName || `Column ${columnDefs.length}`, field: newColKey, editable: true };
//     setColumnDefs([...columnDefs, newColumn]);
//     setRowData(rowData.map(row => ({ ...row, [newColKey]: '' })));
//   };

//   // Function to calculate formulas
//   const calculateFormula = useCallback((rows, formula) => {
//     return rows.map(row => {
//       try {
//         // Replace column names with values from rowData
//         const evaluatedFormula = formula.replace(/(\w+)/g, (match) => row[match] || 0);
//         const result = evaluate(evaluatedFormula);
//         return { ...row, result };
//       } catch (error) {
//         console.error('Error evaluating formula:', error);
//         return { ...row, result: '' };
//       }
//     });
//   }, []);

//   // Function to handle cell value changes
//   const handleCellValueChanged = useCallback((params) => {
//     console.log('Cell value changed:', params);
//   }, []);

//   // Function to apply formula to all rows
//   const handleApplyFormula = () => {
//     const updatedRows = calculateFormula(rowData, formula);
//     setRowData(updatedRows);
//   };

//   return (
//     <div style={{ height: '600px', width: '100%' }}>
//       <input
//         type="text"
//         value={newColName}
//         onChange={e => setNewColName(e.target.value)}
//         placeholder="New Column Name"
//       />
//       <button onClick={handleAddColumn}>Add Column</button>

//       <input
//         type="text"
//         value={formula}
//         onChange={e => setFormula(e.target.value)}
//         placeholder="Enter Formula (e.g., value1 + value2)"
//       />
//       <button onClick={handleApplyFormula}>Apply Formula</button>

//       <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
//         <AgGridReact
//           columnDefs={columnDefs}
//           rowData={rowData}
//           onCellValueChanged={handleCellValueChanged}
//           defaultColDef={{ editable: true }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Datagrid;



// import React, { useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// // Initial column and row definitions
// const initialColumns = [
//   { headerName: 'ID', field: 'id', editable: true },
//   { headerName: 'Title', field: 'title', editable: true }
// ];

// const initialRows = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' }
// ];

// const Datagrid = () => {
//   const [columnDefs, setColumnDefs] = useState(initialColumns);
//   const [rowData, setRowData] = useState(initialRows);
//   const [newColName, setNewColName] = useState('');
//   const [formula, setFormula] = useState('');

//   // Function to add a new column
//   const handleAddColumn = () => {
//     const newColKey = `col${columnDefs.length}`;
//     const newColumn = { headerName: newColName || `Column ${columnDefs.length}`, field: newColKey, editable: true };
//     setColumnDefs([...columnDefs, newColumn]);
//     setRowData(rowData.map(row => ({ ...row, [newColKey]: '' })));
//   };

//   // Function to calculate formulas
//   const calculateFormula = (rows, formula) => {
//     return rows.map(row => {
//       try {
//         const newRow = { ...row };
//         const evaluatedFormula = formula.replace(/(\w+)/g, (match) => row[match] || 0);
//         newRow.result = eval(evaluatedFormula);
//         return newRow;
//       } catch (error) {
//         console.error('Error evaluating formula:', error);
//         return { ...row, result: '' };
//       }
//     });
//   };

//   // Function to handle cell value changes
//   const handleCellValueChanged = (params) => {
//     console.log('Cell value changed:', params);
//   };

//   // Function to apply formula to all rows
//   const handleApplyFormula = () => {
//     const updatedRows = calculateFormula(rowData, formula);
//     setRowData(updatedRows);
//   };

//   return (
//     <div style={{ height: '600px', width: '100%' }}>
//       <input
//         type="text"
//         value={newColName}
//         onChange={e => setNewColName(e.target.value)}
//         placeholder="New Column Name"
//       />
//       <button onClick={handleAddColumn}>Add Column</button>

//       <input
//         type="text"
//         value={formula}
//         onChange={e => setFormula(e.target.value)}
//         placeholder="Enter Formula (e.g., A1+B1)"
//       />
//       <button onClick={handleApplyFormula}>Apply Formula</button>

//       <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
//         <AgGridReact
//           columnDefs={columnDefs}
//           rowData={rowData}
//           onCellValueChanged={handleCellValueChanged}
//           defaultColDef={{ editable: true }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Datagrid;

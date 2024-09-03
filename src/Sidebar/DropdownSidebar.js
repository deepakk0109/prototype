// import React from 'react'
// import { Dropdown } from '../widgets/Dropdown'

// const DropdownSidebar = () => {


//   return (
//     <div>
//            <h2>Dropdown</h2>
//         <div style={{ marginBottom: '20px' }}>
//         <label>Label:</label>
//         <input
//           type="text"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           placeholder="Enter dropdown label"
//           className="label-input"
//         />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//         <label >Font Size(enter with unit):</label>
//         <input
//           type="text"
//           value={dropdownFontSize}
//           onChange={(e) => setDropdownFontSize(e.target.value)}
//           placeholder="Enter font size"
//           className="fontsize-input"
//         />
//         </div>

//         <div style={{ marginTop: '20px' }}>
//           <label>
//             <input
//               type="radio"
//               value="manual"
//               checked={dropdownSource === 'manual'}
//               onChange={() => setDropdownSource('manual')}
//             />
//             Manual Entry
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="api"
//               checked={dropdownSource === 'api'}
//               onChange={() => setDropdownSource('api')}
//             />
//             From API
//           </label>
//         </div>

//         {dropdownSource === 'api' && (
//           <input
//             type="text"
//             value={dropdownUrl}
//             onChange={(e) => setDropdownUrl(e.target.value)}
//             placeholder="Enter API URL"
//             className="backend-input"
//           />
//         )}

//         {dropdownSource === 'manual' && (
//           <>
//             {dropdownOptions.map((option) => (
//               <div key={option.id} className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Dropdown Option"
//                   value={option.value}
//                   onChange={(e) =>
//                     setDropdownOptions(dropdownOptions.map((opt) => (opt.id === option.id ? { ...opt, value: e.target.value } : opt)))
//                   }
//                   className="input-field"
//                 />
//                 <button onClick={() => removeDropdownOption(option.id)} className="remove-btn">
//                   -
//                 </button>
//               </div>
//             ))}
//             <div className="add-input-group">
//               <input
//                 type="text"
//                 value={newOption}
//                 onChange={(e) => setNewOption(e.target.value)}
//                 placeholder="Enter new option"
//                 className="new-input-label"
//               />
//               <button onClick={addDropdownOption} className="add-btn">
//                 +
//               </button>
//             </div>
//           </>
//         )}

//         <div className="modal-actions">
//           <button onClick={handleModalSubmit} className="confirm-btn">
//             Save
//           </button>
//           <button onClick={closeSettingsModal} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//     </div>
//   )
// }

// export default DropdownSidebar

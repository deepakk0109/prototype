import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { StyleModel } from '../widgets/StyleModel';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setLineWidth, setLineHeight, setLineColor, setLineRotation,setWidgetStyles } from '../redux/slices/lineSlice';

Modal.setAppElement('#root');

const SimpleLine = ({widgetId,updateLineComponent,setIsPopupOpen, onWidthChange,LineWidth, LineHeight, LineColor, LineRotation,Styles }) => {
  const dispatch = useDispatch();
  const lineState= useSelector((state) =>state.line[widgetId]) || {};
  const { lineWidth, lineHeight, lineColor, lineRotation, widgetStyles} = lineState;
  useEffect(() => {
    dispatch(setLineHeight({ widgetId, lineHeight: LineHeight || '2px' }));
    dispatch(setLineWidth({ widgetId, lineWidth: LineWidth || '100%' }));
    dispatch(setLineColor({ widgetId, lineColor: LineColor || 'black' }));
    dispatch(setLineRotation({ widgetId, lineRotation: LineRotation || 0 }));
    dispatch(setWidgetStyles({widgetId,widgetStyles:Styles ||{
        // height:'',
        // width:'',
        // backgroundColor: '',
        // color: '',
        // padding: '',
        // margin:'',
        // fontSize:'',
        // border: '',
        // borderRadius: '',
    }}))
  }, [dispatch, widgetId,Styles]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [lineWidth, setLineWidth] = useState(width || '100%');
  // const [lineHeight, setLineHeight] = useState('2px'); // Default line height (thickness)
  // const [lineColor, setLineColor] = useState('#000000'); // Default line color
  // const [lineRotation, setLineRotation] = useState(0); // Default rotation
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  const openModal = () => {
    setModalIsOpen(true);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsPopupOpen(false);
  };

  const handleSave = () => {
    if (onWidthChange && typeof onWidthChange === 'function') {
      onWidthChange(lineWidth);
    }
    closeModal();
  };
  console.log("widgetStyles",widgetStyles);
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
            <LineSidebar
              updateLineComponent={updateLineComponent}
              widgetId={widgetId}
            />
          </Provider>
        </React.StrictMode>
      );
  };
  return (
    <div  onClick={()=>{toggleSettings()}} style={{ display: 'flex', width: '100%', height: '100%' }}>
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
          onClick={()=>{toggleSettings()}} 
        >
          ⚙️
        </button>
      )}

      <div
        id="line-widget"
        style={{
          ...widgetStyles,
          width: lineWidth,
          height: lineHeight,
          backgroundColor: lineColor,
          resize: 'both',
          overflow: 'hidden',
          transform: `rotate(${widgetStyles?.rotationAngle || lineRotation || 0}deg)`,
        }}
      />
    </div>
  );
};

const LineSidebar=({widgetId,updateLineComponent})=>{
  const dispatch = useDispatch();
  const lineState= useSelector((state) =>state.line[widgetId]) || {};
  const { lineWidth, lineHeight, lineColor, lineRotation, widgetStyles} = lineState;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openSettingsModal = () => {
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };

  return(
    <div style={{padding:'10px'}}>
    <h2>Line</h2>
    <label>Line Width (% or px):</label>
    <input
      type="text"
      value={lineWidth}
      onChange={(e) => dispatch(setLineWidth({widgetId,lineWidth:e.target.value}))}
      style={{...inputStyles, marginBottom: '10px', padding: '5px' }}
    />

    <label>Line Height (px):</label>
    <input
      type="text"
      value={lineHeight}
      onChange={(e) => dispatch(setLineHeight({widgetId,lineHeight:e.target.value}))}
      style={{...inputStyles, marginBottom: '10px',padding: '5px' }}
    />

    <label>Line Color:</label>
    <input
      type="color"
      value={lineColor}
      onChange={(e) => dispatch(setLineColor({widgetId,lineColor:e.target.value}))}
      style={{...inputStyles, marginBottom: '10px', padding: '5px' }}
    />
   <label>Line Rotation (degrees):</label>
    <input
      type="number"
      value={lineRotation}
      onChange={(e) =>  dispatch(setLineRotation({widgetId,lineRotation:e.target.value}))}
      style={{...inputStyles, marginBottom: '10px', padding: '5px' }}
    />
          <div style={{ marginBottom: '10px' }}>Add styles  <button onClick={openSettingsModal}  style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '1px 10px', cursor: 'pointer' }}>+</button></div>
         <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
          },
          content: {
            top: '50%',
            right: '0px', // Distance from the right edge
            left: 'auto', // Remove left alignment
            bottom: 'auto',
            marginRight: '0', // No margin on the right
            transform: 'translateY(-50%)', // Center vertically
            width: '200px',
            pointerEvents: 'auto', // Enable pointer events for the modal content
            overflowY:'auto',
          },
        }}
      >
        <StyleModel widgetId={widgetId} setWidgetStyles={setWidgetStyles} state={lineState}/>
        <button onClick={()=>{updateLineComponent(widgetId,lineWidth,lineHeight,lineColor,widgetStyles); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </Modal>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
        onClick={()=>{updateLineComponent(widgetId,lineWidth,lineHeight,lineColor,widgetStyles)}}
      >
        Save
      </button>
    </div>
    </div>
  )
}
const inputStyles={
  width: '90%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom:'5px',
}
export default SimpleLine;

import React, { useEffect, useState } from 'react'
import { setButtonLabel,setWidgetStyles,setOnClickAction } from '../redux/slices/buttonSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Modal from 'react-modal';
import { StyleModel } from '../widgets/StyleModel';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Button = ({onClick,widgetId,updateButtonComponent,ButtonLabel,OnClickAction,Styles}) => {
  const navigate = useNavigate();
  //states
  //button text
  // styles
  // link to/Navigate
  const dispatch=useDispatch();
  const buttonState=useSelector((state)=>state.button[widgetId])|| {}
  const {buttonLabel,widgetStyles,onClickAction}=buttonState;
  useEffect(() => {
    dispatch(setButtonLabel({ widgetId, buttonLabel: ButtonLabel || '' }));
    dispatch(setOnClickAction({ widgetId, onClickAction: OnClickAction || ''}));
    dispatch(setWidgetStyles({widgetId,widgetStyles:Styles ||{
        height:'100%',
        width:'100%',
        backgroundColor: '#94c2ff',
        // color: '',
        // padding: '',
        // margin:'',
        // fontSize:'',
        // border: '',
        borderRadius: '5px',
    }}))
  }, [widgetId,ButtonLabel,OnClickAction, dispatch,Styles]);

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
            <ButtonSidebar
              updateButtonComponent={updateButtonComponent}
              widgetId={widgetId}
            />
          </Provider>
        </React.StrictMode>
      );
  };
  return (
    <div onClick={()=>{onClick();toggleSettings() }}style={{width:widgetStyles?.width || '100%', height:widgetStyles?.height || '100%'}}>
        <button onClick={()=>{onClickAction && navigate(onClickAction)}} style={{...widgetStyles}} >
          {buttonLabel || 'Button'}
        </button>
    </div>
  )
}
const inputStyles={
  width: '90%',
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  // marginBottom:'5px',
}
const ButtonSidebar=({widgetId,updateButtonComponent})=>{
  const dispatch=useDispatch();
  const buttonState=useSelector((state)=>state.button[widgetId])|| {}
  const {buttonLabel,widgetStyles,onClickAction}=buttonState;
  const [selectedOnClickOption, setSelectedOnClickOption]= useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openSettingsModal = () => {
    setModalIsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalIsOpen(false);
  };
  return(
    <div style={{margin: '10px 10px'}}>
       <div  style={{ fontWeight: 'bold' }}>Button</div>
       <div style={{margin:'10px 0px'}}>
        <label>Button label: </label>
        <input 
        value={buttonLabel}
        onChange={(e)=> dispatch(setButtonLabel({widgetId,buttonLabel:e.target.value}))}
        style={{...inputStyles}}
        />
       </div>

       <div style={{margin:'10px 0px'}}>
        <label>onClick: </label>
        <select 
        type='dropdown'
        value={selectedOnClickOption}
        onChange={(e)=> setSelectedOnClickOption(e.target.value)}
        style={{...inputStyles}}
        >
          <option value="">Select</option>
        <option value="navigateTo">Navigate to</option>
        {/* <option value='codeBlock'>Code block</option> */}
        </select>
       </div>
       {/* <div style={{margin:'10px 0px'}}> */}
        {selectedOnClickOption==="navigateTo" &&( 
               <div style={{margin:'10px 0px'}}>
               <label>Navigate to </label>
               <input 
               value={onClickAction}
               onChange={(e)=>{dispatch(setOnClickAction({ widgetId, onClickAction:e.target.value}))}}
               style={{...inputStyles}}
               />
              </div>
        )}
       {/* </div> */}

       <div style={{margin:'10px 0px'}}>
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
            right: '10px', // Distance from the right edge
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
        <StyleModel widgetId={widgetId} setWidgetStyles={setWidgetStyles} state={buttonState}/>
        <button onClick={()=>{updateButtonComponent(widgetId,widgetStyles,buttonLabel,onClickAction);closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </Modal>
       </div>
       <button onClick={updateButtonComponent(widgetId,widgetStyles,buttonLabel,onClickAction)}>
        Save
       </button>
    </div>
  )
}

export {Button,ButtonSidebar}

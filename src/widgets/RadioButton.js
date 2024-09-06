import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import {
    setRadioOptions,
    setRadiodataSource,
    setRadioApiUrl,
    setRadioFontSize,
    setRadioLabel,
    setSelectedRadioOption,
    resetRadiobutton,
} from '../redux/slices/radiobuttonSlice'
import { useDispatch, useSelector } from 'react-redux';


const RadioButton = ({ updateRadioButtonWidget, widgetId, label, options, selectedOption,fontSize,dataSource,ApiUrl,isConfig }) => {
    const dispatch=useDispatch();
    const radiobuttonState=useSelector((state)=>state.radiobutton[widgetId]) || {};
    const {radioOptions,radiodataSource,radioApiUrl,radioFontSize,radioLabel,selectedRadioOption}=radiobuttonState;

    useEffect(() => {
        dispatch(setRadioOptions({ widgetId, radioOptions: options || [] }));
        dispatch(setRadiodataSource({ widgetId, radiodataSource: dataSource || 'manual' }));
        dispatch(setRadioApiUrl({ widgetId, radioApiUrl: ApiUrl || '' }));
        dispatch(setRadioFontSize({ widgetId, radioFontSize: fontSize || '16px' }));
        dispatch(setRadioLabel({ widgetId, radioLabel: label || '' }));
        dispatch(setSelectedRadioOption({widgetId,selectedRadioOption:selectedOption || ''}));
      }, [options, dataSource, ApiUrl, fontSize, label, dispatch, widgetId]);
    
      useEffect(()=>{
        if (radiodataSource === 'api' && radioApiUrl ) {
            fetchOptionsFromApi();

        }
    },[radiodataSource,radioApiUrl,dispatch,widgetId]);
    const [apiError, setApiError] = useState(null);


    const fetchOptionsFromApi = async () => {
        try {
            const response = await fetch(radioApiUrl);
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const apiData = await response.json(); // Parse the JSON response
            console.log('API Data:', apiData);
            
            // Assuming the data is an array of objects with 'id' and 'name' fields
            const fetchedOptions = apiData.map(item => ({ id: item.id, label: item.name }));
            
            // Dispatch the fetched options to the store
            console.log('Dispatching options:', fetchedOptions);
            dispatch(setRadioOptions({ widgetId, radioOptions: fetchedOptions }));
            
            setApiError(null); // Clear any previous errors
        } catch (error) {
            setApiError('Failed to fetch data from the API.');
            console.error('Fetch API error:', error); // Log the error for debugging
        }
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
                <RadioButtonSidebar
                  updateRadioButtonWidget={updateRadioButtonWidget}
                  widgetId={widgetId}
                  fetchOptionsFromApi={fetchOptionsFromApi}
                />
              </Provider>
            </React.StrictMode>
          );
      };
    return (
        <div  onClick={toggleSettings} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative', fontSize:radioFontSize}}>
           {isConfig && ( <button
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
        

            <div>
                <label>{radioLabel}</label>
                { radioOptions && radioOptions.length > 0 ?(radioOptions.map(option => (
                    <div key={option.id} style={{ margin: '5px 0', textAlign: 'left' }}>
                        <input
                            type="radio"
                            id={`${widgetId}-${option.id}`}
                            name={widgetId}
                            value={option.label}
                            checked={selectedRadioOption === option.label}
                            onChange={() => setSelectedRadioOption(option.label)}
                          
                        />
                          <label htmlFor={`${widgetId}-${option.id}`} style={{ marginLeft: '8px' }}>
                            {option.label}
                        </label>
                    </div>
                ))
            ):(<div>Radio..</div>)}
            </div>
        </div>
    );
};

const RadioButtonSidebar=({updateRadioButtonWidget,widgetId,fetchOptionsFromApi})=>{
    const dispatch=useDispatch();
    const radiobuttonState=useSelector((state)=>state.radiobutton[widgetId]) || {};
    const {radioOptions,radiodataSource,radioApiUrl,radioFontSize,radioLabel,selectedRadioOption}=radiobuttonState;
    const [apiError, setApiError] = useState(null);

    const handleSave = () => {
        if (radiodataSource === 'api' && radioApiUrl) {
            fetchOptionsFromApi();
        }
        if(updateRadioButtonWidget){
            updateRadioButtonWidget(radioLabel, radioOptions, selectedRadioOption,radiodataSource,radioApiUrl,radioFontSize, widgetId);
        }
    };

return(
    <div style={{padding:'10px'}}>
    <h2>Radio Button Configuration</h2>

    {/* Input for Radio Button Label */}
    <div style={{ marginTop: '10px' }}>
        <label>
            Label:
            <input
                type="text"
                value={radioLabel}
                onChange={(e) => dispatch(setRadioLabel({ widgetId, radioLabel: e.target.value }))}
                style={{ marginLeft: '10px', width: '100%' }}
            />
        </label>
    </div>

    <div style={{ marginBottom: '20px' }}>
    <label >Font Size(enter with unit):</label>
    <input
    type="text"
    value={radioFontSize}
    onChange={(e) => dispatch(setRadioFontSize({ widgetId, radioFontSize: e.target.value }))}
    placeholder="Enter font size"
    className="fontsize-input"
    />
    </div>

    {/* Data Source Selection */}
    <div style={{ marginTop: '10px' }}>
        <label>
            Data Source:
            <select value={radiodataSource} onChange={(e)=>dispatch(setRadiodataSource({ widgetId, radiodataSource: e.target.value }))} style={{ marginLeft: '10px', width: '100%' }}>
                <option value="manual">Manual</option>
                <option value="api">Connect to API</option>
            </select>
        </label>
    </div>

    {/* Manual Option Input */}
    {radiodataSource === 'manual' && (
        <div style={{ marginTop: '10px' }}>
            <label>
                Options (comma separated):
                <input
                    type="text"
                    value={radioOptions.map(opt => opt.label).join(', ')}
                    onChange={(e) => dispatch(setRadioOptions({widgetId,radioOptions:e.target.value.split(',').map((label, index) => ({ id: index, label: label.trim() }))}))}
                    style={{ marginLeft: '10px', width: '100%' }}
                />
            </label>
        </div>
    )}

    {/* API URL Input */}
    {radiodataSource === 'api' && (
        <div style={{ marginTop: '10px' }}>
            <label>
                API URL:
                <input
                    type="text"
                    value={radioApiUrl}
                    onChange={(e) => dispatch(setRadioApiUrl({ widgetId, radioApiUrl: e.target.value }))}
                    style={{ marginLeft: '10px', width: '100%' }}
                />
            </label>
            {apiError && <div style={{ color: 'red', marginTop: '10px' }}>{apiError}</div>}
        </div>
    )}

    <div style={{ marginTop: '20px' }}>
        <button
            onClick={handleSave}
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
)
}
export  {RadioButton,RadioButtonSidebar};

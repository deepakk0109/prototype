import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Import axios for API calls

// Ensure Modal is properly initialized
Modal.setAppElement('#root');

const RadioButton = ({ updateRadioButtonWidget, widgetId, label, options, selectedOption }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [radioLabel, setRadioLabel] = useState(label || '');
    const [radioOptions, setRadioOptions] = useState(options || []);
    const [selectedRadioOption, setSelectedRadioOption] = useState(selectedOption || '');
    const [dataSource, setDataSource] = useState('manual'); // 'manual' or 'api'
    const [apiUrl, setApiUrl] = useState('');
    const [apiError, setApiError] = useState(null);

    const handleSave = () => {
        // updateRadioButtonWidget(radioLabel, radioOptions, selectedRadioOption, widgetId);
        setIsModalOpen(false);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const fetchOptionsFromApi = async () => {
        try {
            const response = await axios.get(apiUrl);
            const apiData = response.data;
            // Assuming the data is an array of objects with 'id' and 'name' fields
            const fetchedOptions = apiData.map(item => ({ id: item.id, label: item.name }));
            setRadioOptions(fetchedOptions);
            setApiError(null); // Clear any previous errors
        } catch (error) {
            setApiError('Failed to fetch data from the API.');
        }
    };

    const handleDataSourceChange = (e) => {
        const selectedSource = e.target.value;
        setDataSource(selectedSource);
        if (selectedSource === 'api') {
            fetchOptionsFromApi();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
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
                onClick={handleButtonClick}
            >
                ⚙️
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '300px',
                        textAlign: 'center',
                    },
                }}
                contentLabel="Configure Radio Button"
            >
                <h2>Radio Button Configuration</h2>

                {/* Input for Radio Button Label */}
                <div style={{ marginTop: '10px' }}>
                    <label>
                        Label:
                        <input
                            type="text"
                            value={radioLabel}
                            onChange={(e) => setRadioLabel(e.target.value)}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                </div>

                {/* Data Source Selection */}
                <div style={{ marginTop: '10px' }}>
                    <label>
                        Data Source:
                        <select value={dataSource} onChange={handleDataSourceChange} style={{ marginLeft: '10px', width: '100%' }}>
                            <option value="manual">Manual</option>
                            <option value="api">Connect to API</option>
                        </select>
                    </label>
                </div>

                {/* Manual Option Input */}
                {dataSource === 'manual' && (
                    <div style={{ marginTop: '10px' }}>
                        <label>
                            Options (comma separated):
                            <input
                                type="text"
                                value={radioOptions.map(opt => opt.label).join(', ')}
                                onChange={(e) => setRadioOptions(e.target.value.split(',').map((label, index) => ({ id: index, label: label.trim() })))}
                                style={{ marginLeft: '10px', width: '100%' }}
                            />
                        </label>
                    </div>
                )}

                {/* API URL Input */}
                {dataSource === 'api' && (
                    <div style={{ marginTop: '10px' }}>
                        <label>
                            API URL:
                            <input
                                type="text"
                                value={apiUrl}
                                onChange={(e) => setApiUrl(e.target.value)}
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
                    <button
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            padding: '10px 15px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#ccc',
                            cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>

            {/* Render the Radio Buttons */}
            <div>
                {radioOptions.map(option => (
                    <div key={option.id} style={{ margin: '5px 0' }}>
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
                ))}
            </div>
        </div>
    );
};

export default RadioButton;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const StyleModel = ({ widgetId,state,setWidgetStyles}) => {
    const dispatch = useDispatch();
    // const checkboxState = useSelector((state) => state.checkbox[widgetId]) || {
    //     // label: 'Enter Label',
    //     // flag: false,
    //     // size: '24px',
    //     // labelFontSize: '16px',
    //     // widgetStyles:Styles,
    // };

    const { widgetStyles } = state;

    const handleSave = () => {
        // updateCheckboxWidget(label, flag, size, labelFontSize, widgetId,widgetStyles);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openSettingsModal = () => {
      setModalIsOpen(true);
    };
  
    const closeSettingsModal = () => {
      setModalIsOpen(false);
    };

    return (
        <div>
        <>
        <div style={{ marginBottom: '10px' }}>
          <label>Height:</label>
          <input
            type="text"
            value={widgetStyles.height}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  height: e.target.value,
                },
              })
            )
            }
            style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Width:</label>
          <input
            type="text"
            value={widgetStyles.width}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  width: e.target.value,
                },
              })
            )
            }
            style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Background color:</label>
          <input
            type="color"
            value={widgetStyles.backgroundColor}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  backgroundColor: e.target.value,
                },
              })
            )
            }
            style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Color:</label>
          <input
            type="color"
            value={widgetStyles.color}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  color: e.target.value,
                },
              })
            )
            }
            style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
            }}
          />
          
      
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Font Size</label>
          <input
            type="text"
            value={widgetStyles.fontSize}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  fontSize: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Padding:</label>
          <input
            type="text"
            value={widgetStyles.padding}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  padding: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Margin:</label>
          <input
            type="text"
            value={widgetStyles.margin}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  margin: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Border:</label>
          <input
            type="text"
            value={widgetStyles.border}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  border: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Border Radius:</label>
          <input
            type="text"
            value={widgetStyles.borderRadius}
            onChange={(e) =>
              dispatch(setWidgetStyles({ widgetId,
                widgetStyles: {
                  ...widgetStyles,
                  borderRadius: e.target.value,
                },
              })
            )
            }
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
          }}
          />
        </div>
        </>
         </div>
        
    );
};

export { StyleModel };


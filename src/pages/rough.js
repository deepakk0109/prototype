import React from 'react';
import ReactGridLayout from 'react-grid-layout';

function Canvas({ selectedLayout, selectedComponent, selectedWidget, savedlayout, isPreview, layout }) {

  // Conditional styles for the canvas-container based on preview mode
  const canvasStyles = isPreview
    ? {
        width: '65vw',
        height: 'calc(65vw * 9 / 16)',
        maxWidth: '100vw',
        maxHeight: '100vh',
        aspectRatio: '16/9',
        border: '1px solid #b2ebf2',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }
    : {
        width: '65vw',
        height: '100vh',
        border: '1px solid #b2ebf2',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
      };

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {selectedLayout && (
          <button
            onClick={() => {
              localStorage.setItem('layout', JSON.stringify(layout));
              handleSaveLayout();
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        )}
      </div>
      <div className="canvas-container" style={canvasStyles}>
        {selectedLayout || savedlayout ? (
          <ReactGridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={39}
            width={845}
            autoSize={true}
            isDraggable={isConfig || isPreview ? false : isOuterGridDraggableRef.current}
            isResizable={isConfig || isPreview ? false : isOuterGridDraggableRef.current}
            compactType={null}
            preventCollision={true}
            onLayoutChange={onOuterLayoutChange}
          >
            {layout.map(sectionLayout => (
              <div
                key={sectionLayout.i}
                data-grid={sectionLayout}
                className={`section ${sectionLayout.i}`}
                ref={(el) => (contentRefs.current[sectionLayout.i] = el)}
                contentEditable
                suppressContentEditableWarning={true}
                onMouseEnter={() => setHoveredSection(sectionLayout.i)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  border: hoveredSection === sectionLayout.i ? '2px dashed #007bff' : '2px solid transparent',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  backgroundColor: '#f0f0f0',
                  minHeight: '20px',
                  textAlign: 'center',
                  writingMode: sectionLayout.i.includes('vertical') ? 'vertical-lr' : 'horizontal-tb',
                  textOrientation: sectionLayout.i.includes('vertical') ? 'upright' : 'mixed',
                  overflow: 'auto',
                }}
              >
                {sectionLayout.elements.length > 0 && (
                  <ReactGridLayout
                    key={`nested-${sectionLayout.i}`}
                    className="components"
                    layout={sectionLayout.elements}
                    cols={12}
                    rowHeight={39}
                    width={845}
                    autoSize={true}
                    isDraggable={isConfig || isPreview ? false : isInnerGridDraggableRef.current}
                    isResizable={isConfig || isPreview ? false : isInnerGridDraggableRef.current}
                    compactType={null}
                    preventCollision={true}
                    onDragStart={onNestedDragStart}
                    onDragStop={onNestedDragStop}
                    onLayoutChange={(newLayout) => onNestedLayoutChange(newLayout, sectionLayout.i)}
                  >
                    {sectionLayout.elements.map(component => (
                      <div
                        key={component.i}
                        data-grid={component}
                        onMouseEnter={() => setHoveredSection(component.i)}
                        onMouseLeave={() => setHoveredSection(null)}
                        style={{
                          backgroundColor: '#ffffff',
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: '2px',
                          minHeight: '50px',
                        }}
                      >
                        {RenderComponent(component)}
                      </div>
                    ))}
                  </ReactGridLayout>
                )}
              </div>
            ))}
          </ReactGridLayout>
        ) : (
          <p>Please select a layout</p>
        )}
      </div>
    </div>
  );
}

export default Canvas;

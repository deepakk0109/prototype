import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesJSButtonComponent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize GrapesJS editor
    const editor = grapesjs.init({
      container: editorRef.current,
      height: '600px',
      fromElement: false,
      storageManager: { autoload: 0 },
      blockManager: {
        appendTo: '#blocks',
      },
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'save-db',
                className: 'btn-save',
                label: 'Save',
                command: 'save-db',
              },
            ],
          },
        ],
      },
    });

    // Add a custom block for the button
    editor.BlockManager.add('custom-button', {
      label: 'Button',
      content: '<button class="my-button">Click me</button>',
      category: 'Basic',
    });

    return () => editor.destroy();
  }, []);

  return (
    <div>
      <div id="blocks"></div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default GrapesJSButtonComponent;

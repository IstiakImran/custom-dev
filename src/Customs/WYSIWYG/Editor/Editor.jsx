// import React from 'react';

// function Editor({ elements, addElement, updateElementStyles, parentIndex = [] }) {
//     const handleAddElement = (type) => {
//         addElement(parentIndex, type);
//     };

//     const handleStyleChange = (index, style) => {
//         const updatedIndex = [...parentIndex, index];
//         updateElementStyles(updatedIndex, style);
//     };

//     return (
//         <div className="editor">
//             <div className="controls">
//                 <button onClick={() => handleAddElement('div')}>Add Div</button>
//                 <button onClick={() => handleAddElement('a')}>Add Anchor</button>
//                 <button onClick={() => handleAddElement('blockquote')}>Add Block Quote</button>
//                 <button onClick={() => handleAddElement('audio')}>Add Audio</button>
//                 <button onClick={() => handleAddElement('img')}>Add Image</button>
//                 <button onClick={() => handleAddElement('p')}>Add Paragraph</button>
//                 <button onClick={() => handleAddElement('h1')}>Add Heading</button>
//             </div>
//             {elements.map((element, index) => (
//                 <div key={index} className="style-controls">
//                     <h4>Element {index + 1} ({element.type})</h4>
//                     <label>
//                         Color:
//                         <input type="color" onChange={(e) => handleStyleChange(index, { color: e.target.value })} />
//                     </label>
//                     <label>
//                         Font Size:
//                         <input type="number" onChange={(e) => handleStyleChange(index, { fontSize: e.target.value + 'px' })} />
//                     </label>
//                     {/* Add more style controls here */}
//                     {element.type === 'div' && (
//                         <Editor
//                             elements={element.children}
//                             addElement={addElement}
//                             updateElementStyles={updateElementStyles}
//                             parentIndex={[...parentIndex, index]}
//                         />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Editor;

import React, { useState } from 'react';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 300px;
`;

const ControlsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Editor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      styles: {},
      content: '',
    };
    setElements([...elements, newElement]);
  };

  const handleStyleChange = (e) => {
    if (selectedElement) {
      const updatedElements = elements.map(el =>
        el.id === selectedElement.id ? { ...el, styles: { ...el.styles, [e.target.name]: e.target.value } } : el
      );
      setElements(updatedElements);
    }
  };

  const handleContentChange = (e) => {
    if (selectedElement) {
      const updatedElements = elements.map(el =>
        el.id === selectedElement.id ? { ...el, content: e.target.value } : el
      );
      setElements(updatedElements);
    }
  };

  const handleLayoutChange = (e) => {
    if (selectedElement) {
      const updatedElements = elements.map(el =>
        el.id === selectedElement.id ? { ...el, styles: { ...el.styles, display: e.target.value } } : el
      );
      setElements(updatedElements);
    }
  };

  const saveConfiguration = () => {
    localStorage.setItem('layoutConfig', JSON.stringify(elements));
  };

  const loadConfiguration = () => {
    const savedConfig = localStorage.getItem('layoutConfig');
    if (savedConfig) {
      setElements(JSON.parse(savedConfig));
    }
  };

  const generateCode = () => {
    let html = '';
    elements.forEach(el => {
      html += `<${el.type} style="${Object.entries(el.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}">${el.content}</${el.type}>\n`;
    });
    alert(html);
  };

  return (
    <EditorWrapper>
      <ControlsWrapper>
        <Button onClick={() => addElement('a')}>Add Anchor</Button>
        <Button onClick={() => addElement('blockquote')}>Add Block Quote</Button>
        <Button onClick={() => addElement('audio')}>Add Audio</Button>
        <Button onClick={() => addElement('img')}>Add Image</Button>
        <Button onClick={() => addElement('p')}>Add Paragraph</Button>
        <Button onClick={() => addElement('h1')}>Add Heading</Button>
        <Button onClick={saveConfiguration}>Save</Button>
        <Button onClick={loadConfiguration}>Load</Button>
        <Button onClick={generateCode}>Generate Code</Button>
      </ControlsWrapper>

      <PreviewWrapper>
        {elements.map(el => (
          <div
            key={el.id}
            onClick={() => setSelectedElement(el)}
            style={el.styles}
          >
            {React.createElement(el.type, {}, el.content || el.type)}
          </div>
        ))}
      </PreviewWrapper>

      {selectedElement && (
        <div>
          <h3>Edit Styles</h3>
          <label>
            Color:
            <input type="color" name="color" onChange={handleStyleChange} />
          </label>
          <label>
            Font Size:
            <input type="number" name="fontSize" onChange={handleStyleChange} />
          </label>
          <label>
            Layout:
            <select name="display" onChange={handleLayoutChange}>
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
            </select>
          </label>
          <label>
            Content:
            <input type="text" name="content" onChange={handleContentChange} />
          </label>
        </div>
      )}
    </EditorWrapper>
  );
};

export default Editor;

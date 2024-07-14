import React from 'react';

function Editor({ elements, addElement, updateElementStyles, parentIndex = [] }) {
    const handleAddElement = (type) => {
        addElement(parentIndex, type);
    };

    const handleStyleChange = (index, style) => {
        const updatedIndex = [...parentIndex, index];
        updateElementStyles(updatedIndex, style);
    };

    return (
        <div className="editor">
            <div className="controls">
                <button onClick={() => handleAddElement('div')}>Add Div</button>
                <button onClick={() => handleAddElement('a')}>Add Anchor</button>
                <button onClick={() => handleAddElement('blockquote')}>Add Block Quote</button>
                <button onClick={() => handleAddElement('audio')}>Add Audio</button>
                <button onClick={() => handleAddElement('img')}>Add Image</button>
                <button onClick={() => handleAddElement('p')}>Add Paragraph</button>
                <button onClick={() => handleAddElement('h1')}>Add Heading</button>
            </div>
            {elements.map((element, index) => (
                <div key={index} className="style-controls">
                    <h4>Element {index + 1} ({element.type})</h4>
                    <label>
                        Color:
                        <input type="color" onChange={(e) => handleStyleChange(index, { color: e.target.value })} />
                    </label>
                    <label>
                        Font Size:
                        <input type="number" onChange={(e) => handleStyleChange(index, { fontSize: e.target.value + 'px' })} />
                    </label>
                    {/* Add more style controls here */}
                    {element.type === 'div' && (
                        <Editor
                            elements={element.children}
                            addElement={addElement}
                            updateElementStyles={updateElementStyles}
                            parentIndex={[...parentIndex, index]}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Editor;

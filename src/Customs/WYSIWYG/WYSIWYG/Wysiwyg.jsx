import React, { useState } from 'react';
import './Wysiwyg.css';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';

function Wysiwyg() {
    const [elements, setElements] = useState([]);

    const addElement = (parentIndex, type) => {
        const newElement = { type, styles: {}, children: [] };
        const newElements = [...elements];

        if (parentIndex.length === 0) {
            newElements.push(newElement);
        } else {
            let current = newElements;
            for (let i = 0; i < parentIndex.length - 1; i++) {
                current = current[parentIndex[i]].children;
            }
            current[parentIndex[parentIndex.length - 1]].children.push(newElement);
        }

        setElements(newElements);
    };

    const updateElementStyles = (index, styles) => {
        const newElements = [...elements];
        let current = newElements;

        for (let i = 0; i < index.length - 1; i++) {
            current = current[index[i]].children;
        }
        current[index[index.length - 1]].styles = { ...current[index[index.length - 1]].styles, ...styles };

        setElements(newElements);
    };

    return (
        <div className="Wysiwyg">
            <Editor
                elements={elements}
                addElement={addElement}
                updateElementStyles={updateElementStyles}
            />
            <Preview elements={elements} />
        </div>
    );
}

export default Wysiwyg;

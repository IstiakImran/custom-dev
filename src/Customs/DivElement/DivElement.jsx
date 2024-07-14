// DivElement.jsx
import React, { useState } from 'react';

const DivElement = ({ element }) => {
    const [children, setChildren] = useState(element.children);
    const [style, setStyle] = useState(element.style);

    const addChild = () => {
        const newChild = { id: Date.now(), children: [], style: {} };
        setChildren([...children, newChild]);
    };

    const updateStyle = (e) => {
        const { name, value } = e.target;
        setStyle({ ...style, [name]: value });
    };

    return (
        <div style={style} className="div-element">
            <div className="controls">
                <button onClick={addChild}>Add Child</button>
                <input name="backgroundColor" placeholder="Background Color" onChange={updateStyle} />
                <input name="fontSize" placeholder="Font Size" onChange={updateStyle} />
                <input name="margin" placeholder="Margin" onChange={updateStyle} />
                <input name="padding" placeholder="Padding" onChange={updateStyle} />
                <select name="display" onChange={updateStyle}>
                    <option value="">Display</option>
                    <option value="flex">Flex</option>
                    <option value="grid">Grid</option>
                </select>
                {style.display === 'flex' && (
                    <>
                        <select name="flexDirection" onChange={updateStyle}>
                            <option value="">Direction</option>
                            <option value="row">Row</option>
                            <option value="column">Column</option>
                        </select>
                        <select name="justifyContent" onChange={updateStyle}>
                            <option value="">Justify Content</option>
                            <option value="flex-start">Flex Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">Flex End</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                        </select>
                        <select name="alignItems" onChange={updateStyle}>
                            <option value="">Align Items</option>
                            <option value="flex-start">Flex Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">Flex End</option>
                            <option value="stretch">Stretch</option>
                        </select>
                    </>
                )}
                {style.display === 'grid' && (
                    <>
                        <input name="gridTemplateColumns" placeholder="Grid Columns" onChange={updateStyle} />
                        <input name="gridTemplateRows" placeholder="Grid Rows" onChange={updateStyle} />
                    </>
                )}
            </div>
            {children.map((child) => (
                <DivElement key={child.id} element={child} />
            ))}
        </div>
    );
};

export default DivElement;

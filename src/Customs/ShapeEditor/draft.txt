// src/ShapeEditor.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './ShapeEditor.css';

const ShapeEditor = () => {
    const [points, setPoints] = useState([
        { x: 50, y: 50 },
        { x: 150, y: 50 },
        { x: 150, y: 150 },
        { x: 50, y: 150 },
    ]);

    const handleDrag = (index, e, ui) => {
        const newPoints = [...points];
        newPoints[index] = { x: ui.x, y: ui.y };
        setPoints(newPoints);
    };

    const generatePath = () => {
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
        return path;
    };

    return (
        <div className="shape-editor">
            <svg width="200" height="200">
                <path d={generatePath()} fill="lightblue" stroke="black" />
                {points.map((point, index) => (
                    <Draggable
                        key={index}
                        position={{ x: point.x, y: point.y }}
                        onDrag={(e, ui) => handleDrag(index, e, ui)}
                    >
                        <circle cx={0} cy={0} r={5} fill="red" />
                    </Draggable>
                ))}
            </svg>
            <div className="code-output">
                <h3>HTML:</h3>
                <code>
                    {`<svg width="200" height="200">
            <path d="${generatePath()}" fill="lightblue" stroke="black" />
          </svg>`}
                </code>
                <h3>CSS:</h3>
                <code>{`.shape { fill: lightblue; stroke: black; }`}</code>
            </div>
        </div>
    );
};

export default ShapeEditor;

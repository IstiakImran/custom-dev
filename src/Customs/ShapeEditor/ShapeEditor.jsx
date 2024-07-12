// src/ShapeEditor.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './ShapeEditor.css';

const ShapeEditor = () => {
    const [points, setPoints] = useState([
        { x: 50, y: 0 },  // top-left horizontal
        { x: 150, y: 0 }, // top-right horizontal
        { x: 150, y: 200 }, // bottom-left horizontal
        { x: 50, y: 200 }, // bottom-right horizontal
        { x: 0, y: 50 },  // left-top vertical
        { x: 200, y: 70 }, // right-top vertical
        { x: 200, y: 150 }, // right-bottom vertical
        { x: 0, y: 120 } // left-bottom vertical
    ]);

    const handleDrag = (index, e, ui) => {
        const newPoints = [...points];
        newPoints[index] = { x: ui.x, y: ui.y };
        setPoints(newPoints);
    };

    const generateBorderRadius = () => {
        const horizontal = points.slice(0, 4).map((p, i) => `${i == 1 || i == 2 ? Math.abs(100 - Math.round(p.x / 2)) : Math.abs(Math.round(p.x / 2))}%`).join(' ');
        const vertical = points.slice(4).map((p, i) => `${i == 3 || i == 2 ? Math.abs(100 - Math.round(p.y / 2)) : Math.abs(Math.round(p.y / 2))}%`).join(' ');
        return `${horizontal} / ${vertical}`;
    };

    const getBounds = (index) => {
        switch (index) {
            case 0:
            case 1:
                return { left: 0, right: 200, top: 0, bottom: 0 }; // top horizontal
            case 2:
            case 3:
                return { left: 0, right: 200, top: 200, bottom: 200 }; // bottom horizontal
            case 4:  // left vertical-top
                return { left: 0, right: 0, top: 0, bottom: 200 }; // left vertical
            case 5:  // right vertical-top
                return { left: 200, right: 200, top: 0, bottom: 200 }; // right vertical
            case 6: // right vertical-bottom
                return { left: 200, right: 200, top: 0, bottom: 200 }; // right vertical
            case 7:  // left vertical-bottom
                return { left: 0, right: 0, top: 0, bottom: 200 }; // left vertical
            default:
                return {};
        }
    };

    return (
        <div className="shape-editor">
            <div
                className="shape"
                style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'lightblue',
                    borderRadius: generateBorderRadius(),
                    position: 'relative'
                }}>
                {points.map((point, index) => {
                    const axis = index < 4 ? 'x' : 'y'; // first 4 points move horizontally, next 4 points move vertically
                    return (
                        <Draggable
                            key={index}
                            position={{ x: point.x, y: point.y }}
                            onDrag={(e, ui) => handleDrag(index, e, ui)}
                            bounds={getBounds(index)}
                            axis={axis}
                        >
                            <div className="draggable-point" style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red' }} />
                        </Draggable>
                    );
                })}
            </div>
            <div className="code-output">
                <h3>CSS:</h3>
                <code>{`border-radius: ${generateBorderRadius()};`}</code>
            </div>
        </div>
    );
};

export default ShapeEditor;

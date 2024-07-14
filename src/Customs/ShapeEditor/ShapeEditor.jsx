// src/ShapeEditor.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './ShapeEditor.css';

const ShapeEditor = () => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [points, setPoints] = useState([
        { x: 50, y: 0 },      // top-left horizontal
        { x: 150, y: 0 },     // top-right horizontal
        { x: 150, y: 200 },   // bottom-right horizontal
        { x: 50, y: 200 },    // bottom-left horizontal
        { x: 0, y: 50 },      // left-top vertical
        { x: 200, y: 70 },    // right-top vertical
        { x: 200, y: 150 },   // right-bottom vertical
        { x: 0, y: 120 }      // left-bottom vertical
    ]);

    const handleDrag = (index, e, ui) => {
        const newPoints = [...points];
        newPoints[index] = { x: ui.x, y: ui.y };
        setPoints(newPoints);
    };

    const handleWidthChange = (event) => {
        const newWidth = parseInt(event.target.value, 10) || 0; // Default to 0 if input is not a number
        setWidth(newWidth);
        adjustPointsForSizeChange(newWidth, height);
    };

    const handleHeightChange = (event) => {
        const newHeight = parseInt(event.target.value, 10) || 0; // Default to 0 if input is not a number
        setHeight(newHeight);
        adjustPointsForSizeChange(width, newHeight);
    };

    const adjustPointsForSizeChange = (newWidth, newHeight) => {
        setPoints([
            { x: newWidth * 0.25, y: 0 },      // top-left horizontal
            { x: newWidth * 0.75, y: 0 },      // top-right horizontal
            { x: newWidth * 0.75, y: newHeight }, // bottom-right horizontal
            { x: newWidth * 0.25, y: newHeight }, // bottom-left horizontal
            { x: 0, y: newHeight * 0.25 },     // left-top vertical
            { x: newWidth, y: newHeight * 0.35 }, // right-top vertical
            { x: newWidth, y: newHeight * 0.75 }, // right-bottom vertical
            { x: 0, y: newHeight * 0.60 }      // left-bottom vertical
        ]);
    };

    const generateBorderRadius = () => {
        const horizontal = points.slice(0, 4).map(p => `${Math.round(p.x / width * 100)}%`).join(' ');
        const vertical = points.slice(4).map(p => `${Math.round(p.y / height * 100)}%`).join(' ');
        return `${horizontal} / ${vertical}`;
    };

    const getBounds = (index) => {
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
                return { left: 0, right: width, top: points[index].y, bottom: points[index].y }; // horizontal movement
            case 4:
            case 5:
            case 6:
            case 7:
                return { left: points[index].x, right: points[index].x, top: 0, bottom: height }; // vertical movement
            default:
                return {}; // should not happen
        }
    };

    return (
        <div className="shape-editor">
            <div style={{ margin: '10px' }}>
                <label>Width: </label>
                <input
                    type="number"
                    value={width}
                    onChange={handleWidthChange}
                    style={{ margin: '10px' }}
                />
                <label>Height: </label>
                <input
                    type="number"
                    value={height}
                    onChange={handleHeightChange}
                    style={{ margin: '10px' }}
                />
            </div>
            <div
                className="shape"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: 'lightblue',
                    borderRadius: generateBorderRadius(),
                    position: 'relative'
                }}>
                {points.map((point, index) => (
                    <Draggable
                        key={index}
                        position={{ x: point.x, y: point.y }}
                        onDrag={(e, ui) => handleDrag(index, e, ui)}
                        bounds={getBounds(index)}
                        axis={index < 4 ? 'x' : 'y'}
                    >
                        <div className="draggable-point" style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red' }} />
                    </Draggable>
                ))}
            </div>
            <div className="code-output">
                <h3>CSS:</h3>
                <code>{`border-radius: ${generateBorderRadius()};`}</code>
            </div>
        </div>
    );
};

export default ShapeEditor;

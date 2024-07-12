// // src/CustomBox.js
// import React, { useRef, useState } from 'react';
// import './CustomBox.css';

// const CustomBox = () => {
//     const [isResizing, setIsResizing] = useState(false);
//     const [boxStyle, setBoxStyle] = useState({
//         width: 200,
//         height: 200,
//         borderRadius: '0 0 0 0',
//     });
//     const boxRef = useRef(null);

//     const handleMouseDown = (e) => {
//         setIsResizing(true);
//     };

//     const handleMouseUp = (e) => {
//         setIsResizing(false);
//     };

//     const handleMouseMove = (e) => {
//         if (isResizing) {
//             const box = boxRef.current;
//             const rect = box.getBoundingClientRect();
//             setBoxStyle((prevStyle) => ({
//                 ...prevStyle,
//                 width: e.clientX - rect.left,
//                 height: e.clientY - rect.top,
//             }));
//         }
//     };

//     const handleContextMenu = (e) => {
//         e.preventDefault();
//         const borderRadius = prompt('Enter border radius (e.g., 10px 10px 10px 10px):', boxStyle.borderRadius);
//         if (borderRadius !== null) {
//             setBoxStyle((prevStyle) => ({
//                 ...prevStyle,
//                 borderRadius: borderRadius,
//             }));
//         }
//     };

//     return (
//         <div
//             ref={boxRef}
//             className="custom-box"
//             style={boxStyle}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onContextMenu={handleContextMenu}
//         >
//             <div className="resize-handle" />
//         </div>
//     );
// };

// export default CustomBox;


// src/CustomBox.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './CustomBox.css';

const CustomBox = () => {
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

    const generateClipPath = () => {
        const path = points.map(p => `${p.x}px ${p.y}px`).join(', ');
        return `polygon(${path})`;
    };

    return (
        <div className="shape-editor">
            <div className="custom-div" style={{ clipPath: generateClipPath() }}>
                <div className="content">Drag the red dots to reshape me!</div>
            </div>
            {points.map((point, index) => (
                <Draggable
                    key={index}
                    position={{ x: point.x, y: point.y }}
                    onDrag={(e, ui) => handleDrag(index, e, ui)}
                >
                    <div className="control-point" />
                </Draggable>
            ))}
            <div className="code-output">
                <h3>HTML:</h3>
                <code>
                    {`<div style="clip-path: ${generateClipPath()};">
  <div class="content">Drag the red dots to reshape me!</div>
</div>`}
                </code>
                <h3>CSS:</h3>
                <code>{`.custom-div { background-color: lightblue; position: relative; }
.content { padding: 20px; }
.control-point { width: 10px; height: 10px; background-color: red; position: absolute; border-radius: 50%; cursor: pointer; }`}</code>
            </div>
        </div>
    );
};

export default CustomBox;

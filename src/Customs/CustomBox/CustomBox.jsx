import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './CustomBox.css';

function CustomBox() {
    const [borderRadius, setBorderRadius] = useState({
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
    });
    const [customSize, setCustomSize] = useState(false);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [color1, setColor1] = useState('#FF0080');
    const [color2, setColor2] = useState('#8000FF');

    const handleDrag = (e, ui, position) => {
        // console.log(position);
        // console.log(ui);
        // console.log(e);
        let newRadius;
        if (position === 'top' || position === 'right') {
            // Increases as you drag right for top and as you drag down for right
            console.log(borderRadius[position], (position === 'top' ? ui.deltaX : ui.deltaY) / 3);
            newRadius = Math.round(Math.max(0, Math.min(100, borderRadius[position] + (position === 'top' ? ui.deltaX : ui.deltaY) / 3)));
        } else if (position === 'bottom') {
            // Decreases as you drag right
            newRadius = Math.round(Math.max(0, Math.min(100, borderRadius[position] - ui.deltaX / 3)));
        } else if (position === 'left') {
            // Increases as you drag up
            newRadius = Math.round(Math.max(0, Math.min(100, borderRadius[position] - ui.deltaY / 3)));
        }
        setBorderRadius(prev => ({ ...prev, [position]: newRadius }));
    };


    const borderRadiusString = `${borderRadius.top}% ${borderRadius.right}% ${borderRadius.bottom}% ${borderRadius.left}%`;

    return (
        <div className="CustomBox">
            <h1>8 Point Full Control</h1>
            <div className="shape-container" style={{ width: `${width}px`, height: `${height}px` }}>
                <div
                    className="shape"
                    style={{
                        borderRadius: borderRadiusString,
                        background: `linear-gradient(135deg, ${color1}, ${color2})`,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {['top', 'right', 'bottom', 'left'].map(position => (
                        <Draggable
                            key={position}
                            axis={position === 'top' || position === 'bottom' ? 'x' : 'y'}
                            bounds="parent"
                            onDrag={(e, ui) => handleDrag(e, ui, position)}
                        >
                            <div className={`handle ${position}`}
                                style={{
                                    backgroundColor: `${position === 'left' || position === 'top' ? color1 : color2}`,
                                }}
                            ></div>
                        </Draggable>
                    ))}
                </div>
            </div>
            <div className="controls">
                <label>Border-radius: {borderRadiusString}</label>
                <button onClick={() => navigator.clipboard.writeText(`border-radius: ${borderRadiusString};`)}>Copy</button>
                <label>
                    Custom size:
                    <input type="checkbox" checked={customSize} onChange={(e) => setCustomSize(e.target.checked)} />
                </label>
                {customSize && (
                    <>
                        <label>
                            Width:
                            <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} />
                        </label>
                        <label>
                            Height:
                            <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
                        </label>
                    </>
                )}
                <label>
                    Gradient Color 1:
                    <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
                </label>
                <label>
                    Gradient Color 2:
                    <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
                </label>
            </div>
        </div>
    );
}

export default CustomBox;

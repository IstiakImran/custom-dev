import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { SketchPicker } from 'react-color';
import 'react-resizable/css/styles.css';

const CardCreator = () => {
    const [cardSettings, setCardSettings] = useState({
        width: 300,
        height: 200,
        shape: 'rectangle',
        backgroundColor: '#ffffff',
        backgroundImage: '',
        border: {
            width: 1,
            color: '#000000',
            style: 'solid',
        },
        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        padding: 10,
        margin: 10,
    });

    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    const handleCardSettingsChange = (e) => {
        const { name, value } = e.target;
        setCardSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleBackgroundColorChange = (color) => {
        setCardSettings((prevSettings) => ({
            ...prevSettings,
            backgroundColor: color.hex,
        }));
    };

    const addTextBlock = () => {
        setElements((prevElements) => [
            ...prevElements,
            {
                id: Date.now(),
                type: 'text',
                content: 'New Text',
                fontSize: 16,
                color: '#000',
                x: 0,
                y: 0,
                fontFamily: 'Arial',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textAlign: 'left',
            },
        ]);
    };

    const addImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setElements((prevElements) => [
                    ...prevElements,
                    {
                        id: Date.now(),
                        type: 'image',
                        src: reader.result,
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        opacity: 1,
                        filters: {
                            grayscale: 0,
                            sepia: 0,
                            blur: 0,
                            brightness: 100,
                            contrast: 100,
                        },
                    },
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderElements = () => {
        return elements.map((element, index) => {
            if (element.type === 'text') {
                return (
                    <Draggable
                        key={element.id}
                        defaultPosition={{ x: element.x, y: element.y }}
                        onStop={(e, data) => {
                            const newElements = [...elements];
                            newElements[index].x = data.x;
                            newElements[index].y = data.y;
                            setElements(newElements);
                        }}
                    >
                        <div
                            onClick={() => setSelectedElement(index)}
                            style={{
                                fontSize: element.fontSize,
                                color: element.color,
                                fontFamily: element.fontFamily,
                                fontWeight: element.fontWeight,
                                fontStyle: element.fontStyle,
                                textAlign: element.textAlign,
                                cursor: 'pointer',
                                userSelect: 'none',
                            }}
                        >
                            {element.content}
                        </div>
                    </Draggable>
                );
            } else if (element.type === 'image') {
                return (
                    <Draggable
                        key={element.id}
                        defaultPosition={{ x: element.x, y: element.y }}
                        onStop={(e, data) => {
                            const newElements = [...elements];
                            newElements[index].x = data.x;
                            newElements[index].y = data.y;
                            setElements(newElements);
                        }}
                    >
                        <ResizableBox
                            width={element.width}
                            height={element.height}
                            lockAspectRatio
                            onResizeStop={(e, data) => {
                                const newElements = [...elements];
                                newElements[index].width = data.size.width;
                                newElements[index].height = data.size.height;
                                setElements(newElements);
                            }}
                        >
                            <img
                                src={element.src}
                                alt="custom"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    opacity: element.opacity,
                                    filter: `
                    grayscale(${element.filters.grayscale}%)
                    sepia(${element.filters.sepia}%)
                    blur(${element.filters.blur}px)
                    brightness(${element.filters.brightness}%)
                    contrast(${element.filters.contrast}%)
                  `,
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                }}
                                onClick={() => setSelectedElement(index)}
                            />
                        </ResizableBox>
                    </Draggable>
                );
            }
            return null;
        });
    };

    const updateElement = (index, newProperties) => {
        const updatedElements = [...elements];
        updatedElements[index] = { ...updatedElements[index], ...newProperties };
        setElements(updatedElements);
    };

    const renderTextCustomization = (element, index) => (
        <div key={element.id}>
            <input
                type="text"
                value={element.content}
                onChange={(e) => updateElement(index, { content: e.target.value })}
            />
            <input
                type="color"
                value={element.color}
                onChange={(e) => updateElement(index, { color: e.target.value })}
            />
            <input
                type="number"
                value={element.fontSize}
                onChange={(e) => updateElement(index, { fontSize: e.target.value })}
            />
            <select
                value={element.fontFamily}
                onChange={(e) => updateElement(index, { fontFamily: e.target.value })}
            >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                {/* Add more font options */}
            </select>
            <select
                value={element.fontWeight}
                onChange={(e) => updateElement(index, { fontWeight: e.target.value })}
            >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
            </select>
            <select
                value={element.fontStyle}
                onChange={(e) => updateElement(index, { fontStyle: e.target.value })}
            >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
            </select>
            <select
                value={element.textAlign}
                onChange={(e) => updateElement(index, { textAlign: e.target.value })}
            >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
            </select>
        </div>
    );

    const renderImageCustomization = (element, index) => (
        <div key={element.id}>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={element.opacity}
                onChange={(e) => updateElement(index, { opacity: e.target.value })}
            />
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={element.filters.grayscale}
                onChange={(e) => updateElement(index, { filters: { ...element.filters, grayscale: e.target.value } })}
            />
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={element.filters.sepia}
                onChange={(e) => updateElement(index, { filters: { ...element.filters, sepia: e.target.value } })}
            />
            <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={element.filters.blur}
                onChange={(e) => updateElement(index, { filters: { ...element.filters, blur: e.target.value } })}
            />
            <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={element.filters.brightness}
                onChange={(e) => updateElement(index, { filters: { ...element.filters, brightness: e.target.value } })}
            />
            <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={element.filters.contrast}
                onChange={(e) => updateElement(index, { filters: { ...element.filters, contrast: e.target.value } })}
            />
        </div>
    );

    const exportCard = (format) => {
        const cardElement = document.getElementById('card');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = cardSettings.width;
        canvas.height = cardSettings.height;

        // Draw background
        ctx.fillStyle = cardSettings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw elements
        elements.forEach((element) => {
            if (element.type === 'text') {
                ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
                ctx.fillStyle = element.color;
                ctx.textAlign = element.textAlign;
                ctx.fillText(element.content, element.x, element.y);
            } else if (element.type === 'image') {
                const img = new Image();
                img.src = element.src;
                img.onload = () => {
                    ctx.globalAlpha = element.opacity;
                    ctx.filter = `
            grayscale(${element.filters.grayscale}%)
            sepia(${element.filters.sepia}%)
            blur(${element.filters.blur}px)
            brightness(${element.filters.brightness}%)
            contrast(${element.filters.contrast}%)
          `;
                    ctx.drawImage(img, element.x, element.y, element.width, element.height);
                };
            }
        });

        // Export to desired format
        if (format === 'png') {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'card.png';
            link.click();
        } else if (format === 'jpeg') {
            const dataUrl = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'card.jpeg';
            link.click();
        } else if (format === 'svg') {
            // SVG export logic
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <label>
                    Card Width:
                    <input type="number" name="width" value={cardSettings.width} onChange={handleCardSettingsChange} />
                </label>
                <label>
                    Card Height:
                    <input type="number" name="height" value={cardSettings.height} onChange={handleCardSettingsChange} />
                </label>
                <label>
                    Background Color:
                    <SketchPicker color={cardSettings.backgroundColor} onChangeComplete={handleBackgroundColorChange} />
                </label>
                <label>
                    Box Shadow:
                    <input type="text" name="boxShadow" value={cardSettings.boxShadow} onChange={handleCardSettingsChange} />
                </label>
                <button onClick={addTextBlock}>Add Text</button>
                <input type="file" accept="image/*" onChange={addImage} />
            </div>

            {selectedElement !== null && elements[selectedElement].type === 'text' && (
                <div>{renderTextCustomization(elements[selectedElement], selectedElement)}</div>
            )}

            {selectedElement !== null && elements[selectedElement].type === 'image' && (
                <div>{renderImageCustomization(elements[selectedElement], selectedElement)}</div>
            )}

            <ResizableBox width={cardSettings.width} height={cardSettings.height}>
                <div
                    id="card"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: cardSettings.backgroundColor,
                        backgroundImage: `url(${cardSettings.backgroundImage})`,
                        border: `${cardSettings.border.width}px ${cardSettings.border.style} ${cardSettings.border.color}`,
                        boxShadow: cardSettings.boxShadow,
                        padding: cardSettings.padding,
                        margin: cardSettings.margin,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {renderElements()}
                </div>
            </ResizableBox>
            <button onClick={() => exportCard('png')}>Export as PNG</button>
            <button onClick={() => exportCard('jpeg')}>Export as JPEG</button>
        </div>
    );
};

export default CardCreator;

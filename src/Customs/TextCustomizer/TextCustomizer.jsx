import React, { useState } from 'react';
import './TextCustomizer.css';

const initialPresets = {
    outer: {
        standard: {
            'Basic Shadow': [
                { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: false, opacity: 1 }
            ],
            'Soft Shadow': [
                { x: 5, y: 5, blur: 10, spread: 0, color: '#555555', inset: false, opacity: 0.7 }
            ],
            'Hard Shadow': [
                { x: 15, y: 15, blur: 0, spread: 0, color: '#333333', inset: false, opacity: 1 }
            ],
            'Deep Shadow': [
                { x: 20, y: 20, blur: 20, spread: 0, color: '#000000', inset: false, opacity: 0.9 }
            ],
            'Left Shadow': [
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Right Shadow': [
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Top Shadow': [
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Bottom Shadow': [
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Top and Bottom Shadow': [
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 },
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Left and Right Shadow': [
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 },
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'All Sides Shadow': [
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 },
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 },
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 },
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 0.8 }
            ],
            'Long Shadow': [
                { x: 0, y: 20, blur: 20, spread: 0, color: '#000000', inset: false, opacity: 0.7 }
            ],
            'Soft Edge Shadow': [
                { x: 10, y: 10, blur: 30, spread: 0, color: '#000000', inset: false, opacity: 0.5 }
            ],
            'Colorful Shadow': [
                { x: 10, y: 10, blur: 10, spread: 0, color: '#ff0000', inset: false, opacity: 0.8 },
                { x: -10, y: -10, blur: 10, spread: 0, color: '#00ff00', inset: false, opacity: 0.8 },
                { x: 10, y: -10, blur: 10, spread: 0, color: '#0000ff', inset: false, opacity: 0.8 },
                { x: -10, y: 10, blur: 10, spread: 0, color: '#ffff00', inset: false, opacity: 0.8 }
            ]
        },
        neon: {
            'Neon Glow': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#03e9f4', inset: false, opacity: 1 }
            ],
            'Neon Pink': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#ff00ff', inset: false, opacity: 1 }
            ],
            'Neon Green': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#39ff14', inset: false, opacity: 1 }
            ],
            'Neon Red': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff0000', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff0000', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff0000', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#ff0000', inset: false, opacity: 1 }
            ],
            'Neon Blue': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#0000ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#0000ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#0000ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#0000ff', inset: false, opacity: 1 }
            ],
            'Neon Gradient': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 5, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#39ff14', inset: false, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#39ff14', inset: false, opacity: 1 }
            ],
            'Neon Dual Color': [
                { x: -5, y: -5, blur: 10, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
                { x: 5, y: 5, blur: 10, spread: 0, color: '#ff00ff', inset: false, opacity: 1 }
            ],
            'Neon Multi-Color': [
                { x: -5, y: -5, blur: 10, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
                { x: 5, y: 5, blur: 10, spread: 0, color: '#ff00ff', inset: false, opacity: 1 },
                { x: 0, y: 10, blur: 10, spread: 0, color: '#39ff14', inset: false, opacity: 1 }
            ]
        }
    },
    inner: {
        standard: {
            'Inset Shadow': [
                { x: 5, y: 5, blur: 10, spread: 0, color: '#555555', inset: true, opacity: 0.7 }
            ],
            'Inset Deep Shadow': [
                { x: 10, y: 10, blur: 15, spread: 0, color: '#000000', inset: true, opacity: 0.9 }
            ],
            'Inset Left Shadow': [
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset Right Shadow': [
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset Top Shadow': [
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset Bottom Shadow': [
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset Top and Bottom Shadow': [
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 },
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset Left and Right Shadow': [
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 },
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ],
            'Inset All Sides Shadow': [
                { x: 0, y: 10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 },
                { x: 0, y: -10, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 },
                { x: 10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 },
                { x: -10, y: 0, blur: 10, spread: 0, color: '#000000', inset: true, opacity: 0.8 }
            ]
        },
        neon: {
            'Neon Inner Glow': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#03e9f4', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#03e9f4', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#03e9f4', inset: true, opacity: 1 }
            ],
            'Neon Pink Inner': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff00ff', inset: true, opacity: 1 }
            ],
            'Neon Green Inner': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#39ff14', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#39ff14', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#39ff14', inset: true, opacity: 1 }
            ],
            'Neon Red Inner': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff0000', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff0000', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff0000', inset: true, opacity: 1 }
            ],
            'Neon Inner Gradient': [
                { x: 0, y: 0, blur: 5, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 5, spread: 0, color: '#39ff14', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 25, spread: 0, color: '#39ff14', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 50, spread: 0, color: '#39ff14', inset: true, opacity: 1 },
                { x: 0, y: 0, blur: 200, spread: 0, color: '#39ff14', inset: true, opacity: 1 }
            ],
            'Neon Inner Dual Color': [
                { x: -5, y: -5, blur: 10, spread: 0, color: '#03e9f4', inset: true, opacity: 1 },
                { x: 5, y: 5, blur: 10, spread: 0, color: '#ff00ff', inset: true, opacity: 1 }
            ],
            'Neon Inner Multi-Color': [
                { x: -5, y: -5, blur: 10, spread: 0, color: '#03e9f4', inset: true, opacity: 1 },
                { x: 5, y: 5, blur: 10, spread: 0, color: '#ff00ff', inset: true, opacity: 1 },
                { x: 0, y: 10, blur: 10, spread: 0, color: '#39ff14', inset: true, opacity: 1 }
            ]
        }
    }
};
const TextCustomizer = () => {
    const [presets, setPresets] = useState(initialPresets);
    const [presetType, setPresetType] = useState('outer');
    const [presetCategory, setPresetCategory] = useState('standard');
    const [selectedPreset, setSelectedPreset] = useState('Basic Shadow');
    const [boxShadows, setBoxShadows] = useState(initialPresets.outer.standard['Basic Shadow']);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [colorFormat, setColorFormat] = useState('rgba');
    const [boxColor, setBoxColor] = useState('#ffffff');

    const [text, setText] = useState('Customizable Text');
    const [fontSize, setFontSize] = useState(16);
    const [fontWeight, setFontWeight] = useState(400);
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
    const [textAlign, setTextAlign] = useState('left');
    const [textTransform, setTextTransform] = useState('none');
    const [textDecoration, setTextDecoration] = useState('none');
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [wordSpacing, setWordSpacing] = useState(0);
    const [textIndent, setTextIndent] = useState(0);
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textShadow, setTextShadow] = useState('none');
    const [boxShadow, setBoxShadow] = useState('none');
    const [animation, setAnimation] = useState('none');

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const selectPreset = (preset, type, category) => {
        setPresetType(type);
        setPresetCategory(category);
        setSelectedPreset(preset);
        setBoxShadows(presets[type][category][preset]);
    };

    const handleShadowChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedShadows = boxShadows.map((shadow, i) => (
            i === index ? { ...shadow, [name]: type === 'checkbox' ? checked : parseFloat(value) } : shadow
        ));
        setBoxShadows(updatedShadows);
    };

    const handleColorChange = (index, e) => {
        const { value } = e.target;
        const updatedShadows = boxShadows.map((shadow, i) => (
            i === index ? { ...shadow, color: value } : shadow
        ));
        setBoxShadows(updatedShadows);
    };

    const handleTextChange = (e) => setText(e.target.value);
    const handleFontSizeChange = (e) => setFontSize(e.target.value);
    const handleFontWeightChange = (e) => setFontWeight(e.target.value);
    const handleFontStyleChange = (e) => setFontStyle(e.target.value);
    const handleFontFamilyChange = (e) => setFontFamily(e.target.value);
    const handleTextAlignChange = (e) => setTextAlign(e.target.value);
    const handleTextTransformChange = (e) => setTextTransform(e.target.value);
    const handleTextDecorationChange = (e) => setTextDecoration(e.target.value);
    const handleLetterSpacingChange = (e) => setLetterSpacing(e.target.value);
    const handleLineHeightChange = (e) => setLineHeight(e.target.value);
    const handleWordSpacingChange = (e) => setWordSpacing(e.target.value);
    const handleTextIndentChange = (e) => setTextIndent(e.target.value);
    const handleTextColorChange = (e) => setTextColor(e.target.value);
    const handleBackgroundColorChange = (e) => setBackgroundColor(e.target.value);
    const handleTextShadowChange = (e) => setTextShadow(e.target.value);
    const handleBoxShadowChange = (e) => setBoxShadow(e.target.value);
    const handleAnimationChange = (e) => setAnimation(e.target.value);

    const convertColor = (color, format, opacity) => {
        if (format === 'rgb' || format === 'rgba') {
            const [r, g, b] = hexToRgb(color);
            if (format === 'rgb') {
                return `rgb(${r}, ${g}, ${b})`;
            } else {
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
        }
        return color;
    };

    const handleAddShadow = () => {
        setBoxShadows([...boxShadows, { x: 0, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 1 }]);
    };

    const handleRemoveShadow = (index) => {
        setBoxShadows(boxShadows.filter((_, i) => i !== index));
    };

    const handleSavePreset = () => {
        setPresets((prev) => ({
            ...prev,
            [presetType]: {
                ...prev[presetType],
                [presetCategory]: {
                    ...prev[presetType][presetCategory],
                    [selectedPreset]: boxShadows
                }
            }
        }));
    };

    const handleCopy = () => {
        const shadowString = boxShadows.map((shadow) => {
            const [r, g, b] = hexToRgb(shadow.color);
            return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px rgba(${r}, ${g}, ${b}, ${shadow.opacity})`;
        }).join(', ');
        navigator.clipboard.writeText(`box-shadow: ${shadowString};`);
        alert('Box-shadow CSS copied to clipboard!');
    };

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    const cssCode = `
    .custom-text {
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      font-family: ${fontFamily};
      text-align: ${textAlign};
      text-transform: ${textTransform};
      text-decoration: ${textDecoration};
      letter-spacing: ${letterSpacing}px;
      line-height: ${lineHeight};
      word-spacing: ${wordSpacing}px;
      text-indent: ${textIndent}px;
      color: ${textColor};
      background-color: ${backgroundColor};
      text-shadow: ${textShadow};
      box-shadow: ${boxShadows.map((shadow) => {
        const color = convertColor(shadow.color, colorFormat, shadow.opacity);
        return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${color}`;
    }).join(', ')};
      animation: ${animation};
    }
  `;

    return (
        <div className="TextCustomizer">
            <h1>Custom Box Text Generator</h1>
            <div className="container">
                <div className="presets">
                    <h2>Box Shadow Presets</h2>
                    <div className="preset-list">
                        {Object.keys(presets).map((type) => (
                            <div key={type} className="preset-category">
                                <button onClick={() => toggleCategory(type)}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                                <div className={`children ${expandedCategories[type] ? 'active' : ''}`}>
                                    {Object.keys(presets[type]).map((category) => (
                                        <div key={category} className="preset-category">
                                            <button onClick={() => toggleCategory(`${type}-${category}`)}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                            <div className={`children ${expandedCategories[`${type}-${category}`] ? 'active' : ''}`}>
                                                {Object.keys(presets[type][category]).map((preset) => (
                                                    <button
                                                        key={preset}
                                                        className={selectedPreset === preset ? 'active' : ''}
                                                        onClick={() => selectPreset(preset, type, category)}
                                                    >
                                                        {preset}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="controls">
                    <div className="controls-header">
                        <div className="controls-buttons">
                            <button onClick={handleAddShadow}>Add Shadow</button>
                            <button onClick={handleCopy}>Copy CSS</button>
                            <button onClick={handleSavePreset}>Save Preset</button>
                        </div>
                        <label>
                            Box Color:
                            <input
                                type="color"
                                value={boxColor}
                                onChange={(e) => setBoxColor(e.target.value)}
                            />
                            <input
                                type="text"
                                value={boxColor}
                                onChange={(e) => setBoxColor(e.target.value)}
                            />
                        </label>
                    </div>
                    {boxShadows.map((shadow, index) => (
                        <div key={index} className="shadow-control">
                            <h3>Shadow {index + 1}</h3>
                            <label>
                                Horizontal Offset (x):
                                <input
                                    type="range"
                                    name="x"
                                    min="-100"
                                    max="100"
                                    value={shadow.x}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                                <input
                                    type="number"
                                    name="x"
                                    min="-100"
                                    max="100"
                                    value={shadow.x}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <label>
                                Vertical Offset (y):
                                <input
                                    type="range"
                                    name="y"
                                    min="-100"
                                    max="100"
                                    value={shadow.y}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                                <input
                                    type="number"
                                    name="y"
                                    min="-100"
                                    max="100"
                                    value={shadow.y}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <label>
                                Blur Radius (blur):
                                <input
                                    type="range"
                                    name="blur"
                                    min="0"
                                    max="100"
                                    value={shadow.blur}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                                <input
                                    type="number"
                                    name="blur"
                                    min="0"
                                    max="100"
                                    value={shadow.blur}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <label>
                                Spread Radius (spread):
                                <input
                                    type="range"
                                    name="spread"
                                    min="-50"
                                    max="50"
                                    value={shadow.spread}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                                <input
                                    type="number"
                                    name="spread"
                                    min="-50"
                                    max="50"
                                    value={shadow.spread}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <label>
                                Color:
                                <input
                                    type="color"
                                    name="color"
                                    value={shadow.color}
                                    onChange={(e) => handleColorChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="color"
                                    value={shadow.color}
                                    onChange={(e) => handleColorChange(index, e)}
                                />
                            </label>
                            <label>
                                Opacity:
                                <input
                                    type="range"
                                    name="opacity"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={shadow.opacity}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                                <input
                                    type="number"
                                    name="opacity"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={shadow.opacity}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <label>
                                Inset:
                                <input
                                    type="checkbox"
                                    name="inset"
                                    checked={shadow.inset}
                                    onChange={(e) => handleShadowChange(index, e)}
                                />
                            </label>
                            <button onClick={() => handleRemoveShadow(index)}>Remove Shadow</button>
                        </div>
                    ))}
                    <div>
                        <label>
                            Text:
                            <input type="text" value={text} onChange={handleTextChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Font Size:
                            <input type="range" min="8" max="72" value={fontSize} onChange={handleFontSizeChange} />
                            {fontSize}px
                        </label>
                    </div>
                    <div>
                        <label>
                            Font Weight:
                            <input type="range" min="100" max="900" step="100" value={fontWeight} onChange={handleFontWeightChange} />
                            {fontWeight}
                        </label>
                    </div>
                    <div>
                        <label>
                            Font Style:
                            <select value={fontStyle} onChange={handleFontStyleChange}>
                                <option value="normal">Normal</option>
                                <option value="italic">Italic</option>
                                <option value="oblique">Oblique</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Font Family:
                            <input type="text" value={fontFamily} onChange={handleFontFamilyChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Align:
                            <select value={textAlign} onChange={handleTextAlignChange}>
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                                <option value="justify">Justify</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Transform:
                            <select value={textTransform} onChange={handleTextTransformChange}>
                                <option value="none">None</option>
                                <option value="uppercase">Uppercase</option>
                                <option value="lowercase">Lowercase</option>
                                <option value="capitalize">Capitalize</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Decoration:
                            <select value={textDecoration} onChange={handleTextDecorationChange}>
                                <option value="none">None</option>
                                <option value="underline">Underline</option>
                                <option value="overline">Overline</option>
                                <option value="line-through">Line-through</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Letter Spacing:
                            <input type="range" min="0" max="10" value={letterSpacing} onChange={handleLetterSpacingChange} />
                            {letterSpacing}px
                        </label>
                    </div>
                    <div>
                        <label>
                            Line Height:
                            <input type="range" min="1" max="3" step="0.1" value={lineHeight} onChange={handleLineHeightChange} />
                            {lineHeight}
                        </label>
                    </div>
                    <div>
                        <label>
                            Word Spacing:
                            <input type="range" min="0" max="20" value={wordSpacing} onChange={handleWordSpacingChange} />
                            {wordSpacing}px
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Indent:
                            <input type="range" min="0" max="50" value={textIndent} onChange={handleTextIndentChange} />
                            {textIndent}px
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Color:
                            <input type="color" value={textColor} onChange={handleTextColorChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Background Color:
                            <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Text Shadow:
                            <input type="text" value={textShadow} onChange={handleTextShadowChange} placeholder="e.g., 2px 2px 5px red" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Box Shadow:
                            <input type="text" value={boxShadow} onChange={handleBoxShadowChange} placeholder="e.g., 2px 2px 5px gray" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Animation:
                            <input type="text" value={animation} onChange={handleAnimationChange} placeholder="e.g., bounce 2s infinite" />
                        </label>
                    </div>
                </div>
                <div className="preview">
                    <div
                        className="box"
                        style={{
                            backgroundColor: boxColor,
                            boxShadow: boxShadows.map((shadow) => {
                                const color = convertColor(shadow.color, colorFormat, shadow.opacity);
                                return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${color}`;
                            }).join(', '),
                            fontSize: `${fontSize}px`,
                            fontWeight: fontWeight,
                            fontStyle: fontStyle,
                            fontFamily: fontFamily,
                            textAlign: textAlign,
                            textTransform: textTransform,
                            textDecoration: textDecoration,
                            letterSpacing: `${letterSpacing}px`,
                            lineHeight: lineHeight,
                            wordSpacing: `${wordSpacing}px`,
                            textIndent: `${textIndent}px`,
                            color: textColor,
                            // backgroundColor: backgroundColor,
                            textShadow: textShadow,
                            // boxShadow: boxShadow,
                            animation: animation,
                        }}
                    >
                        {text}
                    </div>
                    <code>
                        {cssCode}
                    </code>
                    <button onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS Code</button>
                </div>
            </div>
        </div>
    );
};

export default TextCustomizer;

import React, { useState } from 'react';
import './BackgroundCustomizer.css';

const presets = {
    basic: [
        { color: '#ff0000' },
        { color: '#00ff00' },
        { color: '#0000ff' },
        { color: '#ffff00' },
        { color: '#ff00ff' },
    ],
    pro: [
        { degree: 45, stops: [{ color: '#ff0000', percentage: 0 }, { color: '#0000ff', percentage: 100 }] },
        { degree: 90, stops: [{ color: '#00ff00', percentage: 0 }, { color: '#ffff00', percentage: 50 }, { color: '#0000ff', percentage: 100 }] },
        { degree: 135, stops: [{ color: '#ff00ff', percentage: 0 }, { color: '#00ffff', percentage: 100 }] },
    ],
    advanced: [
        {
            gradients: [
                { direction: 'to right', stops: [{ color: '#ff0000', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
                { direction: 'to top left', stops: [{ color: '#00ff00', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
                { direction: 'to top right', stops: [{ color: '#0000ff', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
            ],
            blendMode: 'screen',
        },
        {
            gradients: [
                { direction: 'to bottom', stops: [{ color: '#ff0000', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
                { direction: 'to bottom left', stops: [{ color: '#00ff00', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
                { direction: 'to bottom right', stops: [{ color: '#0000ff', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
            ],
            blendMode: 'multiply',
        },
    ],
};

const BackgroundCustomizer = () => {
    const [mode, setMode] = useState('basic');
    const [color1, setColor1] = useState('#ffffff');
    const [degree, setDegree] = useState(90);
    const [direction, setDirection] = useState('to right');
    const [stops, setStops] = useState([
        { color: '#ffffff', percentage: 0 },
        { color: '#ffffff', percentage: 100 },
    ]);
    const [gradients, setGradients] = useState([
        { direction: 'to right', stops: [{ color: 'red', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
        { direction: 'to top left', stops: [{ color: 'lime', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
        { direction: 'to top right', stops: [{ color: 'blue', percentage: 0 }, { color: 'transparent', percentage: 100 }] },
    ]);
    const [blendMode, setBlendMode] = useState('screen');
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);

    const handleColorChange = (index, color) => {
        const newStops = stops.slice();
        newStops[index].color = color;
        setStops(newStops);
    };

    const handlePercentageChange = (index, percentage) => {
        const newStops = stops.slice();
        newStops[index].percentage = percentage;
        setStops(newStops);
    };

    const addStop = () => {
        setStops([...stops, { color: '#ffffff', percentage: 100 }]);
    };

    const removeStop = (index) => {
        if (stops.length > 2) {
            setStops(stops.filter((_, i) => i !== index));
        }
    };

    const handleGradientChange = (index, field, value) => {
        setGradients(prevGradients => {
            const newGradients = [...prevGradients];
            if (field === 'direction') {
                newGradients[index].direction = value;
            } else if (field === 'degree') {
                newGradients[index].degree = value;
            } else if (field === 'color') {
                newGradients[index].stops[value.stopIndex].color = value.color;
            } else if (field === 'percentage') {
                newGradients[index].stops[value.stopIndex].percentage = value.percentage;
            }
            return newGradients;
        });
    };

    const addGradient = () => {
        setGradients([...gradients, { direction: 'to right', stops: [{ color: '#ffffff', percentage: 0 }, { color: 'transparent', percentage: 100 }] }]);
    };

    const removeGradient = (index) => {
        setGradients(gradients.filter((_, i) => i !== index));
    };

    const backgroundStyle = {
        background:
            mode === 'basic'
                ? color1
                : mode === 'pro'
                    ? `linear-gradient(${direction === 'degree' ? `${degree}deg` : direction}, ${stops.map(
                        (stop) => `${stop.color} ${stop.percentage}%`
                    ).join(', ')})`
                    : gradients
                        .map(
                            (gradient) =>
                                `linear-gradient(${gradient.direction === 'degree' ? `${degree}deg` : gradient.direction}, ${gradient.stops
                                    .map((stop) => `${stop.color} ${stop.percentage}%`)
                                    .join(', ')})`
                        )
                        .join(', '),
        backgroundBlendMode: mode === 'advanced' ? blendMode : 'normal',
        width: `${width}px`,
        height: `${height}px`,
    };

    const generateCSSCode = () => {
        return mode === 'basic'
            ? `background-color: ${color1};`
            : mode === 'pro'
                ? `background-image: linear-gradient(${direction === 'degree' ? `${degree}deg` : direction}, ${stops
                    .map((stop) => `${stop.color} ${stop.percentage}%`)
                    .join(', ')});`
                : `background-image: ${gradients
                    .map(
                        (gradient) =>
                            `linear-gradient(${gradient.direction === 'degree' ? `${degree}deg` : gradient.direction}, ${gradient.stops
                                .map((stop) => `${stop.color} ${stop.percentage}%`)
                                .join(', ')})`
                    )
                    .join(', ')}; background-blend-mode: ${blendMode};`;
    };

    const applyPreset = (preset) => {
        if (mode === 'basic') {
            setColor1(preset.color);
        } else if (mode === 'pro') {
            setDegree(preset.degree);
            setStops(preset.stops);
        } else if (mode === 'advanced') {
            setGradients(preset.gradients);
            setBlendMode(preset.blendMode);
        }
    };

    return (
        <div className="customizer">
            <div className="mode-selector">
                <label>
                    Mode:
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="basic">Basic</option>
                        <option value="pro">Pro</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </label>
            </div>
            <div className="sidebar">
                <h3>Presets</h3>
                <div className="preset-buttons">
                    {presets[mode].map((preset, index) => (
                        <button key={index} onClick={() => applyPreset(preset)}>
                            Preset {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="controls">
                <form className="gradient-form">
                    <div>
                        <label>
                            Width:
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                min="0"
                            />
                        </label>
                        <label>
                            Height:
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                min="0"
                            />
                        </label>
                    </div>
                    {mode === 'basic' && (
                        <div>
                            <label>
                                Background Color:
                                <input
                                    type="color"
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                    {mode === 'pro' && (
                        <>
                            <div>
                                <label>
                                    Direction:
                                    <select
                                        value={direction}
                                        onChange={(e) => setDirection(e.target.value)}
                                    >
                                        <option value="to right">To Right</option>
                                        <option value="to left">To Left</option>
                                        <option value="to top">To Top</option>
                                        <option value="to bottom">To Bottom</option>
                                        <option value="to top right">To Top Right</option>
                                        <option value="to top left">To Top Left</option>
                                        <option value="to bottom right
">To Bottom Right</option>
                                        <option value="to bottom left">To Bottom Left</option>
                                        <option value="degree">Degree</option>
                                    </select>
                                </label>
                                {direction === 'degree' && (
                                    <label>
                                        Degree:
                                        <input
                                            type="number"
                                            value={degree}
                                            onChange={(e) => setDegree(e.target.value)}
                                            min="0"
                                            max="360"
                                        />
                                    </label>
                                )}
                            </div>
                            {stops.map((stop, index) => (
                                <div key={index}>
                                    <label>
                                        Color {index + 1}:
                                        <input
                                            type="color"
                                            value={stop.color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Percentage {index + 1}:
                                        <input
                                            type="number"
                                            value={stop.percentage}
                                            onChange={(e) => handlePercentageChange(index, e.target.value)}
                                            min="0"
                                            max="100"
                                        />
                                    </label>
                                    {stops.length > 2 && (
                                        <button type="button" onClick={() => removeStop(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addStop}>
                                Add Color Stop
                            </button>
                        </>
                    )}
                    {mode === 'advanced' && (
                        <>
                            {gradients.map((gradient, index) => (
                                <div key={index}>
                                    <label>
                                        Gradient Direction:
                                        <select
                                            value={gradient.direction}
                                            onChange={(e) =>
                                                handleGradientChange(index, 'direction', e.target.value)
                                            }
                                        >
                                            <option value="to right">To Right</option>
                                            <option value="to left">To Left</option>
                                            <option value="to top">To Top</option>
                                            <option value="to bottom">To Bottom</option>
                                            <option value="to top right">To Top Right</option>
                                            <option value="to top left">To Top Left</option>
                                            <option value="to bottom right">To Bottom Right</option>
                                            <option value="to bottom left">To Bottom Left</option>
                                            <option value="degree">Degree</option>
                                        </select>
                                        {gradient.direction === 'degree' && (
                                            <label>
                                                Degree:
                                                <input
                                                    type="number"
                                                    value={gradient.degree || 0}
                                                    onChange={(e) => handleGradientChange(index, 'degree', parseInt(e.target.value))}
                                                    min="0"
                                                    max="360"
                                                />
                                            </label>
                                        )}
                                    </label>
                                    {gradient.stops.map((stop, stopIndex) => (
                                        <div key={stopIndex}>
                                            <label>
                                                Color:
                                                <input
                                                    type="color"
                                                    value={stop.color}
                                                    onChange={(e) =>
                                                        handleGradientChange(index, 'color', {
                                                            stopIndex: stopIndex,
                                                            color: e.target.value,
                                                        })
                                                    }
                                                />
                                            </label>
                                            <label>
                                                Percentage:
                                                <input
                                                    type="number"
                                                    value={stop.percentage}
                                                    onChange={(e) =>
                                                        handleGradientChange(index, 'percentage', {
                                                            stopIndex: stopIndex,
                                                            percentage: e.target.value,
                                                        })
                                                    }
                                                    min="0"
                                                    max="100"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => removeGradient(index)}>
                                        Remove Gradient
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addGradient}>
                                Add Gradient
                            </button>
                            <div>
                                <label>
                                    Background Blend Mode:
                                    <select
                                        value={blendMode}
                                        onChange={(e) => setBlendMode(e.target.value)}
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="multiply">Multiply</option>
                                        <option value="screen">Screen</option>
                                        <option value="overlay">Overlay</option>
                                        <option value="darken">Darken</option>
                                        <option value="lighten">Lighten</option>
                                        <option value="color-dodge">Color Dodge</option>
                                        <option value="color-burn">Color Burn</option>
                                        <option value="hard-light">Hard Light</option>
                                        <option value="soft-light">Soft Light</option>
                                        <option value="difference">Difference</option>
                                        <option value="exclusion">Exclusion</option>
                                        <option value="hue">Hue</option>
                                        <option value="saturation">Saturation</option>
                                        <option value="color">Color</option>
                                        <option value="luminosity">Luminosity</option>
                                    </select>
                                </label>
                            </div>
                        </>
                    )}
                </form>
            </div>
            <div className="preview-container">
                <div className="gradient-preview" style={backgroundStyle}>
                    <h1>Gradient Preview</h1>
                </div>
            </div>
            <div className="code-preview">
                <h2>CSS Code</h2>
                <textarea readOnly value={generateCSSCode()} />
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(generateCSSCode());
                        alert('CSS code copied to clipboard!');
                    }}
                >
                    Copy CSS
                </button>
            </div>
        </div>
    );
};

export default BackgroundCustomizer;
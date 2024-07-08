import React, { useState } from 'react';
import './App.css';

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



const App = () => {
  const [presets, setPresets] = useState(initialPresets);
  const [presetType, setPresetType] = useState('outer');
  const [presetCategory, setPresetCategory] = useState('standard');
  const [selectedPreset, setSelectedPreset] = useState('Basic Shadow');
  const [boxShadows, setBoxShadows] = useState(initialPresets.outer.standard['Basic Shadow']);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [colorFormat, setColorFormat] = useState('rgba');
  const [boxColor, setBoxColor] = useState('#ffffff');

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

  const handleColorFormatChange = (e) => {
    setColorFormat(e.target.value);
  };

  const handleBoxColorChange = (e) => {
    setBoxColor(e.target.value);
  };

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

  return (
    <div className="App">
      <h1>Box Shadow Generator</h1>
      <div className="container">
        <div className="presets">
          <h2>Presets</h2>
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
                onChange={handleBoxColorChange}
              />
              <input
                type="text"
                value={boxColor}
                onChange={handleBoxColorChange}
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


        </div>
        <div className="preview">
          <div
            className="box"
            style={{
              backgroundColor: boxColor,
              boxShadow: boxShadows.map((shadow) => {
                const color = convertColor(shadow.color, colorFormat, shadow.opacity);
                return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${color}`;
              }).join(', ')
            }}
          ></div>
          <code>
            box-shadow: {boxShadows.map((shadow) => {
              const color = convertColor(shadow.color, colorFormat, shadow.opacity);
              return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${color}`;
            }).join(', ')};
          </code>
        </div>
      </div>
    </div>
  );
};

export default App;
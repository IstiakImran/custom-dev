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

  const handleShadowChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedShadows = boxShadows.map((shadow, i) => (
      i === index ? { ...shadow, [name]: type === 'checkbox' ? checked : (name === 'color' ? value : parseFloat(value)) } : shadow
    ));
    setBoxShadows(updatedShadows);
  };

  const handleAddShadow = () => {
    setBoxShadows([...boxShadows, { x: 0, y: 0, blur: 10, spread: 0, color: '#000000', inset: false, opacity: 1 }]);
  };

  const handleRemoveShadow = (index) => {
    setBoxShadows(boxShadows.filter((_, i) => i !== index));
  };

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    const newShadows = presets[presetType][presetCategory][preset];
    setBoxShadows(newShadows);
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
          <div>
            <label>
              <input
                type="radio"
                value="outer"
                checked={presetType === 'outer'}
                onChange={() => setPresetType('outer')}
              />
              Outer Box Shadows
            </label>
            <label>
              <input
                type="radio"
                value="inner"
                checked={presetType === 'inner'}
                onChange={() => setPresetType('inner')}
              />
              Inner Box Shadows
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="standard"
                checked={presetCategory === 'standard'}
                onChange={() => setPresetCategory('standard')}
              />
              Standard
            </label>
            <label>
              <input
                type="radio"
                value="neon"
                checked={presetCategory === 'neon'}
                onChange={() => setPresetCategory('neon')}
              />
              Neon
            </label>
          </div>
          <div className="preset-list">
            {Object.keys(presets[presetType][presetCategory]).map((preset) => (
              <button
                key={preset}
                className={selectedPreset === preset ? 'active' : ''}
                onClick={() => handlePresetChange(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
        <div className="controls">
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
                <span>{shadow.x}</span>
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
                <span>{shadow.y}</span>
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
                <span>{shadow.blur}</span>
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
                <span>{shadow.spread}</span>
              </label>
              <label>
                Color:
                <input
                  type="color"
                  name="color"
                  value={shadow.color}
                  onChange={(e) => handleShadowChange(index, e)}
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
                <span>{shadow.opacity}</span>
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
          <button onClick={handleAddShadow}>Add Shadow</button>
          <button onClick={handleCopy}>Copy CSS</button>
          <button onClick={handleSavePreset}>Save Preset</button>
        </div>
        <div className="preview">
          <div
            className="box"
            style={{
              boxShadow: boxShadows.map((shadow) => {
                const [r, g, b] = hexToRgb(shadow.color);
                return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px rgba(${r}, ${g}, ${b}, ${shadow.opacity})`;
              }).join(', ')
            }}
          ></div>
          <code>
            box-shadow: {boxShadows.map((shadow) => {
              const [r, g, b] = hexToRgb(shadow.color);
              return `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px rgba(${r}, ${g}, ${b}, ${shadow.opacity})`;
            }).join(', ')};
          </code>
        </div>
      </div>
    </div>
  );
};

export default App;

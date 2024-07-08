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

function App() {
  const [presets, setPresets] = useState(initialPresets);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const selectPreset = (preset) => {
    setSelectedPreset(preset);
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
                      <button onClick={() => toggleCategory(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                      <div className={`children ${expandedCategories[category] ? 'active' : ''}`}>
                        {Object.keys(presets[type][category]).map((preset) => (
                          <button
                            key={preset}
                            className={selectedPreset === preset ? 'active' : ''}
                            onClick={() => selectPreset(preset)}
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
          <h2>Controls</h2>
          <div className="shadow-control">
            <h3>{selectedPreset || 'No preset selected'}</h3>
            {/* Add your shadow controls here */}
          </div>
        </div>
        <div className="preview">
          <h2>Preview</h2>
          <div className="box" style={{ /* Add your box shadow styles here */ }}></div>
          <code>{/* Add your CSS code output here */}</code>
        </div>
      </div>
    </div>
  );
}

export default App;

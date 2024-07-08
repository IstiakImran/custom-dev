// // src/App.js
// import React, { useState } from 'react';
// import './App.css';

// const initialPresets = {
//   outer: {
//     'Basic Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Soft Shadow': { x: 5, y: 5, blur: 15, spread: 0, color: '#aaaaaa', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Hard Shadow': { x: 10, y: 10, blur: 0, spread: 0, color: '#000000', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Neon Glow': { x: 0, y: 0, blur: 10, spread: 0, color: '#00ff00', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Double Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Colorful Shadow': { x: 10, y: 10, blur: 20, spread: 0, color: 'rgba(255, 0, 0, 0.5)', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Distant Shadow': { x: 20, y: 20, blur: 10, spread: 0, color: '#555555', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     '3D Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Blurred Shadow': { x: 10, y: 10, blur: 15, spread: 0, color: '#999999', inset: false, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//   },
//   inner: {
//     'Basic Inset Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Soft Inset Shadow': { x: 5, y: 5, blur: 15, spread: 0, color: '#aaaaaa', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Hard Inset Shadow': { x: 10, y: 10, blur: 0, spread: 0, color: '#000000', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset Neon Glow': { x: 0, y: 0, blur: 10, spread: 0, color: '#00ff00', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset Double Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset Colorful Shadow': { x: 10, y: 10, blur: 20, spread: 0, color: 'rgba(255, 0, 0, 0.5)', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset Distant Shadow': { x: 20, y: 20, blur: 10, spread: 0, color: '#555555', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset 3D Shadow': { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//     'Inset Blurred Shadow': { x: 10, y: 10, blur: 15, spread: 0, color: '#999999', inset: true, opacity: 1, top: 0, bottom: 0, right: 0, left: 0 },
//   }
// };

// const App = () => {
//   const [presets, setPresets] = useState(initialPresets);
//   const [presetType, setPresetType] = useState('outer');
//   const [selectedPreset, setSelectedPreset] = useState('Basic Shadow');
//   const [boxShadow, setBoxShadow] = useState(initialPresets.outer['Basic Shadow']);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBoxShadow((prev) => ({ ...prev, [name]: name === 'color' ? value : parseFloat(value) }));
//   };

//   const handlePresetChange = (preset) => {
//     setSelectedPreset(preset);
//     setBoxShadow(presets[presetType][preset]);
//   };

//   const handleSavePreset = () => {
//     setPresets((prev) => ({
//       ...prev,
//       [presetType]: {
//         ...prev[presetType],
//         [selectedPreset]: boxShadow
//       }
//     }));
//   };

//   const handleCopy = () => {
//     const shadowString = `${boxShadow.inset ? 'inset ' : ''}${boxShadow.x}px ${boxShadow.y}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}${boxShadow.opacity < 1 ? ` ${boxShadow.opacity}` : ''}`;
//     navigator.clipboard.writeText(`box-shadow: ${shadowString};`);
//     alert('Box-shadow CSS copied to clipboard!');
//   };

//   const shadowString = `${boxShadow.inset ? 'inset ' : ''}${boxShadow.x}px ${boxShadow.y}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;

//   return (
//     <div className="App">
//       <h1>Box Shadow Generator</h1>
//       <div className="container">
//         <div className="controls">
//           <label>
//             Horizontal Offset (x):
//             <input
//               type="range"
//               name="x"
//               min="-100"
//               max="100"
//               value={boxShadow.x}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.x}</span>
//           </label>
//           <label>
//             Vertical Offset (y):
//             <input
//               type="range"
//               name="y"
//               min="-100"
//               max="100"
//               value={boxShadow.y}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.y}</span>
//           </label>
//           <label>
//             Blur Radius (blur):
//             <input
//               type="range"
//               name="blur"
//               min="0"
//               max="100"
//               value={boxShadow.blur}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.blur}</span>
//           </label>
//           <label>
//             Spread Radius (spread):
//             <input
//               type="range"
//               name="spread"
//               min="-50"
//               max="50"
//               value={boxShadow.spread}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.spread}</span>
//           </label>
//           <label>
//             Color:
//             <input
//               type="color"
//               name="color"
//               value={boxShadow.color}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Opacity:
//             <input
//               type="range"
//               name="opacity"
//               min="0"
//               max="1"
//               step="0.01"
//               value={boxShadow.opacity}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.opacity}</span>
//           </label>
//           <label>
//             Top Margin (top):
//             <input
//               type="range"
//               name="top"
//               min="0"
//               max="100"
//               value={boxShadow.top}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.top}</span>
//           </label>
//           <label>
//             Bottom Margin (bottom):
//             <input
//               type="range"
//               name="bottom"
//               min="0"
//               max="100"
//               value={boxShadow.bottom}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.bottom}</span>
//           </label>
//           <label>
//             Right Margin (right):
//             <input
//               type="range"
//               name="right"
//               min="0"
//               max="100"
//               value={boxShadow.right}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.right}</span>
//           </label>
//           <label>
//             Left Margin (left):
//             <input
//               type="range"
//               name="left"
//               min="0"
//               max="100"
//               value={boxShadow.left}
//               onChange={handleChange}
//             />
//             <span>{boxShadow.left}</span>
//           </label>
//           <label>
//             Inset:
//             <input
//               type="checkbox"
//               name="inset"
//               checked={boxShadow.inset}
//               onChange={(e) => setBoxShadow((prev) => ({ ...prev, inset: e.target.checked }))}
//             />
//           </label>
//           <button onClick={handleCopy}>Copy CSS</button>
//           <button onClick={handleSavePreset}>Save Preset</button>

//           <h2>Presets</h2>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="outer"
//                 checked={presetType === 'outer'}
//                 onChange={() => setPresetType('outer')}
//               />
//               Outer Box Shadows
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="inner"
//                 checked={presetType === 'inner'}
//                 onChange={() => setPresetType('inner')}
//               />
//               Inner Box Shadows
//             </label>
//           </div>

//           <div className="presets">
//             {Object.keys(presets[presetType]).map((preset) => (
//               <button
//                 key={preset}
//                 className={selectedPreset === preset ? 'active' : ''}
//                 onClick={() => handlePresetChange(preset)}
//               >
//                 {preset}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="preview">
//           <div
//             className="box"
//             style={{
//               boxShadow: `${boxShadow.inset ? 'inset ' : ''}${boxShadow.x}px ${boxShadow.y}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}${boxShadow.opacity < 1 ? ` ${boxShadow.opacity}` : ''}`,
//               marginTop: `${boxShadow.top}px`,
//               marginBottom: `${boxShadow.bottom}px`,
//               marginRight: `${boxShadow.right}px`,
//               marginLeft: `${boxShadow.left}px`,
//             }}
//           ></div>
//           <code>
//             box-shadow: {`${boxShadow.inset ? 'inset ' : ''}${boxShadow.x}px ${boxShadow.y}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}${boxShadow.opacity < 1 ? ` ${boxShadow.opacity}` : ''}`};
//             <br />
//             margin: {`${boxShadow.top}px ${boxShadow.right}px ${boxShadow.bottom}px ${boxShadow.left}px`};
//           </code>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// src/App.js
import React, { useState } from 'react';
import './App.css';

const initialPresets = {
  outer: {
    'Basic Shadow': [
      { x: 10, y: 10, blur: 5, spread: 0, color: '#888888', inset: false, opacity: 1 }
    ],
    'Neon Glow': [
      { x: 0, y: 0, blur: 5, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
      { x: 0, y: 0, blur: 25, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
      { x: 0, y: 0, blur: 50, spread: 0, color: '#03e9f4', inset: false, opacity: 1 },
      { x: 0, y: 0, blur: 200, spread: 0, color: '#03e9f4', inset: false, opacity: 1 }
    ]
  },
  inner: {}
};

const App = () => {
  const [presets, setPresets] = useState(initialPresets);
  const [presetType, setPresetType] = useState('outer');
  const [selectedPreset, setSelectedPreset] = useState('Basic Shadow');
  const [boxShadows, setBoxShadows] = useState(initialPresets.outer['Basic Shadow']);
  const [reflection, setReflection] = useState({ reflect: false, offset: 1, gradient: '#0005' });

  const handleShadowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedShadows = boxShadows.map((shadow, i) => (
      i === index ? { ...shadow, [name]: name === 'color' ? value : parseFloat(value) } : shadow
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
    setBoxShadows(presets[presetType][preset]);
  };

  const handleSavePreset = () => {
    setPresets((prev) => ({
      ...prev,
      [presetType]: {
        ...prev[presetType],
        [selectedPreset]: boxShadows
      }
    }));
  };

  const handleCopy = () => {
    const shadowString = boxShadows.map((shadow) =>
      `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.opacity < 1 ? ` ${shadow.opacity}` : ''}`
    ).join(', ');
    const reflectString = reflection.reflect ? `-webkit-box-reflect: below ${reflection.offset}px linear-gradient(transparent, ${reflection.gradient});` : '';
    navigator.clipboard.writeText(`box-shadow: ${shadowString}; ${reflectString}`);
    alert('Box-shadow CSS copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>Box Shadow Generator</h1>
      <div className="container">
        <div className="controls">
          {boxShadows.map((shadow, index) => (
            <div key={index}>
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
              {selectedPreset === 'Neon Glow' && (
                <button onClick={() => handleRemoveShadow(index)}>Remove Shadow</button>
              )}
            </div>
          ))}
          {selectedPreset === 'Neon Glow' && (
            <button onClick={handleAddShadow}>Add Shadow</button>
          )}
          <label>
            Reflect:
            <input
              type="checkbox"
              name="reflect"
              checked={reflection.reflect}
              onChange={(e) => setReflection({ ...reflection, reflect: e.target.checked })}
            />
          </label>
          {reflection.reflect && (
            <>
              <label>
                Reflect Offset:
                <input
                  type="range"
                  name="offset"
                  min="0"
                  max="10"
                  value={reflection.offset}
                  onChange={(e) => setReflection({ ...reflection, offset: parseFloat(e.target.value) })}
                />
                <span>{reflection.offset}</span>
              </label>
              <label>
                Reflect Gradient:
                <input
                  type="color"
                  name="gradient"
                  value={reflection.gradient}
                  onChange={(e) => setReflection({ ...reflection, gradient: e.target.value })}
                />
              </label>
            </>
          )}
          <button onClick={handleCopy}>Copy CSS</button>
          <button onClick={handleSavePreset}>Save Preset</button>

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

          <div className="presets">
            {Object.keys(presets[presetType]).map((preset) => (
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

        <div className="preview">
          <div
            className="box"
            style={{
              boxShadow: boxShadows.map((shadow) =>
                `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.opacity < 1 ? ` ${shadow.opacity}` : ''}`
              ).join(', '),
              WebkitBoxReflect: reflection.reflect ? `below ${reflection.offset}px linear-gradient(transparent, ${reflection.gradient})` : 'none'
            }}
          ></div>
          <code>
            box-shadow: {boxShadows.map((shadow) =>
              `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.opacity < 1 ? ` ${shadow.opacity}` : ''}`
            ).join(', ')};
            <br />
            {reflection.reflect && `-webkit-box-reflect: below ${reflection.offset}px linear-gradient(transparent, ${reflection.gradient});`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default App;

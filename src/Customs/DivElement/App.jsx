// App.jsx
import React, { useState } from 'react';
import DivElement from './DivElement';
'./DivElement.css'

const App = () => {
    const [elements, setElements] = useState([]);

    const addElement = () => {
        setElements([...elements, { id: Date.now(), children: [], style: {} }]);
    };

    return (
        <div>
            <button onClick={addElement}>Add Div</button>
            <div className="canvas">
                {elements.map((element) => (
                    <DivElement key={element.id} element={element} />
                ))}
            </div>
        </div>
    );
};

export default App;

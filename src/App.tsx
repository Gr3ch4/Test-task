import React, { useState, useCallback } from 'react';
import './App.css';


interface Param {
  id: number;
  name: string;
  type: 'string';  
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

function App() {
  const params: Param[] = [
    { id: 1, name: "Product Name", type: "string" },
    { id: 2, name: "Product Description", type: "string" }
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: "Table" },
      { paramId: 2, value: "This is a wooden table." }
    ]
  };

  const [model, setModel] = useState<Model>(initialModel);

  const getModel = useCallback(() => {
    console.log(model);
  }, [model]);

  const handleChange = (id: number, value: string): void => {
    const newParamValues = model.paramValues.map(paramValue =>
      paramValue.paramId === id ? { ...paramValue, value } : paramValue
    );
    setModel({ paramValues: newParamValues });
  };

  return (
    <div className="App">
      <h1>Param Editor</h1>
      {params.map(param => (
        <div key={param.id}>
          <label>{param.name}:</label>
          <input
            type="text"
            value={model.paramValues.find(p => p.paramId === param.id)?.value || ''}
            onChange={e => handleChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={getModel}>Get Model</button>
    </div>
  );
}

export default App;
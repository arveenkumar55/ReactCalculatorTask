import React, { useState } from 'react';

function App() {
  const [rows, setRows] = useState([{ operation: '+', enabled: true, value: 0 }]);
  const [result, setResult] = useState(0);

  // Function to add a new row
  const addRow = () => {
    const newRow = { operation: '+', enabled: true, value: 0 };
    setRows([...rows, newRow]);
  };

  // Function to remove a row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Function to toggle row enable/disable
  const toggleRow = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].enabled = !updatedRows[index].enabled;
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  // Function to handle input change for a row
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = parseInt(value);
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  // Function to calculate the result
  const calculateResult = (updatedRows) => {
    let result = 0;
    updatedRows.forEach((row) => {
      if (row.enabled) {
        result += row.operation === '+' ? row.value : -row.value;
      }
    });
    setResult(result);
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <button onClick={addRow}>Add Row</button>
      <ul>
        {rows.map((row, index) => (
          <li key={index}>
            <select
              name="operation"
              value={row.operation}
              onChange={(e) => handleInputChange(index, e)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="text"
              name="value"
              value={row.value}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button onClick={() => toggleRow(index)}>
              {row.enabled ? 'Disable' : 'Enable'}
            </button>
            <button onClick={() => removeRow(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;

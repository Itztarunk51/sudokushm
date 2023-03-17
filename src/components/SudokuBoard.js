import React from 'react';

function CurrentBoard({ puzzle, setPuzzle, solution }) {
  const handleChange = (event, row, col) => {
    const value = event.target.value;
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = value;
    setPuzzle(newPuzzle);
  };

  const renderCell = (row, col) => {
    const value = puzzle[row][col];
    const isFixed = value !== '0';
    const isSolution = solution && solution[row][col] === value;

    return (
      <input
        type="number"
        min="1"
        max="9"
        value={value === '0' ? '' : value}
        disabled={isFixed}
        readOnly={isFixed}
        className={`${isSolution ? 'solution' : ''} ${isFixed ? 'fixed' : ''}`}
        onChange={(event) => handleChange(event, row, col)}
      />
    );
  };

  return (
    <div>
      <h2>Current Board</h2>
      {puzzle && (
        <table>
          <tbody>
            {puzzle.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>
                    {renderCell(rowIndex, colIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CurrentBoard;

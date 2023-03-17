import React from 'react';

function DidThePlayerWin({ puzzle, solution }) {
  const didPlayerWin = () => {
    if (!puzzle) {
      return 'No board loaded';
    }

    if (!solution) {
      return 'No solution found';
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== solution[row][col]) {
          return 'No, try again';
        }
      }
    }

    return 'Yes, you won!';
  };

  return (
    <div>
      <h2>Did the player win?</h2>
      <p>{didPlayerWin()}</p>
    </div>
  );
}

export default DidThePlayerWin;

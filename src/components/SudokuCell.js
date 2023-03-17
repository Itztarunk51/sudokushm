import React from 'react';
import PropTypes from 'prop-types';
import './SudokuCell.css';

const SudokuCell = ({ value, isFixed }) => {
  const classes = ['sudoku-cell'];

  if (isFixed) {
    classes.push('sudoku-cell--fixed');
  }

  return (
    <div className={classes.join(' ')}>
      {value || ''}
    </div>
  );
};

SudokuCell.propTypes = {
  value: PropTypes.number,
  isFixed: PropTypes.bool,
};

export default SudokuCell;

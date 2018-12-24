import React from 'react';
import './index.css';

function Square(props) {
  let className = 'square';
  if (props.isWinningSquare) {
	className += ' winning-square';
  }
  
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
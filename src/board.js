import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { makeMove } from './actions';
import Square from './square';

class Board extends React.Component {
  renderSquare(i) {
    let isWinningSquare;
	if (this.props.winningSquares.includes(i)) {
	  isWinningSquare = true;
	}
	return (<Square 
			value={this.props.squares[i]}          
			onClick={() => this.props.dispatch(makeMove(i))}
			isWinningSquare={isWinningSquare}
			key={i}
		   />
	);
  }
  
  renderRow(i) {
	return [i, i + 1, i + 2].map((i) => this.renderSquare(i));
  }
  
  renderBoard() {
	return [0, 3, 6].map((i)=> {
		return (
		  <div key={i} className="board-row">
            {this.renderRow(i)}
          </div>
		);
	});
  }

  render() {
    return (
      <div>{this.renderBoard()}</div>
    );
  }
}

export default connect()(Board);
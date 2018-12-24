import React from 'react';
import './index.css';
import Board from './board';
import { connect } from 'react-redux';
import { goToMove } from './actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  asc: true,
    };
  }
  
  sort() {
	this.setState({asc: !this.state.asc});
  }
  
  render() {
    let history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);
	
	let move = Array(history.length).fill(null);
	move = move.map((move, index) => index);
	
	if (this.state.asc === false) {
	  history = history.slice().reverse();
	  move = move.reverse();
	}
	
	const moves = history.map((step, index) => {
      const desc = move[index] ?
        'Go to move #' + move[index] + ' Location(' + step.location + ')':
        'Go to game start';
		let className = null;
		if (move[index] === this.props.stepNumber) {
		  className = 'current-move';
		}
		return (
			<li key={move[index]}>
			  <button className={className} onClick={() => this.props.dispatch(goToMove(move[index]))}>{desc}</button>
			</li>
        );
	});
		
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
	} else if (this.props.stepNumber === 9) {
	  status = 'Draw';
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }
	
	let winningSquares = Array(0);
	if (winner) {
		winningSquares = getWinningSquares(current.squares);
	}

  
    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
			winningSquares={winningSquares}
          />

        </div>
        <div className="game-info">
		  <button onClick={() => this.sort()}>SORT</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
	  
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinningSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

const mapStateToProps = state => ({
  history: state.history,
  xIsNext: state.xIsNext,
  stepNumber: state.stepNumber
})

export default connect(mapStateToProps)(Game);

const initialState = {
  history: [{
        squares: Array(9).fill(null),
		location: null,
      }],
  xIsNext: true,
  stepNumber: 0
}

function ticTacToe(state = initialState, action) {
  switch (action.type) {
    case 'MAKE_MOVE':
	  const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

	  if (calculateWinner(squares) || squares[action.index]) {
        return state;
      }

	  squares[action.index] = state.xIsNext ? 'X' : 'O';
	  const location = getLocation(action.index);
	
      return Object.assign({}, state, {
        history: history.concat([{
			squares: squares,
			location: location,
		  }]),
		stepNumber: history.length,
		xIsNext: !state.xIsNext
	  })
	  
	case 'GO_TO_MOVE':
	  return Object.assign({}, state, {
        stepNumber: action.step,
        xIsNext: (action.step % 2) === 0
	  })
	  
	  
    default:
      return state
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

function getLocation(index) {
	if (index === 0) {
		return '0, 0';
	} else if (index === 1) {
		return '0, 1';
	} else if (index === 2) {
		return '0, 2';
	} else if (index === 3) {
		return '1, 0';
	} else if (index === 4) {
		return '1, 1';
	} else if (index === 5) {
		return '1, 2';
	} else if (index === 6) {
		return '2, 0';
	} else if (index === 7) {
		return '2, 1';
	} else if (index === 8) {
		return '2, 2';
	} else {
		return null;
	}
}

export default ticTacToe;
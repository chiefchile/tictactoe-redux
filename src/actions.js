
export function makeMove(index) {
  return { type: 'MAKE_MOVE', index }
}

export function goToMove(step) {
  return { type: 'GO_TO_MOVE', step }
}
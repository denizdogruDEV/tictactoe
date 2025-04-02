
const initialGameBoard = [
	[null, null, null],
  	[null, null, null],
  	[null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) {
	let gameBoard = initialGameBoard

	for (const turn of turns) {
		const {square, player} = turn
		const {row, col} = square
		gameBoard[row][col] = player
	}
	
  	return <ol id="game-board">
		{gameBoard.map((row, rowIndex) => 
			<li key={rowIndex} className="game-row">
				<ol>
					{row.map((playerSymbol, colIndex) =>
						<li key={colIndex} className="game-cell">
							<button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
						</li>)}
				</ol>
		</li>)}
	</ol>;
}

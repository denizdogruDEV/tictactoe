const initialGameBoard = [
	[null, null, null],
  	[null, null, null],
  	[null, null, null],
];

export default function GameBoard() {
  	return <ol id="game-board">
		{initialGameBoard.map((row, rowIndex) => 
			<li key={rowIndex} className="game-row">
				<ol>
					{row.map((playerSymbol, colIndex) =>
						<li key={colIndex} className="game-cell">
							<button>{playerSymbol}</button>
						</li>)}
				</ol>
		</li>)}
	</ol>;
}

import { useState } from 'react';
  
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver'

const initialGameBoard = [
	[null, null, null],
  	[null, null, null],
  	[null, null, null],
];

function handlePlayerChange(gameTurns) {
    let currentPlayer = "X"

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = "O"
    }

    return currentPlayer
}

function App() {
    const [gameTurns, setGameTurns]  = useState([])
    const activePlayer = handlePlayerChange(gameTurns)

    let gameBoard = initialGameBoard

	for (const turn of gameTurns) {
		const {square, player} = turn
		const {row, col} = square
		gameBoard[row][col] = player
	}

    let winner

    for (const combinations of WINNING_COMBINATIONS) {
        const firstSquare = gameBoard[combinations[0].row][combinations[0].column]
        const secondSquare = gameBoard[combinations[1].row][combinations[1].column]
        const thirdSquare = gameBoard[combinations[2].row][combinations[2].column]
        if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
            winner = firstSquare
        }
    }

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            const currentPlayer = handlePlayerChange(prevTurns)

            const updatedTurns = [
                {square : {row : rowIndex, col: colIndex}, player: currentPlayer },
                ...prevTurns
            ]
            return updatedTurns
        })
    }

    let hasDraw = gameTurns.length === 9 && !winner

    return (
        <>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="player1" symbol="x" isActive={activePlayer === 'X'}/>
                    <Player name="player2" symbol="o" isActive={activePlayer === 'O'}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} />}
                <GameBoard 
                    onSelectSquare={handleSelectSquare}
                    turns={gameTurns}
                    board={gameBoard}/>
            </div>
            <Log turns={gameTurns} />
        </>
    );
}

export default App;

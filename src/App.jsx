import { useState } from 'react';
  
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver'

const PLAYERS = {
    X: "Player 1",
    O: "Player 2"
}

const INITIAL_GAME_BOARD = [
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

function deriveWinner (gameBoard, players) {
    let winner

    for (const combinations of WINNING_COMBINATIONS) {
        const firstSquare = gameBoard[combinations[0].row][combinations[0].column]
        const secondSquare = gameBoard[combinations[1].row][combinations[1].column]
        const thirdSquare = gameBoard[combinations[2].row][combinations[2].column]

        if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
            winner = players[firstSquare]
        }
    }
    return winner
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

	for (const turn of gameTurns) {
		const {square, player} = turn
		const {row, col} = square
		gameBoard[row][col] = player
	}

    return gameBoard
}

function App() {
    const [gameTurns, setGameTurns]  = useState([])
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = handlePlayerChange(gameTurns)
    const gameBoard = deriveGameBoard(gameTurns)
    const winner = deriveWinner(gameBoard, players)

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
    
    function handleGameRestart() {
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol] : newName
            }
        })
    }

    return (
        <>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player 
                        name={PLAYERS.X}
                        symbol="x" 
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}/>
                    <Player
                        name={PLAYERS.O}
                        symbol="o"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || hasDraw) && <GameOver onRestart={handleGameRestart} winner={winner} />}
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

import { useState } from 'react';
  
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'

function App() {
    const [activePlayer, setActivePlayer] = useState('X')
    const [gameTurns, setGameTurns]  = useState([])

    function handleSelectSquare  (rowIndex, colIndex) {
        setActivePlayer((prevActivePlayer) => {
            return prevActivePlayer === 'X' ? 'O' : 'X'
        })
        setGameTurns(prevTurns => {
            let currentPlayer = "X"

            if (prevTurns.length > 0 &&activePlayer === 'X') {
                currentPlayer = "O"
            }

            const updatedTurns = [{square : {row : rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns]
            return updatedTurns
        })
    }

    return (
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name="player1" symbol="x" isActive={activePlayer === 'X'}/>
                <Player name="player2" symbol="o" isActive={activePlayer === 'O'}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
            <Log />
        </div>
    );
}

export default App;

import { useState } from 'react';

import Player from './components/Player'
import GameBoard from './components/GameBoard'

function App() {
    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectSquare  () {
        setActivePlayer((prevActivePlayer) => {
            return prevActivePlayer === 'X' ? 'O' : 'X'
        })
    }
    return (
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player name="player1" symbol="x" isActive={activePlayer === 'X'}/>
                <Player name="player2" symbol="o" isActive={activePlayer === 'O'}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
        </div>
    );
}

export default App;

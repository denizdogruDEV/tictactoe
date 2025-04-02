import Player from './components/Player'
import GameBoard from './components/GameBoard'

function App() {
    return (
        <div id="game-container">
            <ol id="players">
                <Player name="player1" symbol="x" />
                <Player name="player2" symbol="o" />
            </ol>
            <GameBoard />
        </div>
    );
}

export default App;

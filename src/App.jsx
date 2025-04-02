import Player from './components/Player';

function App() {
  return (
    <div id="game-container">
      <ol id="players">
    <Player name="player1" symbol="x" />
    <Player name="player2" symbol="o" />
      </ol>
    </div>
  );
}

export default App;

import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
	const [isEditing, setIsEditing] = useState(false);
  	const [playerName, setPlayerName] = useState(name);

  	function handleEditClick() {
    	setIsEditing((editing) => !editing);
		onChangeName(symbol, playerName)
  	}

	function handleNameChange(event) {
		setPlayerName(event.target.value)
	}

	let editablePlayerName = <span className="player-name">{playerName}</span>

	if (isEditing) {
		editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleNameChange}/>
	}

	return (
		<li className={isActive ? "active" : ""}>
			<span className="player">
				{editablePlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}

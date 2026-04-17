import Die from "./Die"
import { useState, useRef, useEffect, use } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti";

export default function App() {
	// Util functions
	function getRandomDiceNumber() {
		return Math.ceil(Math.random() * 6);
	}
	function generateAllNewDice() {
		return new Array(10)
			.fill(0)
			.map(() => ({
				value: getRandomDiceNumber(), 
				isHeld: false,
                id: nanoid()
			}))
	}

	// Variables
	const [dice, setDice] = useState(() => generateAllNewDice());
	const [rolls, setRolls] = useState(0);
	const doneButton = useRef(null);
	const gameWon = getGameWon();

	
	// Side effects
	useEffect(() => {
		if (gameWon) {
			doneButton.current.focus();
		}
	}, [gameWon]);
	
	// Functions
	function getGameWon() {
		return dice.every(die => die.isHeld && die.value == dice[0].value);
	}
	function rollDice() {
		setDice(prevDice => prevDice.map(
			die => die.isHeld ? die : {...die, value: getRandomDiceNumber()}
		))
		setRolls(prevRolls => prevRolls + 1);
	}

	function hold(id) {
		setDice(prevDice => prevDice.map(
			die => die.id === id ? {...die, isHeld: !die.isHeld} : die
		))
	}

	function resetGame() {
		setDice(generateAllNewDice());
		setRolls(0);
	}
	
	// Render
	const diceElements = dice.map(dice => <Die key={dice.id} diceNumber={dice.value} isHeld={dice.isHeld} hold={() => {hold(dice.id)}}/>)

	return (
		<main>
			{gameWon && 
				<ReactConfetti />
			}
			{gameWon && 
				<div aria-live="polite" className="sr-only">Congratulations! You won! Press "New Game" to start again.</div>
			}
			<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className="diceHolder">
				{diceElements}
			</div>
			<div className="bottom-bar">
				<button ref={doneButton} onClick={gameWon ? resetGame : rollDice} className="rollButton">{gameWon ? "New Game" : "Roll"}</button>
				<p className="roll-counter">Rolls: {rolls}</p>
			</div>
		</main>
	)
}
export default function Die(props) {
	const heldStyles = {
		backgroundColor: "#59E391"
	}

	return (
		<button className="die" style={props.isHeld ? heldStyles : null} onClick={props.hold} aria-pressed={props.isHeld} aria-label={`Die with number ${props.diceNumber}, is currently ${props.isHeld ? "" : "not"} being held.`}>
			{props.diceNumber}
		</button>
	)
}
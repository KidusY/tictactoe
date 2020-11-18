import React from 'react';
import './App.css';

export default class App extends React.Component {
	state = {
		activePlayer: '',
		selection: [ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ],
		gameEnded: false,
		winner: ''
	};

	componentDidMount() {}

	checkWinner = (currentTable) => {
		if (this.allTilesCompeleted(currentTable)) this.setState({ gameEnded: true });

		this.checkDiagonal(currentTable);
		this.checkStraight(currentTable);
		this.checkAcross(currentTable);
	};
	changeSelection = (selectionRow, selectionCol, e) => {
		let currentTable = JSON.parse(JSON.stringify(this.state.selection));

		if (this.state.activePlayer === '') {
			this.setState({ activePlayer: 'Player1' });
			e.target.style.color = '#1565c0';
			if (currentTable[selectionRow][selectionCol] === '') {
				currentTable[selectionRow][selectionCol] = 'X';
				this.setState({ selection: currentTable, activePlayer: 'Player2' });
			}
		}
		if (this.state.activePlayer === 'Player1') {
			e.target.style.color = '#1565c0';
			if (currentTable[selectionRow][selectionCol] === '') {
				currentTable[selectionRow][selectionCol] = 'X';
				this.setState({ selection: currentTable, activePlayer: 'Player2' });
			}
		}
		if (this.state.activePlayer === 'Player2') {
			e.target.style.color = '#d32f2f';
			if (currentTable[selectionRow][selectionCol] === '') {
				currentTable[selectionRow][selectionCol] = 'O';
				this.setState({ selection: currentTable, activePlayer: 'Player1' });
			}
		}

		this.checkWinner(currentTable);
	};
	allTilesCompeleted = (currentTable) => {
		let checker = false;
		let newCurrentTable;
		currentTable.map((currentTable) => {
			newCurrentTable = currentTable.find((col) => col === '');
		});

		if (newCurrentTable === undefined) {
			checker = true;
		}

		return checker;
	};

	checkDiagonal(currentTable) {
		if (
			currentTable[0][0] === currentTable[1][1] &&
			currentTable[1][1] === currentTable[2][2] &&
			currentTable[0][0] !== ''
		) {
			this.setState({ winner: currentTable[0][0] });
			this.setState({ gameEnded: true });
		} else if (
			currentTable[0][2] === currentTable[1][1] &&
			currentTable[1][1] === currentTable[2][0] &&
			currentTable[1][1] !== ''
		) {
			this.setState({ winner: currentTable[0][2] });
			this.setState({ gameEnded: true });
		}
	}

	checkStraight(currentTable) {
		if (
			currentTable[0][0] === currentTable[0][1] &&
			currentTable[0][1] === currentTable[0][2] &&
			currentTable[0][0] !== ''
		) {
			this.setState({ winner: currentTable[0][0] });
			this.setState({ gameEnded: true });
		} else if (
			currentTable[1][0] === currentTable[1][1] &&
			currentTable[1][1] === currentTable[1][2] &&
			currentTable[1][0] !== ''
		) {
			this.setState({ winner: currentTable[1][0] });
			this.setState({ gameEnded: true });
		} else if (
			currentTable[2][0] === currentTable[2][1] &&
			currentTable[2][1] === currentTable[2][2] &&
			currentTable[2][0] !== ''
		) {
			this.setState({ winner: currentTable[2][0] });
			this.setState({ gameEnded: true });
		}
	}

	checkAcross(currentTable) {
		if (
			currentTable[0][0] === currentTable[1][0] &&
			currentTable[1][0] === currentTable[2][0] &&
			currentTable[0][0] !== ''
		) {
			this.setState({ winner: currentTable[0][0] });
			this.setState({ gameEnded: true });
		} else if (
			currentTable[0][1] === currentTable[1][1] &&
			currentTable[1][1] === currentTable[2][1] &&
			currentTable[0][1] !== ''
		) {
			this.setState({ winner: currentTable[0][1] });
			this.setState({ gameEnded: true });
		} else if (
			currentTable[0][2] === currentTable[1][2] &&
			currentTable[1][2] === currentTable[2][2] &&
			currentTable[0][2] !== ''
		) {
			this.setState({ winner: currentTable[0][2] });
			this.setState({ gameEnded: true });
		}
	}

	render() {
		let turnInfoforPlayer1 = 'Your Turn';
		let turnInfoforPlayer2 = '';
		let winner = 'no one';
		if (this.state.activePlayer === 'Player1') {
			turnInfoforPlayer1 = 'Your Turn';
			turnInfoforPlayer2 = '';
		}
		if (this.state.activePlayer === 'Player2') {
			turnInfoforPlayer2 = 'Your Turn';
			turnInfoforPlayer1 = '';
		}
		if (this.state.gameEnded) {
			turnInfoforPlayer1 = '';
			turnInfoforPlayer2 = '';
		}

		if (this.state.winner === 'X') {
			winner = 'Player 1';
		} else if (this.state.winner === 'O') {
			winner = 'Player 2';
		}
		return (
			<div className="App">
				<div className="gameContainer">
					<div className="headerPlayerName">
						<div className="player player1">
							<div>
								<h1>X </h1>
							</div>
							<div className="playerInfo">
								<h2>Player 1 </h2>
								<h3>{turnInfoforPlayer1} </h3>
							</div>
						</div>
						<div className="player player2">
							<div className="playerInfo">
								<h2>Player 2 </h2>
								<h3>{turnInfoforPlayer2} </h3>
							</div>
							<div>
								<h1> O</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(0, 0, e);
							}}
						>
							{this.state.selection[0][0]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(0, 1, e);
							}}
						>
							{this.state.selection[0][1]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(0, 2, e);
							}}
						>
							{this.state.selection[0][2]}
						</div>
					</div>
					<div className="row">
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(1, 0, e);
							}}
						>
							{this.state.selection[1][0]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(1, 1, e);
							}}
						>
							{this.state.selection[1][1]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(1, 2, e);
							}}
						>
							{this.state.selection[1][2]}
						</div>
					</div>
					<div className="row">
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(2, 0, e);
							}}
						>
							{this.state.selection[2][0]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(2, 1, e);
							}}
						>
							{this.state.selection[2][1]}
						</div>
						<div
							className="col color"
							onClick={(e) => {
								this.checkWinner(this.state.selection);
								this.changeSelection(2, 2, e);
							}}
						>
							{this.state.selection[2][2]}
						</div>
					</div>
				</div>

				{this.state.gameEnded ? (
					<div className="modalContainer">
						<div className="modal">
							<h1>Game Ended {`${winner} won this game`} </h1>
							<button onClick={() => window.location.reload()}> Restart </button>
						</div>
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}

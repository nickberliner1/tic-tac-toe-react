import React from 'react';
import { Square } from './Square';
import * as utils from '../utils';
import { ButtonGroup } from '@material-ui/core';

export default class Board extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        squares: Array(9).fill(null),
        history: [],
        playerOneName: this.props.state.playerOneName,
        playerTwoName: this.props.state.playerTwoName,
        xIsNext: true
    };
	}

	handleSquareClick(index) {
        const squares = this.state.squares.slice();
        // const playerX = src('./styles/times-circle-solid.svg');
        // const playerY = src('./styles/circle-solid.svg');
       

		let history = this.state.history;

		if ( utils.winner(squares) || squares[index]) {
			return;
		}

		if ( utils.tieGame(squares) === true) {
			return;
		}

        squares[index] = this.state.xIsNext 
                            ? this.state.playerOneName
                            : this.state.playerTwoName;

		history.push(this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName);

    this.setState({
			squares: squares,
			history: history,
			xIsNext: !this.state.xIsNext
		});
	}

	handleBoardRestart = () => {
		this.setState({
			squares: Array(9).fill(null),
			history: [],
			xIsNext: true
		});
	}

	render() {

        const winner = utils.winner(this.state.squares);
        const isFilled = utils.tieGame(this.state.squares);

        let status;

		if (winner) {
			status = `The winner is: ${winner === 'x' ? this.state.playerOneName : this.state.playerTwoName}!`;
		} else if ( !winner && isFilled ) {
			status = 'Game drawn!';
		} else {
			status = `It is ${(this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName)}'s turn.`;
		}

    return (
        <div className="view view--board">

            <div className="board-wrapper">
                <div className="board">
                    <h2 className="board-heading">{status}</h2>

                    {/* <div className="board-row"> */}
                    <ButtonGroup>
                        <Square value={this.state.squares[0]} onClick={() => this.handleSquareClick(0)} />
                        <Square value={this.state.squares[1]} onClick={() => this.handleSquareClick(1)} />
                        <Square value={this.state.squares[2]} onClick={() => this.handleSquareClick(2)} />
                    </ButtonGroup>
                    {/* </div> */}

                    {/* <div className="board-row"> */}
                    <ButtonGroup>
                        <Square value={this.state.squares[3]} onClick={() => this.handleSquareClick(3)} />
                        <Square value={this.state.squares[4]} onClick={() => this.handleSquareClick(4)} />
                        <Square value={this.state.squares[5]} onClick={() => this.handleSquareClick(5)} />
                    </ButtonGroup>
                    {/* </div> */}

                    {/* <div className="board-row"> */}
                    <ButtonGroup>
                        <Square value={this.state.squares[6]} onClick={() => this.handleSquareClick(6)} />
                        <Square value={this.state.squares[7]} onClick={() => this.handleSquareClick(7)} />
                        <Square value={this.state.squares[8]} onClick={() => this.handleSquareClick(8)} />
                    </ButtonGroup>
                    {/* </div> */}
                </div>

                <div className="board-history">
                    {/* <h2 className="board-heading">Moves history:</h2>

                    <ul className="board-history-list">
                        {this.state.history.length === 0 && <span>No moves to show.</span>}

                        {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                            return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                        })}
                    </ul> */}
                </div>

                {winner && <button className="board__btn btn" onClick={this.handleBoardRestart}>Start new game</button>}
            </div>
        </div>
        )
	}
}
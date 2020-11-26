import React from 'react';
import { Square } from './Square';
import * as utils from '../utils';
import { Helmet } from 'react-helmet';
import { ButtonGroup } from '@material-ui/core';

export default class Board extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        squares: Array(9).fill(null),
        history: [],
        playerOneName: this.props.state.playerOneName,
        playerTwoName: this.props.state.playerTwoName,
        xIsNext: true,
        lightTheme: true
    };
    this.handleDarkMode = this.handleDarkMode.bind(this);
	}

	handleSquareClick(index) {
        const squares = this.state.squares.slice();

		let history = this.state.history;

		if ( utils.winner(squares) || squares[index]) {
			return;
		}

		if ( utils.tieGame(squares) ) {
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
    
    handleDarkMode() {
        this.setState(prevState => ({
            lightTheme: !prevState.lightTheme
        }))
    }

	render() {
        const lightTheme = this.state.lightTheme;
        const winner = utils.winner(this.state.squares);
        const isFilled = utils.tieGame(this.state.squares);

        let status;

		if (winner) {
            status = `The winner is: ${winner === this.state.playerOneName 
                                                ? this.state.playerOneName 
                                                : this.state.playerTwoName}!`;
		} else if ( !winner && isFilled ) {
			status = 'Game drawn!';
		} else {
			status = `It is ${(this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName)}'s turn.`;
		}

    return (
        <div className={`view-${lightTheme ? "light" : "dark"} view--board`}>
            <Helmet>
                <body className={`body-${lightTheme ? "light" : "dark"}`} />
            </Helmet>
            <div className="board-wrapper">
                <div className="board">
                    
                    <h2 className={`board-heading-${lightTheme ? "light" : "dark"}`}>{status}</h2>

                    <div className="row">
                    <ButtonGroup>
                        <Square value={this.state.squares[0]} onClick={() => this.handleSquareClick(0)} />
                        <Square value={this.state.squares[1]} onClick={() => this.handleSquareClick(1)} />
                        <Square value={this.state.squares[2]} onClick={() => this.handleSquareClick(2)} />
                    </ButtonGroup>
                    </div>

                    <div className="row">
                    <ButtonGroup>
                        <Square value={this.state.squares[3]} onClick={() => this.handleSquareClick(3)} />
                        <Square value={this.state.squares[4]} onClick={() => this.handleSquareClick(4)} />
                        <Square value={this.state.squares[5]} onClick={() => this.handleSquareClick(5)} />
                    </ButtonGroup>
                    </div>

                    <div className="row">
                    <ButtonGroup>
                        <Square value={this.state.squares[6]} onClick={() => this.handleSquareClick(6)} />
                        <Square value={this.state.squares[7]} onClick={() => this.handleSquareClick(7)} />
                        <Square value={this.state.squares[8]} onClick={() => this.handleSquareClick(8)} />
                    </ButtonGroup>
                    </div>
                </div>

                <div className="bottom-buttons">
                    <button 
                        className={`btn-mode-${lightTheme ? "light" : "dark"}`} 
                        onClick={this.handleDarkMode}
                    >
                        {`${lightTheme ? "Dark" : "Light"} Mode`}</button>
                    <hr />
                    <button 
                        className={`btn-reset-${lightTheme ? "light" : "dark"}`}
                        onClick={this.handleBoardRestart}
                    >Start new game</button>
                </div>
            </div>
        </div>
        )
	}
}
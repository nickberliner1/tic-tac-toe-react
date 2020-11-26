import React from 'react';
import './App.css';
import Board from './components/Board';

import './components/styles/board.css';
import './components/styles/buttons.css';
import './components/styles/main.css';
import './components/styles/scoreboard.css';
import './components/styles/square.css';
import './components/styles/variables.css';

class App extends React.Component {
  state = {
    playerOneName: 'X',
    playerTwoName: 'O'
  }

  handlePlayerNameChange = (stateKey, stateValue) => {
    this.setState({
      [stateKey]: stateValue
    })
  }

  render() {
    return (
      <div className="app">
        <Board 
          state={this.state} 
          nameChangeHandler={this.handlePlayerNameChange} 
        />
      </div>
    )
  }
}

export default App;

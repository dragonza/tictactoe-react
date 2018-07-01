import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import TicTacToe from "./components/TicTacToe";
import TwoPlayerTicTacToe from "./components/TwoPlayerTicTacToe";

export default class App extends React.Component {
  state = {
    singleMode: null
  };

  renderBoard = () => {
    if (this.state.singleMode === null) return;
    return this.state.singleMode ? <TicTacToe /> : <TwoPlayerTicTacToe />;
  };

  handleModeClick = mode => {
    if (mode === 1) {
      this.setState({
        singleMode: true
      });
    } else if (mode === 2) {
      this.setState({
        singleMode: false
      });
    }
  };

  renderMode = () => {
    return (
      <div className="mode-selection">
        <a
          className="waves-effect waves-light btn"
          onClick={() => this.handleModeClick(1)}
        >
          One Player
        </a>

        <a
          className="waves-effect waves-light btn"
          onClick={() => this.handleModeClick(2)}
        >
          Two Player
        </a>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h1 className="game-name">Tic Tac Toe</h1>
        {this.renderMode()}
        {this.renderBoard()}
      </div>
    );
  }
}

import React from 'react';
import { checkTie, checkWin, minimax } from "../utils";
import Board from './Board';

export default class TwoPlayerTicTacToe extends React.Component {
  state = {
    squares: Array.from(Array(9).keys()),
    winner: null,
    isNextX: false,
    isTie: false
  };

  renderStatus = () => {
    const { winner, isTie } = this.state;
    let status;
    if (winner) {
      status = `The winner is ${winner}`;
    } else if (isTie) {
      status = `Tie game!!`;
    }
    return status ? (
      <div className="row">
        <div className="col s12 ">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{status}</span>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  };

  handleResetGame = () => {
    this.setState({
      squares: Array.from(Array(9).keys()),
      winner: null,
      isNextX: false,
      isTie: false
    });
  };

  handleSquareClick = i => {
    const { winner, isTie } = this.state;
    if (isTie || winner || typeof this.state.squares[i] !== "number") return;
    const currentPlayer = this.state.isNextX ? "X" : "O";
    const squares = this.state.squares.slice();
    squares[i] = currentPlayer;
    this.setState(
      {
        squares,
        isNextX: !this.state.isNextX
      },
      () => {
        const isWin = checkWin(this.state.squares, currentPlayer);
        if (isWin) {
          this.setState({
            winner: currentPlayer
          });
        } else if (checkTie(squares)) {
          this.setState({
            isTie: true
          });
        }
      }
    );
  };

  buildComponent = state => {
    return (
      <div className="tictactoe-two-player">
        <button
          onClick={this.handleResetGame}
          className="btn waves-light waves-effect"
        >
          Replay
        </button>

        {this.renderStatus(state)}
        <Board
          squares={state.squares}
          onClick={i => this.handleSquareClick(i)}
        />
      </div>
    );
  };
  render() {
    return this.buildComponent(this.state);
  }
}

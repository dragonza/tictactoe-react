import React from "react";
import { checkTie, checkWin, minimax } from "../utils";

import Board from "./Board";

export default class TicTacToe extends React.Component {
  state = {
    squares: Array.from(Array(9).keys()),
    winner: null,
    human: null,
    aiPlayer: null,
    isTie: false
  };

  aiTurn = () => {
    const squares = this.state.squares.slice();
    const { human, aiPlayer } = this.state;
    const bestSpot = minimax(squares, aiPlayer, human, aiPlayer);
    squares[bestSpot.index] = aiPlayer;

    this.setState(
      {
        squares
      },
      () => {
        const winner = checkWin(squares, aiPlayer);
        const isTie = checkTie(squares);
        if (winner) {
          this.setWinner(aiPlayer);
        } else if (isTie) {
          this.setTie();
        }
      }
    );
  };

  setWinner = player => {
    this.setState({
      winner: player
    });
  };

  setTie = () => {
    this.setState({
      isTie: true
    });
  };

  handleSquareClick = i => {
    const { isTie, winner, human } = this.state;
    if (isTie || winner || typeof this.state.squares[i] !== "number") return;
    const squares = this.state.squares.slice();
    squares[i] = human;
    this.setState(
      () => ({ squares }),
      () => {
        const winner = checkWin(squares, human);
        const isTie = checkTie(squares);
        if (!winner && !isTie) {
          this.aiTurn();
        } else if (winner) {
          this.setWinner(human);
        } else {
          this.setTie();
        }
      }
    );
  };

  handleResetGame = () => {
    this.setState({
      squares: Array.from(Array(9).keys()),
      winner: null,
      human: null,
      aiPlayer: null,
      isTie: false
    });
  };

  renderStatus = state => {
    let status;
    if (state.winner) {
      status = `The winner is ${state.winner}`;
    } else if (state.isTie) {
      status = "Tie game!!";
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

  handleSymbolClick = symbol => {
    this.setState({
      human: symbol,
      aiPlayer: symbol === "O" ? "X" : "O"
    });
  };

  renderChoices = () => {
    return (
      <div className="symbol-selection">
        <p>Please pick your symbol</p>
        <a
          className="waves-effect waves-light btn"
          onClick={() => this.handleSymbolClick("X")}
        >
          X
        </a>

        <a
          className="waves-effect waves-light btn"
          onClick={() => this.handleSymbolClick("O")}
        >
          O
        </a>
      </div>
    );
  };

  buildComponent = state => {
    return (
      <div className="tictactoe">
        {this.renderStatus(state)}
        {!state.human ? (
          this.renderChoices()
        ) : (
          <div>
            <button
              onClick={this.handleResetGame}
              className="btn waves-light waves-effect"
            >
              Replay
            </button>

            <Board
              squares={state.squares}
              onClick={i => this.handleSquareClick(i)}
            />
          </div>
        )}
      </div>
    );
  };

  render() {
    return this.buildComponent(this.state);
  }
}

import React from "react";
import Square from "./Square";

export default function Board(props) {
  return (
    <div className="board">
      {props.squares.map((square, i) => (
        <Square
          key={i}
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      ))}
    </div>
  );
}

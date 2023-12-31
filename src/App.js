import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Square({ svalue, onSquereClick }) {
  return (
    <button className="square" onClick={onSquereClick}>
      {svalue}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <div className="board-surface">
      <div className="board-row">
        <Square svalue={squares[0]} onSquereClick={() => handleClick(0)} />
        <Square svalue={squares[1]} onSquereClick={() => handleClick(1)} />
        <Square svalue={squares[2]} onSquereClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square svalue={squares[3]} onSquereClick={() => handleClick(3)} />
        <Square svalue={squares[4]} onSquereClick={() => handleClick(4)} />
        <Square svalue={squares[5]} onSquereClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square svalue={squares[6]} onSquereClick={() => handleClick(6)} />
        <Square svalue={squares[7]} onSquereClick={() => handleClick(7)} />
        <Square svalue={squares[8]} onSquereClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory([...history, nextSquares]);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + " ";
    } else {
      description = "START";
    }
    return (
      <li key={move}>
        <button className="description" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ul className="move-lists">{moves}</ul>
      </div>
    </div>
  );
}

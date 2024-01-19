import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import { Guess } from "../Guess";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

let numberOfGuesses = 0;

function Game() {
  const [gameStatus, setGameStatus] = React.useState("playing");
  const [guess, setGuess] = React.useState("");
  const [guesses, setGuesses] = React.useState([]);

  const submitGuess = (event) => {
    event.preventDefault();
    setGuesses([...guesses, guess]);
    setGuess("");
    numberOfGuesses++;

    if (guess === answer) {
      setGameStatus("win");
    }

    if (numberOfGuesses === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("loss");
    }
  };

  return (
    <>
      <div className="guess-results">
        {Array.from({ length: NUM_OF_GUESSES_ALLOWED }, (_, index) => (
          <Guess key={index} answer={answer} guess={guesses[index]} />
        ))}
      </div>

      <form className="guess-input-wrapper" onSubmit={submitGuess}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          pattern=".{5}"
          onChange={(event) => {
            setGuess(event.target.value.toUpperCase());
          }}
        />
      </form>

      {gameStatus === "win" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>{numberOfGuesses} guesses</strong>.
          </p>
        </div>
      )}

      {gameStatus === "loss" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>LEARN</strong>.
          </p>
        </div>
      )}
    </>
  );
}

export default Game;

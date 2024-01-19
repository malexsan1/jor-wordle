import { checkGuess } from "../../game-helpers";

export const Guess = ({ answer, guess }) => {
  const checkGuessResults = checkGuess(guess, answer);

  if (guess) {
    return (
      <p className="guess">
        {guess.split("").map((letter, index) => {
          const status = checkGuessResults[index].status;

          return (
            <span key={index} className={`cell ${status}`}>
              {letter}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <p className="guess">
      <span className="cell"></span>
      <span className="cell"></span>
      <span className="cell"></span>
      <span className="cell"></span>
      <span className="cell"></span>
    </p>
  );
};

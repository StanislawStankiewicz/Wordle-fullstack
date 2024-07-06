import Row from "./Row";
import { Guess } from "../types/types";

export default function WordleRows({
  guesses,
  wordLength,
}: {
  guesses: Guess[];
  wordLength: number;
}) {
  return (
    <div className="wordle">
      <div className="wordle-rows">
        {guesses.map((guess, index) => (
          <Row
            key={index}
            guessLetters={guess?.letter_info}
            wordLength={wordLength}
          />
        ))}
      </div>
    </div>
  );
}

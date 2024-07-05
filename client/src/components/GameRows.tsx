import Row from "./Row";
import { Guess, LetterInfo } from "../types/types";
import { useState, useEffect } from "react";

export default function GameRows({
  guesses,
  guessesAmount = 6,
  wordLength = 5,
}: {
  guesses: Guess[];
  guessesAmount?: number;
  wordLength?: number;
}) {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [currentGuess, setCurrentGuess] = useState<LetterInfo[]>([]);
  const [guessesArr, setGuessesArr] = useState<Guess[]>([
    ...guesses,
    { result: "unknown", letter_info: currentGuess },
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
        return;
      }
      // letter stage
      if (!event.key.match(/^[a-z]$/) || currentGuess.length >= wordLength) {
        return;
      }
      if (event.key !== keyPressed) {
        setKeyPressed(event.key.toLowerCase());
        console.log(event.key.toLowerCase());
        setCurrentGuess([
          ...currentGuess,
          { letter: event.key.toLowerCase(), status: "none" },
        ]);
      }
    };
    const handleKeyUp = () => setKeyPressed(null);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPressed, wordLength, currentGuess]);

  return (
    <div className="game-rows">
      {guessesArr.map((guess, index) => (
        <Row key={index} guessLetters={guess?.letter_info} />
      ))}
    </div>
  );
}

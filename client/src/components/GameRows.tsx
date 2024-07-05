import Row from "./Row";
import { Guess, LetterInfo } from "../types/types";
import { useState, useEffect } from "react";

export default function GameRows({
  guessesState,
  guessesAmountState,
  wordLengthState,
}: {
  guessesState?: Guess[];
  guessesAmountState?: number;
  wordLengthState?: number;
}) {
  async function submitGuess(currentGuess: LetterInfo[]) {
    const word = currentGuess.map((letter) => letter.letter).join("");
    console.log("submitting guess", word);
    const url = "http://localhost:5000/api/wordle/guess";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess: word }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let data = await response.json();
      // handle response
      console.log("Server response:", data);
      if (data.result === "correct") {
        setIsGameOver(true);
        data = {
          result: "correct",
          letter_info: currentGuess.map((letter) => ({
            letter: letter.letter,
            status: "correct",
          })),
        };
      }

      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        for (let i = 0; i < newGuesses.length; i++) {
          if (newGuesses[i] === null) {
            newGuesses[i] = data;
            break;
          }
        }
        return newGuesses;
      });
      setCurrentGuess([]);
    } catch (error) {
      console.error("Failed to submit guess:", error);
    }
  }
  const [guessesAmount, setGuessesAmount] = useState<number>(
    guessesAmountState ? guessesAmountState : 0
  );
  const [wordLength, setWordLength] = useState<number>(
    wordLengthState ? wordLengthState : 0
  );
  const [guesses, setGuesses] = useState<Guess[]>(
    guessesState ? guessesState : []
  );
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [currentGuess, setCurrentGuess] = useState<LetterInfo[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchWordLength = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/wordle/wordlength"
        );
        const data = await response.json();
        setWordLength(data.wordLength);
      } catch (error) {
        console.error("Failed to fetch word length:", error);
      }
    };
    const fetchGuessesAmount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/wordle/guessesamount"
        );
        const data = await response.json();
        setGuessesAmount(data.guessesAmount);
        setGuesses(new Array(data.guessesAmount).fill(null));
      } catch (error) {
        console.error("Failed to fetch guesses amount:", error);
      }
    };
    fetchWordLength();
    fetchGuessesAmount();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;
      if (event.key === "Enter" && currentGuess.length == wordLength) {
        if (guesses.find((guess) => guess === null) === undefined) {
          console.error("No guesses left");
          return;
        }
        submitGuess(currentGuess);
        return;
      }
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
        setCurrentGuess((prevGuess) => [
          ...prevGuess,
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
  }, [keyPressed, wordLength, currentGuess, isGameOver, guesses]);

  const modifiedGuesses = [...guesses];
  const firstEmptyIndex = modifiedGuesses.findIndex((guess) => guess === null);
  if (firstEmptyIndex !== -1) {
    modifiedGuesses[firstEmptyIndex] = {
      result: "unknown",
      letter_info: currentGuess,
    };
  }

  return (
    <div className="wordle">
      <div className="game-rows">
        {modifiedGuesses.map((guess, index) => (
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

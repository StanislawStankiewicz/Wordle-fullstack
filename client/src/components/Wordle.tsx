import WordleRows from "./WordleRows";
import WordleKeyboard from "./WordleKeyboard";
import { useState, useEffect } from "react";
import { Guess, LetterInfo } from "../types/types";

export default function Wordle() {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [wordLength, setWordLength] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<LetterInfo[]>([]);
  const [lettersData, setLettersData] = useState({});

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
        setGuesses(new Array(data.guessesAmount).fill(null));
      } catch (error) {
        console.error("Failed to fetch guesses amount:", error);
      }
    };
    fetchWordLength();
    fetchGuessesAmount();
  }, []);

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
      // handle response
      let data: Guess = await response.json();
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
      setLettersData(updateLettersInfo(lettersData, data.letter_info));
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyPressed(event.key.toLowerCase());
      onKeyPressed(event.key);
    };
    const handleKeyUp = () => setKeyPressed(null);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, currentGuess, wordLength, guesses, keyPressed]);

  function onKeyPressed(key: string) {
    key = key.toLowerCase();
    if (isGameOver) return;
    if (key === "enter" && currentGuess.length == wordLength) {
      if (guesses.find((guess) => guess === null) === undefined) {
        console.error("No guesses left");
        return;
      }
      submitGuess(currentGuess);
      return;
    }
    if (key === "backspace") {
      setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
      return;
    }
    // letter stage
    if (!key.match(/^[a-z]$/) || currentGuess.length >= wordLength) {
      return;
    }
    if (key !== keyPressed) {
      setCurrentGuess((prevGuess) => [
        ...prevGuess,
        { letter: key.toLowerCase(), status: "none" },
      ]);
    }
  }

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
      <WordleRows guesses={modifiedGuesses} wordLength={wordLength} />
      <WordleKeyboard onKeyPressed={onKeyPressed} lettersData={lettersData} />
    </div>
  );
}

function updateLettersInfo(
  data: { [key: string]: string },
  lettersInfo: LetterInfo[]
) {
  for (const letter of lettersInfo) {
    if (letter.status === "correct") {
      data[letter.letter] = "correct";
    }
    if (letter.status === "present") {
      if (data[letter.letter] !== "correct") {
        data[letter.letter] = "present";
      }
    }
    if (letter.status === "incorrect") {
      if (data[letter.letter] === undefined) {
        data[letter.letter] = "incorrect";
      }
    }
  }
  console.log(data);
  return data;
}

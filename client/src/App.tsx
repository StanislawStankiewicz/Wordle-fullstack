import "./App.css";
import type { Guess } from "./types/types.d.ts";

import GameRows from "./components/GameRows.tsx";

const guess: Guess = {
  result: "incorrect",
  letter_info: [
    {
      letter: "a",
      status: "correct",
    },
    {
      letter: "p",
      status: "correct",
    },
    {
      letter: "u",
      status: "incorrect",
    },
    {
      letter: "u",
      status: "incorrect",
    },
    {
      letter: "l",
      status: "present",
    },
  ],
};

const guesses: Guess[] = [guess, guess];

function App() {
  return (
    <>
      <GameRows guesses={guesses} />
    </>
  );
}

export default App;

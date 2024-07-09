import RowLetter from "./RowLetter";
import { LetterInfo } from "../types/types";

export default function Row({
  guessLetters,
  wordLength = 5,
}: {
  guessLetters?: LetterInfo[];
  wordLength?: number;
}) {
  const range: number[] = Array(wordLength).fill(0);
  return (
    <div className="row">
      {range.map((_, index) => (
        <RowLetter
          key={index}
          letter={guessLetters?.[index]?.letter}
          backgroundColor={getBackgroundColor(guessLetters?.[index]?.status)}
        />
      ))}
    </div>
  );
}

function getBackgroundColor(status?: string) {
  switch (status) {
    case "correct":
      return "#109B10";
    case "present":
      return "#C3C30A";
    case "incorrect":
      return "#141414";
    default:
      return "#555";
  }
}

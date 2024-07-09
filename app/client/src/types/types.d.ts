export interface LetterInfo {
  letter: string;
  status: "correct" | "present" | "incorrect" | "none";
}

export interface Guess {
  result: "correct" | "incorrect" | "unknown";
  letter_info: LetterInfo[];
}

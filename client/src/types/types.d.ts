export interface LetterInfo {
  letter: string;
  status: "correct" | "present" | "incorrect" | "none";
}

export interface Guess {
  result: string;
  letter_info: LetterInfo[];
}

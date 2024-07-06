export default function WordleKeyboard({
  onKeyPressed,
  lettersInfo,
}: {
  onKeyPressed: (key: string) => void;
  lettersInfo: { [key: string]: string };
}) {
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Backspace"];
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter"];
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="wordle-keyboard">
      {[line1, line2, line3].map((line, i) => (
        <div key={i} className="wordle-keyboard-row">
          {line.map((key) => (
            <button
              key={key}
              style={{
                backgroundColor: getBackgroundColor(
                  lettersInfo?.[key.toLowerCase()]
                ),
              }}
              onClick={() => onKeyPressed(key)}
            >
              {key}
            </button>
          ))}
        </div>
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

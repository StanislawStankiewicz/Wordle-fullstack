export default function RowLetter({
  letter,
  backgroundColor,
}: {
  letter?: string;
  backgroundColor?: string;
}) {
  return (
    <div className="row-letter" style={{ backgroundColor: backgroundColor }}>
      {letter?.toUpperCase()}
    </div>
  );
}

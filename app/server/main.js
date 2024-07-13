const app = require("./server");
const WordleGame = require("./models/wordleModel");
const PORT = process.env.PORT || 5000;

const game = new WordleGame((wordLength = 5), (maxGuesses = 6));
game.setWordChangeInterval(24);

const server = app(game);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

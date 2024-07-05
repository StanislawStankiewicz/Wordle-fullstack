// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);

const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:5173",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api", require("./routes/api/api"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

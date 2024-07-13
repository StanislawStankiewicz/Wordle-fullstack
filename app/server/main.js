// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);

const whitelist = (process.env.WHITELIST || "http://localhost:5000").split(",");
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

app.use((req, res) => {
  res.status(404).json({
    error: "Resource not found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
    status: 404,
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

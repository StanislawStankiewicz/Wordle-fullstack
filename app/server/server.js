const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");

module.exports = (game) => {
  const app = express();

  app.use(logger);

  const whitelist = (process.env.WHITELIST || "http://localhost:5000").split(
    ","
  );
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

  app.use("/api", require("./routes/api/api")(game));

  app.use((req, res) => {
    res.status(404).json({
      error: "Resource not found",
      message: `The requested URL ${req.originalUrl} was not found on this server.`,
      status: 404,
    });
  });

  return app;
};

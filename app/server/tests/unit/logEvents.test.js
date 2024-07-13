const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { logEvents } = require("../../middleware/logEvents"); // Adjust the path as needed

jest.mock("date-fns", () => ({
  format: jest.fn(() => "20230713\t12:34:56"),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "123e4567-e89b-12d3-a456-426614174000"),
}));

jest.mock("fs", () => ({
  existsSync: jest.fn(),
  promises: {
    mkdir: jest.fn(),
    appendFile: jest.fn(),
  },
}));

describe("logEvents", () => {
  const logsDir = path.join(__dirname, "../..", "logs");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create logs directory if it does not exist", async () => {
    fs.existsSync.mockReturnValue(false);
    fs.promises.mkdir.mockResolvedValue();

    await logEvents("Test message", "testLog.txt");

    expect(fs.existsSync).toHaveBeenCalledWith(logsDir);
    expect(fs.promises.mkdir).toHaveBeenCalledWith(logsDir);
  });

  it("should append log item to the log file", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.promises.appendFile.mockResolvedValue();

    await logEvents("Test message", "testLog.txt");

    const expectedLogItem =
      "20230713\t12:34:56\t123e4567-e89b-12d3-a456-426614174000\tTest message\n";
    expect(fs.promises.appendFile).toHaveBeenCalledWith(
      path.join(logsDir, "testLog.txt"),
      expectedLogItem
    );
  });

  it("should handle errors", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    fs.existsSync.mockReturnValue(true);
    fs.promises.appendFile.mockRejectedValue(new Error("Append error"));

    await logEvents("Test message", "testLog.txt");

    expect(consoleSpy).toHaveBeenCalledWith(new Error("Append error"));
  });
});

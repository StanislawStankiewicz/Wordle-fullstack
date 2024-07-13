const getWordList = require("../../models/getWordList");

describe("getWordList", () => {
  it("should return an array of words of the specified length", () => {
    const wordLength = 5;
    const words = getWordList(wordLength);
    words.forEach((word) => {
      expect(word).toHaveLength(wordLength);
    });
  });
});

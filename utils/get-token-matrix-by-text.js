export const getTokenMatrixByText = (text) => {
  if (text.indexOf(" ") === -1) throw new Error("A very small training sample");

  const letterCount = text.split("").reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;

    return acc;
  }, {});

  const tokenToLetter = {};

  const letterToToken = Object.keys(letterCount)
    .sort((a, b) => letterCount[b] - letterCount[a])
    .reduce((acc, letter, i, array) => {
      const letterToken = Array.from({ length: array.length }, (_, j) =>
        Number(i === j)
      );

      tokenToLetter[JSON.stringify(letterToken)] = letter;

      return {
        ...acc,
        [letter]: letterToken,
      };
    }, {});

  return {
    tokenToLetter,
    letterToToken,
    emptyToken: letterToToken[" "],
  };
};

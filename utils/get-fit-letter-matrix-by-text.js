export const getFitLetterMatrixByText = (text) => {
  if (text.indexOf(" ") === -1) throw new Error("A very small training sample");

  const letterCount = text.split("").reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;

    return acc;
  }, {});

  const vectorToLetter = {};

  const letterToVector = Object.keys(letterCount)
    .sort((a, b) => letterCount[b] - letterCount[a])
    .reduce((acc, token, i, array) => {
      const letterVector = Array.from({ length: array.length }, (_, j) =>
        Number(i === j)
      );

      vectorToLetter[JSON.stringify(letterVector)] = token;

      return {
        ...acc,
        [token]: letterVector,
      };
    }, {});

  return {
    vectorToLetter,
    letterToVector,
    emptyLetterMatrix: letterToVector[" "],
  };
};

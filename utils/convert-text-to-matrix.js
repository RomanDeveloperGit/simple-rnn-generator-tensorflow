export const convertTextToMatrix = (text) => {
  const letterCount = text.split("").reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;

    return acc;
  }, {});

  const matrixByLetters = Object.keys(letterCount)
    .sort((a, b) => letterCount[b] - letterCount[a])
    .map((_, i, array) =>
      Array.from({ length: array.length }, (_, j) => Number(i === j))
    );

  return matrixByLetters;
};

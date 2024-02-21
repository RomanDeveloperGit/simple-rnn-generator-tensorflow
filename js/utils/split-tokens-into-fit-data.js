export const splitTokensIntoFitData = (tokens, fitStep, emptyLetterMatrix) => {
  return tokens.reduce(
    (acc, _, index, array) => {
      const rightIndex = index + fitStep;

      if (rightIndex <= array.length) {
        return {
          ...acc,
          x: [...acc.x, array.slice(index, rightIndex)],
          y: [...acc.y, array?.[rightIndex] || emptyLetterMatrix],
        };
      }

      return acc;
    },
    { x: [], y: [] }
  );
};

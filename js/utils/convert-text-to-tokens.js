export const convertTextToTokens = (text, letterToTokenObject) => {
  return text
    .toLowerCase()
    .split("")
    .map((letter) => letterToTokenObject[letter]);
};

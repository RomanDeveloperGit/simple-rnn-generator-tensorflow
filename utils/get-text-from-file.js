import fs from "fs";

const NO_RUSSIAN_LETTERS_PATTERN = /[^а-яА-Я] /g;

export const getTextFromFile = (path) => {
  const text = fs
    .readFileSync(path, "utf-8")
    .trimStart()
    .replace(NO_RUSSIAN_LETTERS_PATTERN, "");

  return text;
};

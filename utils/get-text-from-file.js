import fs from "fs";

export const getTextFromFile = (path) => {
  const text = fs.readFileSync(path, "utf-8").replace(/[^а-яА-Я] /g, "");

  return text;
};

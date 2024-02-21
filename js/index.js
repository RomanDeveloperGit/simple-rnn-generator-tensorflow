import * as tf from "@tensorflow/tfjs";

import { getTextFromFile } from "./utils/get-text-from-file.js";
import { getTokenMatrixByText } from "./utils/get-token-matrix-by-text.js";
import { splitTokensIntoFitData } from "./utils/split-tokens-into-fit-data.js";
import { convertTextToTokens } from "./utils/convert-text-to-tokens.js";

const INPUT_NEURONS_COUNT = 6;

const trainingText = getTextFromFile("../training-text.txt");

const { letterToToken, tokenToLetter, emptyToken } =
  getTokenMatrixByText(trainingText);

const tokens = Object.values(letterToToken);

const model = tf.sequential();
model.add(
  tf.layers.inputLayer({ inputShape: [INPUT_NEURONS_COUNT, tokens.length] })
);
model.add(tf.layers.simpleRNN({ units: 128, activation: "tanh" }));
model.add(tf.layers.dense({ units: tokens.length, activation: "softmax" }));

model.compile({
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
  optimizer: "adam",
});

const convertedTextToTokens = convertTextToTokens(trainingText, letterToToken);
const fitData = splitTokensIntoFitData(
  convertedTextToTokens,
  INPUT_NEURONS_COUNT,
  emptyToken
);

await model.fit(tf.tensor(fitData.x), tf.tensor(fitData.y), {
  batchSize: 32,
  epochs: 100,
});

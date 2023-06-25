import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { pipeline } from "stream/promises";
import { translateWords } from "./translate";
import { soundWord } from "./sound";
import { authorized } from "./middlewares";

const app = express();
app.use(cors({ origin: true }));

app.post(
  "/translate",
  authorized,
  async (request: Request<never, { words: string[] }>, response: Response) => {
    const { words } = request.body;
    try {
      const translatedWords = await translateWords(words);
      return response.status(200).json(translatedWords);
    } catch (error) {
      logger.error(error);
      return response.status(400).json({
        error,
      });
    }
  }
);

app.post(
  "/sound",
  authorized,
  async (request: Request<never, { word: string }>, response: Response) => {
    const { word } = request.body;

    await pipeline((await soundWord(word)).data, response);
  }
);

exports.app = onRequest(app);

import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { pipeline } from "stream/promises";
import { translateWords } from "./translate";
import { soundWord } from "./sound";
import { authorized } from "./middlewares";
import { generateLesson } from "./db";

const app = express();
app.use(cors({ origin: true }));

app.get("/test", async (request: Request, response: Response) => {
  logger.info("FUNCTIONS_EMULATOR", process.env.FUNCTIONS_EMULATOR);
  return response.status(200).json({ hello: "world" });
});

app.post(
  "/translate",
  authorized,
  async (
    request: Request<never, never, { words: string[] }>,
    response: Response
  ) => {
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
  async (
    request: Request<never, never, { word: string }>,
    response: Response
  ) => {
    const { word } = request.body;

    await pipeline((await soundWord(word)).data, response);
  }
);

app.post(
  "/generate",
  async (
    request: Request<never, never, { lessonId: string }>,
    response: Response
  ) => {
    const { lessonId } = request.body;

    try {
      logger.info(lessonId);
      await generateLesson(lessonId, "dsv.mail@yandex.ru");
      return response.status(200);
    } catch (error) {
      logger.error(error);
      return response.status(400).json({
        error,
      });
    }
  }
);

exports.app = onRequest(app);

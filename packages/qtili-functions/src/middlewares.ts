import { defineString } from "firebase-functions/params";
import { Request, Response, NextFunction } from "express";

const QTiliApiKey = defineString("QTILI_API_KEY");

export const authorized = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.headers.authorization) {
      const [authType, apiKey] = request.headers.authorization.split(" ");

      if (authType === "Bearer" && apiKey === QTiliApiKey.value()) {
        return next();
      }
    }

    return response.status(403).send({ error: "No permissions" });
  } catch (e) {
    console.log(e);
    return response
      .status(401)
      .send({ error: "You are not authorized to make this request" });
  }
};

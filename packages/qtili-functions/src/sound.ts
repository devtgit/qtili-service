import { defineString } from "firebase-functions/params";
import axios from "axios";
import { Readable } from "stream";

const NarakeetApiKey = defineString("NARAKEET_API_KEY");
const voice = "gulshat";

export const soundWord = async (text: string) => {
  return await axios.post<Readable>(
    `https://api.narakeet.com/text-to-speech/mp3?voice=${voice}`,
    text,
    {
      headers: {
        accept: "application/octet-stream",
        "x-api-key": NarakeetApiKey.value(),
        "content-type": "text/plain",
      },
      responseType: "stream",
    }
  );
};

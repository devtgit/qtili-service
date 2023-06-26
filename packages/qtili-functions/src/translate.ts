import { TranslationServiceClient } from "@google-cloud/translate/build/src/v3";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../service-account.json");

const translationLocation = "us-central1";
const projectId = serviceAccount.project_id;
const translate = new TranslationServiceClient({
  projectId: projectId,
  credentials: serviceAccount,
});

const hasValue = <T>(arg: T): arg is Exclude<Exclude<T, null>, undefined> => {
  return arg != null;
};

export const translateWords = async (contents: string[]): Promise<string[]> => {
  const [response] = await translate.translateText({
    parent: `projects/${projectId}/locations/${translationLocation}`,
    contents: contents,
    sourceLanguageCode: "kk",
    targetLanguageCode: "ru",
    mimeType: "text/plain",
  });

  const { translations } = response;

  if (!translations) {
    throw new Error("Response has no translations.");
  }

  const translatedWords = translations
    .map((x) => x.translatedText)
    .filter(hasValue)
    .map((x) => x.toLowerCase());

  return translatedWords;
};

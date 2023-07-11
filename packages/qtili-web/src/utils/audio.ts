import { getBlob, ref } from "firebase/storage";
import { storage } from "@/firebase/config";

let audioCtx;
if (window.AudioContext) {
  // fix safari playing sound delay
  // see https://stackoverflow.com/questions/9811429/html5-audio-tag-on-safari-has-a-delay/54119854#54119854
  audioCtx = new window.AudioContext();
}
const audio = new Audio();

export const playWordSound = async (wd: string) => {
  audio.pause();

  const src = await getSound(wd);
  if (src) {
    audio.src = src;
    audio.currentTime = 0.2;
    audio.play();
  }
};

const sounds: Record<string, string> = {};

export async function getSound(wd: string): Promise<string | null> {
  if (import.meta.env.VITE_STORAGE_EMULATOR_HOST) {
    // prevent storage emulator request, this request breaks emulators down
    return null;
  }

  if (sounds[wd]) {
    return sounds[wd];
  }

  try {
    const blob = await getBlob(ref(storage, `snd/${wd}.mp3`));
    const src = URL.createObjectURL(blob);

    sounds[wd] = src;
    return src;
  } catch (error) {
    return null;
  }
}

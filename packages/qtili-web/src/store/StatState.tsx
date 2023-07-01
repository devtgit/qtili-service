import { atomWithStorage } from "jotai/utils";

export const StatState = new (class {
  lessonsCount = atomWithStorage("lessonsCount", 0);
})();

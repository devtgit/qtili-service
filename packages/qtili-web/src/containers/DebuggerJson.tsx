import React from "react";
import { useAtomValue } from "jotai";
import { State } from "@/store/State";

export const DebuggerJson = () => {
  const json = useAtomValue(State.json);
  const { ...rest } = json;
  return (
    <pre
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        fontSize: 12,
        lineHeight: "15px",
        overflow: "scroll",
      }}
    >
      {JSON.stringify(rest, null, 2)}
    </pre>
  );
};

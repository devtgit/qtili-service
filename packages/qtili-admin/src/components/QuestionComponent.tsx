import React, { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

type Props = {
  text: string;
  answer: string;
};

const QuestionComponent = (props: Props) => {
  const { text, answer } = props;

  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const choices = useMemo(
    () =>
      answer.split("\n").map((raw) => {
        const text = raw.substring(4);
        const isCorrect = raw.substring(0, 3).toLowerCase().includes("x");

        return {
          text,
          isCorrect,
        };
      }),
    [answer]
  );

  const correctChoice = useMemo(() => {
    return choices.find((choice) => choice.isCorrect);
  }, [answer]);

  const handleAnswer = () => {
    setAnswered(true);
    setCorrect(selected != null && choices[Number(selected)].isCorrect);
  };

  const handleReset = () => {
    setSelected(null);
    setAnswered(false);
  };

  return (
    <Card
      style={{
        position: "relative",
        margin: "0 auto",
        maxWidth: 400,
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <FormControl>
          <Typography variant="h5">{text}</Typography>
          <Typography>Choose the correct answer:</Typography>
          <RadioGroup
            value={selected}
            onChange={(e) => setSelected((e.target as HTMLInputElement).value)}
          >
            {choices.map((choice, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={index}
                  disabled={answered}
                  control={<Radio />}
                  label={choice.text}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", zIndex: 1 }}>
        <Button
          disableRipple
          variant="contained"
          fullWidth={true}
          disabled={!answered ? selected == null : false}
          onClick={!answered ? handleAnswer : handleReset}
          color={!answered ? "primary" : correct ? "primary" : "error"}
          sx={{ fontSize: 16 }}
        >
          {!answered ? "Check" : "Got it"}
        </Button>
      </CardActions>
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          transition: "transform 200ms 100ms",
          transform: answered
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 300px, 0)",
        }}
      >
        {answered && (
          <Alert
            sx={{ paddingBottom: "50px" }}
            severity={correct ? "success" : "error"}
          >
            {correct && (
              <div style={{ marginTop: -6 }}>
                <Typography variant="h6">Correct!</Typography>
              </div>
            )}
            {!correct && (
              <div style={{ marginTop: -6 }}>
                <Typography variant="h6">Not Correct!</Typography>
                <Typography variant="subtitle2">
                  The correct answer is:
                </Typography>
                <Typography>{correctChoice?.text}</Typography>
              </div>
            )}
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default QuestionComponent;

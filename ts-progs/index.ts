import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      throw "malformatted parameters";
    }
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi }).status(200);
  } catch (error: unknown) {
    res
      .send({
        error,
      })
      .status(400);
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.target || !req.body.daily_exercises) {
      throw "parameters missing";
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;

    if (
      // eslint-disable-next-line
      !daily_exercises.every((val: any) => !isNaN(Number(val))) ||
      isNaN(Number(target))
    ) {
      throw "malformatted parameters";
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercise(target, daily_exercises);
    res.send(result).status(200);
  } catch (error: unknown) {
    res
      .send({
        error,
      })
      .status(400);
  }
});

const PORT = 3002;
+app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

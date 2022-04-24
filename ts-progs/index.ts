import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) {
      throw "malformatted parameters";
    }
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } catch (error: unknown) {
    res.send({
      error,
    });
  }
});

const PORT = 3002;
+app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

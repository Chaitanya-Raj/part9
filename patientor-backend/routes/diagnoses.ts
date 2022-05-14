import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get("/:id", (req, res) => {
  const diagnosis = diagnosesService.findById(req.params.id);

  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;

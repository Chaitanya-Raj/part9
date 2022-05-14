/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment
 */

import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = patientService.addEntry(req.body, req.params.id);
    res.json(newEntry);
  } catch (error: unknown) {
    let message = "Unknown Error";
    // properties of unknown objects cannot be accessed in typescript, so we'll have to check if error is really an Error or not
    if (error instanceof Error) message = error.message;
    console.log(message);
    res.status(400).send({ error: message });
  }
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, gender, occupation, ssn, entries } = req.body;
    const newPatient = patientService.addPatient({
      name,
      dateOfBirth,
      gender,
      occupation,
      ssn,
      entries,
    });
    res.json(newPatient);
  } catch (error: unknown) {
    let message = "Unknown Error";
    // properties of unknown objects cannot be accessed in typescript, so we'll have to check if error is really an Error or not
    if (error instanceof Error) message = error.message;
    console.log(message);
    res.status(400).send({ error: message });
  }
});

export default router;

import diagnoses from "../data/diagnoses";

import { Diagnosis } from "../src/types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const findById = (code: string): Diagnosis | undefined => {
  return diagnoses.find((d) => d.code === code);
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
  findById,
};

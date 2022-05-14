import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient, Entry } from "../src/types";
import {
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
  toNewPatient,
} from "../src/utils";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  // we are passing patient to the toNewPatient function to use the parsing functions and check for input errors
  const newPatient = {
    id,
    ...toNewPatient(patient),
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: Entry, pid: string): Entry | void => {
  const id = uuid();
  let newEntry;
  console.log(entry);

  if (
    !entry.type ||
    !["OccupationalHealthcare", "HealthCheck", "Hospital"].includes(entry.type)
  ) {
    throw new Error("Incorrect or missing type");
  }

  switch (entry.type) {
    case "OccupationalHealthcare":
      newEntry = {
        id,
        ...toNewOccupationalHealthcareEntry(entry),
      };
      break;
    case "HealthCheck":
      newEntry = {
        id,
        ...toNewHealthCheckEntry(entry),
      };
      break;
    case "Hospital":
      newEntry = {
        id,
        ...toNewHospitalEntry(entry),
      };
  }

  const updatedPatient = patients.find((p) => p.id == pid);

  if (updatedPatient) {
    updatedPatient.entries.push(newEntry);
    patients.push(updatedPatient);
    return newEntry;
  }
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};

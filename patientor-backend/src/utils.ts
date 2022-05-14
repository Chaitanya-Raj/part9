import {
  Entry,
  Gender,
  NewPatient,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  HealthCheckRating,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupatiom");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
  entries: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    entries: entries as Entry[],
  };

  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return criteria;
};

export const toNewOccupationalHealthcareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  employerName,
  sickLeave,
}: OccupationalHealthcareEntry): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes,
    type,
    employerName: parseEmployerName(employerName),
    sickLeave,
  };

  return newEntry;
};

export const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
}: HealthCheckEntry): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes,
    type,
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };

  return newEntry;
};

export const toNewHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  discharge,
}: HospitalEntry): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes,
    type,
    discharge: {
      date: parseDate(discharge.date),
      criteria: parseCriteria(discharge.criteria),
    },
  };

  return newEntry;
};

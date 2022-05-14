import { CoursePart } from "../types";

const Total = ({ courseParts: coursePart }: { courseParts: CoursePart[] }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {coursePart.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;

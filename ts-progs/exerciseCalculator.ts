interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const parseArgs = (args: Array<string>) => {
//   if (args.length < 4) throw new Error("Not enough arguments");

//   if (args.slice(2).every((val) => !isNaN(Number(val)))) {
//     return {
//       target: Number(args[2]),
//       exercise: args.slice(3).map((a) => Number(a)),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateExercise = (
  target: number,
  exercise: number[]
): Result => {
  const average = exercise.reduce((acc, cur) => acc + cur) / exercise.length;
  const rating = average > target ? 3 : average > target / 2 ? 2 : 1;
  const ratingDescription =
    rating == 3
      ? "good"
      : rating == 2
      ? "not too bad but could be better"
      : "bad";

  return {
    periodLength: exercise.length,
    trainingDays: exercise.filter((e) => e > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { target, exercise } = parseArgs(process.argv);
//   console.log(calculateExercise(target, exercise));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }

import { readFileSync } from "fs";

const input = readFileSync("./src/Day7/day7.txt", "utf-8");

type CrabPositions = number[];

const parseInput = (input: string): CrabPositions => {
  return input.split(",").map((crabPos) => +crabPos);
};

const crabPositions = parseInput(input);

const bestHorizontalMedian = (crabArr: CrabPositions): number => {
  const middleVal = Math.floor(crabArr.length / 2);
  crabArr = crabArr.sort((a, b) => a - b);
  return crabArr.length % 2 === 0
    ? crabArr[middleVal]
    : crabArr[middleVal - 1] + crabArr[middleVal] / 2;
};

const bestHorizontalMean = (crabArr: CrabPositions): number => {
  return Math.floor(crabArr.reduce((a, b) => a + b) / crabArr.length);
};

const calculateFuel = (crabArr: CrabPositions, horizontal: number): number => {
  let fuelRequired = 0;
  crabArr.forEach((crabPos) => {
    crabPos > horizontal
      ? (fuelRequired += crabPos - horizontal)
      : (fuelRequired += horizontal - crabPos);
  });
  return fuelRequired;
};

const calculateFuelUneven = (
  crabArr: CrabPositions,
  horizontal: number
): number => {
  let fuelRequired = 0;
  crabArr.forEach((crabPos) => {
    let diff: number;
    crabPos > horizontal
      ? (diff = crabPos - horizontal)
      : (diff = horizontal - crabPos);
    for (let i = 1; i <= diff; i++) {
      fuelRequired += i;
    }
  });
  return fuelRequired;
};

console.log(bestHorizontalMean(crabPositions));

const partOne = () => {
  console.log(
    `Fuel Required For Part 1: ${calculateFuel(
      crabPositions,
      bestHorizontalMedian(crabPositions)
    )}`
  );
};

const partTwo = () => {
  console.log(
    `Fuel Required For Part 1: ${calculateFuelUneven(
      crabPositions,
      bestHorizontalMean(crabPositions)
    )}`
  );
};

partOne();
partTwo();

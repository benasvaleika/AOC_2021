import { readFileSync } from "fs";

const input = readFileSync("./src/Day6/day6.txt", "utf-8");

type AllFishes = number[];

const parseInput = (input: string): AllFishes =>
  input.split(",").map((fish) => +fish);

const arrToArrs = (arr: AllFishes): number[] => {
  const fishesByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach((a) => fishesByAge[a]++);
  return fishesByAge;
};

const getSum = (arr: number[]) => arr.reduce((prev, curr) => prev + curr);

const fishPopulation = arrToArrs(parseInput(input));

const simulateDay = () => {
  const shift = fishPopulation.shift();
  shift
    ? (fishPopulation.push(shift), (fishPopulation[6] += shift))
    : fishPopulation.push(0);
};

const simulateDays = (days: number) => {
  for (let i = 0; i < days; i++) {
    simulateDay();
  }
  console.log(`Fish pop by day ${days}: ${getSum(fishPopulation)}`);
};

simulateDays(80);
simulateDays(256);

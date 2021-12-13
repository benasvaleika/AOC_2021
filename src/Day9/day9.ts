import { readFileSync } from "fs";

const input = readFileSync("./src/Day9/day9.txt", "utf-8");

interface Position {
  row: number;
  col: number;
  value: number;
  visited: boolean;
}

const parseInput = (input: string) => {
  return input.split("\n").map((line) => line.split("").map((value) => +value));
};

// Write position mapper using 2 for loops.
const positionMapper = (parsedInput: number[][]): Position[][] => {
  const mappedArr: Position[][] = [];
  for (let i = 0; i < parsedInput.length; i++) {
    const mappedLine: Position[] = [];
    for (let j = 0; j < parsedInput[i].length; j++) {
      let positionObj: Position = {
        row: i,
        col: j,
        value: parsedInput[i][j],
        visited: false,
      };
      mappedLine.push(positionObj);
    }
    mappedArr.push(mappedLine);
  }
  return mappedArr;
};

const findNeigbhors = (positions: Position[][], curr: Position): Position[] => {
  const neighbors: Position[] = [];
  if (curr.col >= 1) neighbors.push(positions[curr.row][curr.col - 1]);
  if (curr.row >= 1) neighbors.push(positions[curr.row - 1][curr.col]);
  if (curr.col < positions[curr.row].length - 1) {
    neighbors.push(positions[curr.row][curr.col + 1]);
  }
  if (curr.row < positions.length - 1) {
    neighbors.push(positions[curr.row + 1][curr.col]);
  }
  return neighbors;
};

const findMins = (positions: Position[][]): Position[] => {
  const mins: Position[] = [];
  for (let row = 0; row < positions.length; row++) {
    for (let col = 0; col < positions[row].length; col++) {
      const curr = positions[row][col];
      const neighbors = findNeigbhors(positions, curr);
      if (neighbors.some((neighbor) => neighbor.value <= curr.value)) continue;
      mins.push(curr);
    }
  }
  return mins;
};

const calcMinsSum = (mins: Position[]): number => {
  let totalSum = 0;
  mins.forEach((min) => (totalSum += min.value + 1));
  return totalSum;
};

const getBasinSize = (positions: Position[][], minPos: Position): number => {
  let totalSize = 0;
  const queue = [minPos];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr) {
      if (curr.value === 9 || curr.visited === true) continue;
      curr.visited = true;
      queue.push(...findNeigbhors(positions, curr));
      totalSize++;
    }
  }
  return totalSize;
};

const top3Basins = (postitions: Position[][], mins: Position[]): number => {
  let allBasins: number[] = [];
  mins.forEach((min) => {
    const basin = getBasinSize(postitions, min);
    allBasins.push(basin);
  });

  const sBasins = allBasins.sort((a, b) => b - a);
  const totalSum = sBasins[0] * sBasins[1] * sBasins[2];

  return totalSum;
};

const allPos = positionMapper(parseInput(input));

const partOne = () => {
  console.log(`Answer for part one: ${calcMinsSum(findMins(allPos))}`);
};

const partTwo = () => {
  console.log(`Asnwer for part two: ${top3Basins(allPos, findMins(allPos))}`);
};

partOne();
partTwo();

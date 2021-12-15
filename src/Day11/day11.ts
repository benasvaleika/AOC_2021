import { readFileSync } from "fs";

const input = readFileSync("./src/Day11/day11.txt", "utf-8");

interface Pos {
  row: number;
  col: number;
  energy: number;
  flashed: boolean;
}

const parseInput = (input: string) => {
  return input.split("\n").map((line) => line.split("").map((value) => +value));
};

const positionMapper = (parsedInput: number[][]): Pos[][] => {
  const mappedArr: Pos[][] = [];
  for (let i = 0; i < parsedInput.length; i++) {
    const mappedLine: Pos[] = [];
    for (let j = 0; j < parsedInput[i].length; j++) {
      let positionObj: Pos = {
        row: i,
        col: j,
        energy: parsedInput[i][j],
        flashed: false,
      };
      mappedLine.push(positionObj);
    }
    mappedArr.push(mappedLine);
  }
  return mappedArr;
};

const findNeighbors = (positions: Pos[][], curr: Pos): Pos[] => {
  const neighbors: Pos[] = [];
  const adjPositions = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ];
  for (const adjPos of adjPositions) {
    const row = curr.row + adjPos.row;
    const col = curr.col + adjPos.col;
    if (positions[row] === undefined) continue;
    if (positions[row][col] === undefined) continue;
    neighbors.push(positions[row][col]);
  }
  return neighbors;
};

const simulateStep = (positions: Pos[][]) => {
  const flashes: Pos[] = [];
  positions.forEach((row) => {
    row.forEach((oct) => {
      oct.flashed = false;
      energize(oct);
      oct.flashed && flashes.push(oct);
    });
  });
  return flashes;
};

const energize = (position: Pos) => {
  if (position.energy < 9) {
    position.energy++;
  } else {
    position.energy = 0;
    position.flashed = true;
  }
};

// Returns # of flashes
const resolveStep = (positions: Pos[][], queue: Pos[]): number => {
  let totalFlashes = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currNeighbors = findNeighbors(positions, curr);
    for (const neighbor of currNeighbors) {
      if (neighbor.flashed) continue;
      energize(neighbor);
      if (neighbor.flashed) queue.push(neighbor);
    }
    totalFlashes++;
  }
  return totalFlashes;
};

const simulateSteps = (numOfSteps: number): number => {
  let totalFlashes = 0;
  let allPos = positionMapper(parseInput(input));
  for (let i = 0; i < numOfSteps; i++) {
    const flashes = simulateStep(allPos);
    totalFlashes += resolveStep(allPos, flashes);
  }

  return totalFlashes;
};

const partOne = () => {
  console.log(`Answer for part one: ${simulateSteps(100)}`);
};

const partTwo = () => {
  let currStep = 0;
  let allPos = positionMapper(parseInput(input));
  while (true) {
    const flashes = simulateStep(allPos);
    resolveStep(allPos, flashes);
    currStep++;
    if (allPos.flatMap((row) => row).every((oct) => oct.energy === 0)) {
      console.log(`Answer for part two: ${currStep}`);
      break;
    }
  }
};

partOne();
partTwo();

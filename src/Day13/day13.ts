import { readFileSync } from "fs";

const input = readFileSync("./src/Day13/day13.txt", "utf-8").split("\n\n");

interface Command {
  isX: boolean;
  line: number;
}

const parseCommands = (input: string): Command[] => {
  const commands: Command[] = [];
  input
    .split("\n")
    .map((line) => line.split(" "))
    .forEach((command) => {
      const params = command[2].split("=");
      commands.push({
        isX: params[0] === "x" ? true : false,
        line: parseInt(params[1]),
      });
    });
  return commands;
};

const parseInput = (input: string): Set<string> => {
  const positions: Set<string> = new Set();
  input.split("\n").map((value) => {
    positions.add(value);
  });
  return positions;
};

const deserialize = (str: string): number[] => {
  return str.split(",").map(Number);
};

const foldPaper = (positions: Set<string>, command: Command): Set<string> => {
  const newPositions: Set<string> = new Set();
  positions.forEach((pos) => {
    const idx = command.isX ? 0 : 1;
    const coords = deserialize(pos);
    if (coords[idx] > command.line) {
      coords[idx] -= (coords[idx] - command.line) * 2;
    }
    newPositions.add(coords.join(","));
  });
  return newPositions;
};

const partOne = () => {
  console.log(
    `Answer to part one: ${
      foldPaper(parseInput(input[0]), parseCommands(input[1])[0]).size
    }`
  );
};

const displayTxt = (positions: Set<string>) => {
  const page: string[][] = [];
  let text = "";
  for (const pos of positions) {
    const [x, y] = deserialize(pos);
    page[y] = page[y] ?? [];
    page[y][x] = "#";
  }

  for (const row of page) {
    for (const col of row) {
      text += col ?? " ";
    }
    text += "\n";
  }

  console.log(text);
};

const partTwo = () => {
  let finalPositions = parseInput(input[0]);
  for (let i = 0; i < parseCommands(input[1]).length; i++) {
    finalPositions = foldPaper(finalPositions, parseCommands(input[1])[i]);
  }
  console.log(`Answer to part two:`);
  displayTxt(finalPositions);
};

partOne();
partTwo();

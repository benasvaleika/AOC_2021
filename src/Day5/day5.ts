import { readFileSync } from "fs";

const input = readFileSync("./src/Day5/day5.txt", "utf-8");

type Coords = {
  x: number;
  y: number;
};

type Line = {
  from: Coords;
  to: Coords;
};

type Board = number[][];
type LineData = Line[];

const parseInput = (input: string): LineData => {
  return input.split("\n").map((row) => {
    return row
      .split(" -> ")
      .map((pair) => pair.split(","))
      .reduce(
        (data: Line, pair: string[], index: number) => {
          const coords = {
            x: parseInt(pair[0]),
            y: parseInt(pair[1]),
          };
          return {
            from: index === 0 ? coords : data.from,
            to: index === 1 ? coords : data.to,
          };
        },
        { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }
      );
  });
};

const getDistance = (line: Line): { x: number; y: number } => ({
  x: line.to.x - line.from.x,
  y: line.to.y - line.from.y,
});

const getLineIterators = (line: Line): { x: number; y: number } => {
  const distance = getDistance(line);
  return {
    x: distance.x ? (distance.x > 0 ? 1 : -1) : 0,
    y: distance.y ? (distance.y > 0 ? 1 : -1) : 0,
  };
};

const isDiagonal = (line: Line) => {
  const iter = getLineIterators(line);
  return iter.x && iter.y;
};

const generateLinePath = (line: Line): Coords[] => {
  const iter = getLineIterators(line);
  const pos = { x: line.from.x, y: line.from.y } as Coords;
  const coords = [{ ...pos }];
  while (pos.x !== line.to.x || pos.y !== line.to.y) {
    pos.x += iter.x;
    pos.y += iter.y;
    coords.push({ x: pos.x, y: pos.y } as Coords);
  }
  return coords;
};

const hashCoords = (coords: Coords) => `${coords.x}#${coords.y}`;

const countOverlaps = (lines: Line[]): number => {
  const map = new Map<string, number>();
  const updateMap = (key: string) => map.set(key, (map.get(key) || 0) + 1);
  lines.map(generateLinePath).flat().map(hashCoords).forEach(updateMap);
  return [...map.values()].filter((value) => value > 1).length;
};

const data = parseInput(input);

const partOne = () => {
  const straightLines = data.filter((line) => !isDiagonal(line));
  return countOverlaps(straightLines);
};

const partTwo = () => {
  return countOverlaps(data);
};

console.log("Part One: " + partOne());
console.log("Part Two: " + partTwo());

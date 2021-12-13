import { readFileSync } from "fs";

const OpenBrackets = ["(", "[", "{", "<"];
const CloseBrackets = [")", "]", "}", ">"];
const brcktPoints: any = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const input = readFileSync("./src/Day10/day10.txt", "utf-8").split("\n");

const getIncBracket = (bracketLine: string) => {
  const brcktStack: string[] = [];
  for (let i = 0; i < bracketLine.length; i++) {
    if (OpenBrackets.includes(bracketLine[i])) {
      brcktStack.push(bracketLine[i]);
    }
    if (CloseBrackets.includes(bracketLine[i])) {
      const lastOpen = brcktStack.pop();
      if (lastOpen) {
        if (
          OpenBrackets.indexOf(lastOpen) !==
          CloseBrackets.indexOf(bracketLine[i])
        ) {
          return bracketLine[i];
        }
      }
    }
  }
  return null;
};

const incBrackets = (input: string[]): string[] => {
  const allBrckts: string[] = [];
  input.forEach((line) => {
    const lineResult = getIncBracket(line);
    if (lineResult !== null) {
      allBrckts.push(lineResult);
    }
  });

  return allBrckts;
};

const calcPoints = (brackets: string[]): number => {
  let totalSum = 0;
  brackets.forEach((value) => (totalSum += brcktPoints[value]));
  return totalSum;
};

const partOne = () => {
  console.log(`Answer to part one: ${calcPoints(incBrackets(input))}`);
};

partOne();

import { readFileSync } from "fs";

const solve = () => {
  const dataInput = readFileSync("./src/Day4/day4-input.txt", "utf-8").split(
    "\n"
  );
  const numbers = dataInput[0].split(",").map((num) => +num.trim());

  interface boardNumber {
    value: number;
    marked: boolean;
  }
  type Board = boardNumber[][];
  const boards: Board[] = [];

  for (const item of dataInput.slice(1)) {
  }
};

solve();

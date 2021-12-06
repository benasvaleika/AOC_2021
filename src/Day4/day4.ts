import { readFileSync } from "fs";

interface BoardPosition {
  value: number;
  marked: boolean;
}

type Board = BoardPosition[][];

const solve = () => {
  const dataInput = readFileSync("./src/Day4/day4-input.txt", "utf-8").split(
    "\n"
  );
  const numbers = dataInput[0].split(",").map((num) => +num.trim());

  const boards = [];
  let boardArr = [];
  let firstBingo: number | undefined;
  let lastBingo: number | undefined;

  for (const item of dataInput.slice(2)) {
    if (item === "") {
      boards.push(boardArr);
      boardArr = [];
    } else {
      const line = item.trim().split(/\s+/);
      boardArr.push(line.map((number) => ({ value: +number, marked: false })));
    }
  }

  for (const number of numbers) {
    const boardsLeft = boards.filter((board) => !isBingo(board));
    if (!boardsLeft.length) {
      break;
    }
    for (const board of boardsLeft) {
      checkForMatches(board, number);
      if (isBingo(board) && firstBingo === undefined) {
        firstBingo = sumOfUnmarked(board) * number;
      } else if (boardsLeft.length === 1 && isBingo(board)) {
        lastBingo = sumOfUnmarked(board) * number;
      }
    }
  }

  console.log(
    "First Bingo score: " + firstBingo + "\nLast Bingo score: " + lastBingo
  );
};

const sumOfUnmarked = (board: Board): number => {
  let sum = 0;
  const allUnmarked = board.flat(1).filter((number) => !number.marked);
  allUnmarked.forEach((number) => (sum += number.value));
  return sum;
};

const isBingo = (board: Board): boolean => {
  for (let i = 0; i < 5; i++) {
    if (board[i].findIndex((number) => !number.marked) === -1) {
      return true;
    }
    let vertCount = 0;
    for (let j = 0; j < 5; j++) {
      board[j][i].marked && vertCount++;
    }
    if (vertCount === 5) {
      return true;
    }
  }

  return false;
};

const checkForMatches = (board: Board, value: number): void => {
  const match = board.flat(1).find((number) => number.value === value);
  if (match) match.marked = true;
};

solve();

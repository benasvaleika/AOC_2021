import { readFileSync } from "fs";

const partOne = () => {
  let totalCount = 0;
  const inputFile = readFileSync("./src/Day1/day1-input.txt", "utf-8");
  const inputFileArr = inputFile.split("\n").map((depth) => {
    return parseInt(depth);
  });

  for (let i = 0; i < inputFileArr.length; i++) {
    if (inputFileArr[i] > inputFileArr[i - 1]) {
      totalCount++;
    }
  }
  console.log("Part one answer: " + totalCount);
};

const partTwo = () => {
  let totalCount = 0;
  const inputFile = readFileSync("./src/Day1/day1-input.txt", "utf-8");
  const inputFileArr = inputFile.split("\n").map((depth) => {
    return parseInt(depth);
  });

  for (let i = 1; i < inputFileArr.length - 1; i++) {
    const sumCurr = inputFileArr[i - 1] + inputFileArr[i] + inputFileArr[i + 1];
    const sumNext = inputFileArr[i] + inputFileArr[i + 1] + inputFileArr[i + 2];

    if (sumCurr < sumNext) {
      totalCount++;
    }
  }
  console.log("Part two answer: " + totalCount);
};

partOne();
partTwo();

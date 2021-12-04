import { readFileSync } from "fs";

const partOne = () => {
  let posHorizontal = 0;
  let posVertical = 0;

  const inputData = readFileSync("./src/Day2/day2-input.txt", "utf-8")
    .split("\n")
    .map((line) => {
      return line.split(" ");
    });

  inputData.forEach((command) => {
    if (command[0] === "forward") {
      posHorizontal = posHorizontal + parseInt(command[1]);
    } else if (command[0] === "down") {
      posVertical = posVertical + parseInt(command[1]);
    } else if (command[0] === "up") {
      posVertical = posVertical - parseInt(command[1]);
    }
  });
  const result = posVertical * posHorizontal;
  console.log("Answer to part one: " + result);
};

const partTwo = () => {
  let posHorizontal = 0;
  let posVertical = 0;
  let aim = 0;

  const inputData = readFileSync("./src/Day2/day2-input.txt", "utf-8")
    .split("\n")
    .map((line) => {
      return line.split(" ");
    });

  inputData.forEach((command) => {
    if (command[0] === "forward") {
      posHorizontal = posHorizontal + parseInt(command[1]);
      posVertical = posVertical + parseInt(command[1]) * aim;
    } else if (command[0] === "down") {
      aim = aim + parseInt(command[1]);
    } else if (command[0] === "up") {
      aim = aim - parseInt(command[1]);
    }
  });

  const result = posVertical * posHorizontal;
  console.log("Answer to part two: " + result);
};

partOne();
partTwo();

import { readFileSync } from "fs";

let dataInput = readFileSync("./src/Day3/day3-input.txt", "utf-8")
  .trim()
  .split("\n");

const partOne = (): void => {
  let gamma = "";
  let epsilon = "";

  for (let binI = 0; binI < dataInput[0].length; binI++) {
    let zeroCount = 0;
    let oneCount = 0;

    dataInput.forEach((bin) => {
      bin[binI] === "0" ? zeroCount++ : oneCount++;
    });

    if (zeroCount > oneCount) {
      gamma = gamma + "0";
      epsilon = epsilon + "1";
    } else {
      gamma = gamma + "1";
      epsilon = epsilon + "0";
    }
  }
  const result = parseInt(gamma, 2) * parseInt(epsilon, 2);
  console.log("Answer to part one: " + result);
};

const partTwo = (): void => {
  let oxygenArr = dataInput;
  let co2Arr = dataInput;

  for (let binI = 0; binI < oxygenArr[0].length; binI++) {
    let oZeroCount = 0;
    let oOneCount = 0;
    let coZeroCount = 0;
    let coOneCount = 0;

    oxygenArr.forEach((bin) => {
      bin[binI] === "0" ? oZeroCount++ : oOneCount++;
    });
    co2Arr.forEach((bin) => {
      bin[binI] === "0" ? coZeroCount++ : coOneCount++;
    });

    const oSupVal = oZeroCount > oOneCount ? "0" : "1";
    const coSupVal = coZeroCount > coOneCount ? "0" : "1";

    console.log(oZeroCount, oOneCount, coZeroCount, coOneCount);
    if (oxygenArr.length > 1) {
      oxygenArr = oxygenArr.filter((bin) => {
        return bin[binI] === oSupVal;
      });
    }
    if (co2Arr.length > 1) {
      co2Arr = co2Arr.filter((bin) => {
        return bin[binI] !== coSupVal;
      });
    }
  }

  const result = parseInt(oxygenArr[0], 2) * parseInt(co2Arr[0], 2);
  console.log("Answer for part two: " + result);
};

partOne();
partTwo();

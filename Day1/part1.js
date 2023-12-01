const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let sum = 0;

for (let str of file) {
    const numsInStr = str.split("").filter(Number);

    const combinedNum = numsInStr[0] + numsInStr[numsInStr.length - 1];

    sum += +combinedNum;
}

console.log(sum);

const readFile = require("fs").readFileSync;

const file = readFile(__dirname + "/example.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => +x.split(":")[1].trim().replaceAll(/\s+/g, ""));

const [time, record] = file;

let numOfRecords = 0;
for (let j = 0; j <= +time; j++) {
    const myRun = j * (+time - j);
    if (myRun > +record) numOfRecords++;
}

console.log(numOfRecords);

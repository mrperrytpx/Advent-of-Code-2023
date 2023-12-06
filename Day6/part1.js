const readFile = require("fs").readFileSync;

const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => x.split(":")[1].trim().replaceAll(/\s+/g, " ").split(" "));

const pairs = [];
for (let i = 0; i < file[0].length; i++) {
    const newPair = [file[0][i], file[1][i]];
    pairs.push(newPair);
}

let records = [];
for (let i = 0; i < pairs.length; i++) {
    const [time, record] = pairs[i];

    let numOfRecords = 0;
    for (let j = 0; j <= +time; j++) {
        const myRun = j * (+time - j);
        if (myRun > +record) numOfRecords++;
    }

    records.push(numOfRecords);
}

console.log(
    "records",
    records.reduce((a, b) => a * b)
);

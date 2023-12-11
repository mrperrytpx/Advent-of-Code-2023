const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const hashtagCol = [];
const hashtagRow = [];

const EXPANDING_SPACE = 1_000_000 - 1;

for (let row = 0; row < file.length; row++) {
    if (!file[row].includes("#")) hashtagRow.push(row);
    const currCol = file[row]
        .split("")
        .map((_, i) => file.map((row) => row[i]).join(""))[row];

    if (!currCol.includes("#")) hashtagCol.push(row);
}

let coords = [];
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === "#") coords.push([row, col]);
    }
}

for (let i = 0; i < coords.length; i++) {
    let coord = coords[i];

    let lessThanCount = 0;
    for (let j = 0; j < hashtagRow.length; j++) {
        if (coord[0] >= hashtagRow[j]) lessThanCount++;
    }
    coord[0] += lessThanCount * EXPANDING_SPACE;

    lessThanCount = 0;
    for (let j = 0; j < hashtagCol.length; j++) {
        if (coord[1] >= hashtagCol[j]) lessThanCount++;
    }
    coord[1] += lessThanCount * EXPANDING_SPACE;
}

let sumOfLeastPaths = 0;
for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
        sumOfLeastPaths +=
            Math.abs(coords[j][0] - coords[i][0]) +
            Math.abs(coords[j][1] - coords[i][1]);
    }
}

console.log(sumOfLeastPaths);

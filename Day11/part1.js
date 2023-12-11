const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const hashtagCol = [];
const hashtagRow = [];

for (let row = 0; row < file.length; row++) {
    if (!file[row].includes("#")) hashtagRow.push(row);
    const currCol = file[row]
        .split("")
        .map((_, i) => file.map((row) => row[i]).join(""))[row];

    if (!currCol.includes("#")) hashtagCol.push(row);
}

for (let i = 0; i < hashtagCol.length; i++) {
    let hash = hashtagCol[i];
    file = file.map((x) => x.slice(0, hash + i) + "." + x.slice(hash + i));
}

for (let i = 0; i < hashtagRow.length; i++) {
    let row = hashtagRow[i];
    file.splice(row + i, 0, new Array(file[row].length).fill(".").join(""));
}

const coords = [];
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === "#") coords.push([row, col]);
    }
}

let sumOfLeastPaths = 0;
for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
        sumOfLeastPaths +=
            Math.abs(coords[j][1] - coords[i][1]) +
            Math.abs(coords[j][0] - coords[i][0]);
    }
}

console.log(sumOfLeastPaths);

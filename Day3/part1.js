const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const COLS = file[0].length;

function extractNum(row, col) {
    let left = col;
    let right = col;

    while (left > 0 && /\d/.test(file[row][left - 1])) {
        left--;
    }

    while (right < COLS - 1 && /\d/.test(file[row][right + 1])) {
        right++;
    }

    const extractedNumber = file[row].slice(left, right + 1);
    return extractedNumber;
}

let partNumbers = [];

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        const isSymbol = !Number.isInteger(+file[i][j]) && file[i][j] !== ".";

        if (isSymbol) {
            for (let k = -1; k <= 1; k++) {
                const unique = new Set();
                // will not work if a row looks like .......185*185....

                for (let m = -1; m <= 1; m++) {
                    const neighbour = file[i + k][j + m];
                    if (Number.isInteger(+neighbour)) {
                        const wholeNum = extractNum(i + k, j + m);
                        unique.add(+wholeNum);
                    }
                }
                const nums = Array.from(unique);
                partNumbers = [...partNumbers, ...nums];
            }
        }
    }
}

console.log(partNumbers.reduce((a, b) => a + b, 0));

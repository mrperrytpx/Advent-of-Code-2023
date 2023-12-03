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

let sum = 0;

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        const isGear = file[i][j] === "*";
        if (isGear) {
            let parts = [];
            for (let k = -1; k <= 1; k++) {
                const unique = new Set();

                for (let m = -1; m <= 1; m++) {
                    const neighbour = file[i + k][j + m];
                    if (Number.isInteger(+neighbour)) {
                        const wholeNum = extractNum(i + k, j + m);
                        unique.add(+wholeNum);
                    }
                }
                const nums = Array.from(unique);
                parts = [...parts, ...nums];
            }

            if (parts.length === 2) {
                const gearRatio = parts[0] * parts[1];
                sum += gearRatio;
            }
        }
    }
}

console.log(sum);

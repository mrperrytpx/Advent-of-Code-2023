const readFile = require("fs").readFileSync;

const REMAP = {
    "|": "│",
    "-": "─",
    L: "└",
    J: "┘",
    7: "┐",
    F: "┌",
    ".": ".",
    S: "*",
};

let startingCoords = [];

const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x, i) =>
        x
            .split("")
            .map((y, j) => {
                if (y === "S") {
                    startingCoords = [i, j];
                }
                return REMAP[y];
            })
            .join("")
    );

function determineDirection(prevPipe, currPipe) {
    let newPair = [currPipe[0] - prevPipe[0], currPipe[1] - prevPipe[1]];

    switch (newPair.toString()) {
        case "0,1": {
            return "from-left";
        }
        case "0,-1": {
            return "from-right";
        }
        case "1,0": {
            return "from-up";
        }
        case "-1,0": {
            return "from-down";
        }
    }
}

const VALID_PATHS_MAP = {
    "from-left-─": [0, 1],
    "from-right-─": [0, -1],
    "from-down-│": [-1, 0],
    "from-up-│": [1, 0],
    "from-left-┐": [1, 0],
    "from-down-┐": [0, -1],
    "from-right-┌": [1, 0],
    "from-down-┌": [0, 1],
    "from-left-┘": [-1, 0],
    "from-up-┘": [0, -1],
    "from-up-└": [0, 1],
    "from-right-└": [-1, 0],
};

let prevPipe = [...startingCoords];
let currPipe = [17, 104];
let allLoopCoords = [startingCoords];

console.log(startingCoords);

while (currPipe.toString() !== startingCoords.toString()) {
    const prevDirection = determineDirection(prevPipe, currPipe);
    const currChar = file[currPipe[0]][currPipe[1]];
    const nextDirectionVal = VALID_PATHS_MAP[`${prevDirection}-${currChar}`];
    const nextPipe = [
        currPipe[0] + nextDirectionVal[0],
        currPipe[1] + nextDirectionVal[1],
    ];
    allLoopCoords.push(currPipe);

    prevPipe = currPipe;
    currPipe = nextPipe;
}

let minRow = Infinity;
let minCol = Infinity;
let maxRow = 0;
let maxCol = 0;
allLoopCoords = allLoopCoords
    .sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    })
    .map((x) => {
        if (x[0] < minRow) minRow = x[0];
        if (x[0] > maxRow) maxRow = x[0];
        if (x[1] < minCol) minCol = x[1];
        if (x[1] > maxCol) maxCol = x[1];
        return x.toString();
    });

// console.log(minRow, maxRow, minCol, maxCol);
// console.log(allLoopCoords);

let validWalls = ["│", "┘", "└"];

let FUCK = 0;
for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[0].length; j++) {
        if (allLoopCoords.includes([i, j].toString())) continue;

        let countCrossed = 0;
        for (let m = j; m <= maxCol; m++) {
            if (
                allLoopCoords.includes([i + 1, m].toString()) &&
                validWalls.includes(file[i + 1][m])
            ) {
                countCrossed++;
            }
        }

        if (countCrossed % 2 === 0) continue;

        FUCK += 1;
    }
}

console.log(FUCK);

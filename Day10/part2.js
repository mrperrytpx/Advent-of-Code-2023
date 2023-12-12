String.prototype.replaceAt = function (index, replacement) {
    return (
        this.substring(0, index) +
        replacement +
        this.substring(index + replacement.length)
    );
};

const readFile = require("fs").readFileSync;

let startingCoords = [];
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

file.forEach((x, i) => {
    x.split("").forEach((y, j) => {
        if (y === "S") {
            startingCoords = [i, j];
            return;
        }
    });
});

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
    "from-left--": [0, 1],
    "from-right--": [0, -1],
    "from-down-|": [-1, 0],
    "from-up-|": [1, 0],
    "from-left-7": [1, 0],
    "from-down-7": [0, -1],
    "from-right-F": [1, 0],
    "from-down-F": [0, 1],
    "from-left-J": [-1, 0],
    "from-up-J": [0, -1],
    "from-up-L": [0, 1],
    "from-right-L": [-1, 0],
};

let prevPipe = [...startingCoords];
let currPipe = [17, 104];
let allLoopCoords = [startingCoords.toString()];

while (currPipe.toString() !== startingCoords.toString()) {
    const prevDirection = determineDirection(prevPipe, currPipe);
    const currChar = file[currPipe[0]][currPipe[1]];
    const nextDirectionVal = VALID_PATHS_MAP[`${prevDirection}-${currChar}`];
    const nextPipe = [
        currPipe[0] + nextDirectionVal[0],
        currPipe[1] + nextDirectionVal[1],
    ];
    allLoopCoords.push(currPipe.toString());

    prevPipe = currPipe;
    currPipe = nextPipe;
}

let validWalls = ["|", "J", "L"];

file[startingCoords[0]] = file[startingCoords[0]].replaceAt(
    startingCoords[1],
    "|"
);

let tilesInLoop = 0;
for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[0].length; j++) {
        if (allLoopCoords.includes([i, j].toString())) continue;

        let countCrossed = 0;
        for (let m = j; m <= file[0].length; m++) {
            if (
                allLoopCoords.includes([i, m].toString()) &&
                validWalls.includes(file[i][m])
            ) {
                countCrossed++;
            }
        }

        if (countCrossed % 2 === 0) continue;
        tilesInLoop += 1;
    }
}

console.log(tilesInLoop);

const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => x.split(""));

const CYCLES = 1_000_000_000;
let load = 0;

let cache = new Map();

for (let c = 0; c < CYCLES; c++) {
    let northRockMap = new Set();

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "#") {
                northRockMap.add([i, j].toString());
            }
        }
    }

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (i === 0 && file[i][j] === "O") {
                northRockMap.add([i, j].toString());
            } else {
                if (
                    file[i][j] === "O" &&
                    (file[i - 1][j] === "O" || file[i - 1][j] === "#")
                ) {
                    northRockMap.add([i, j].toString());
                    continue;
                }
                if (file[i][j] === "O" && file[i - 1][j] === ".") {
                    const rocksAbove = [...northRockMap.values()]
                        .map((x) => x.split(",").map(Number))
                        .filter((x) => x[1] === j && x[0] <= i);
                    if (!rocksAbove.length) {
                        file[0][j] = "O";
                        file[i][j] = ".";
                        northRockMap.add([0, j].toString());
                    } else {
                        let closestRock = rocksAbove.sort((a, b) => {
                            if (a[0] === b[0]) return a[1] - b[1];
                            return a[0] - b[0];
                        })[rocksAbove.length - 1];
                        let [iRock, jRock] = [closestRock[0] + 1, j];
                        file[iRock][jRock] = "O";
                        file[i][j] = ".";
                        northRockMap.add([iRock, jRock].toString());
                    }
                }
            }
        }
    }

    // west

    let westRockMap = new Set();

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "#") {
                westRockMap.add([i, j].toString());
            }
        }
    }

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (j === 0 && file[i][j] === "O") {
                westRockMap.add([i, j].toString());
            } else {
                if (
                    file[i][j] === "O" &&
                    (file[i][j - 1] === "O" || file[i][j - 1] === "#")
                ) {
                    westRockMap.add([i, j].toString());
                    continue;
                }
                if (file[i][j] === "O" && file[i][j - 1] === ".") {
                    const rocksLeft = [...westRockMap.values()]
                        .map((x) => x.split(",").map(Number))
                        .filter((x) => x[0] === i && x[1] <= j);

                    if (!rocksLeft.length) {
                        file[i][0] = "O";
                        file[i][j] = ".";
                        westRockMap.add([i, 0].toString());
                    } else {
                        let closestRock = rocksLeft.sort((a, b) => {
                            if (a[0] === b[0]) return a[1] - b[1];
                            return a[0] - b[0];
                        })[rocksLeft.length - 1];
                        let [iRock, jRock] = [i, closestRock[1] + 1];
                        file[iRock][jRock] = "O";
                        file[i][j] = ".";
                        westRockMap.add([iRock, jRock].toString());
                    }
                }
            }
        }
    }

    //south
    let southRockMap = new Set();

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "#") {
                southRockMap.add([i, j].toString());
            }
        }
    }

    for (let i = file.length - 1; i >= 0; i--) {
        for (let j = 0; j < file[i].length; j++) {
            if (i === file.length - 1 && file[i][j] === "O") {
                southRockMap.add([i, j].toString());
            } else {
                if (
                    file[i][j] === "O" &&
                    (file[i + 1][j] === "O" || file[i + 1][j] === "#")
                ) {
                    southRockMap.add([i, j].toString());
                    continue;
                }
                if (file[i][j] === "O" && file[i + 1][j] === ".") {
                    const rocksBelow = [...southRockMap.values()]
                        .map((x) => x.split(",").map(Number))
                        .filter((x) => x[1] === j && x[0] >= i);

                    if (!rocksBelow.length) {
                        file[file.length - 1][j] = "O";
                        file[i][j] = ".";
                        southRockMap.add([file.length - 1, j].toString());
                    } else {
                        let closestRock = rocksBelow.sort((a, b) => {
                            if (a[0] === b[0]) return a[1] - b[1];
                            return a[0] - b[0];
                        })[0];

                        let [iRock, jRock] = [closestRock[0] - 1, j];
                        file[iRock][jRock] = "O";
                        file[i][j] = ".";
                        southRockMap.add([iRock, jRock].toString());
                    }
                }
            }
        }
    }

    // east;
    let eastRockMap = new Set();

    for (let i = 0; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "#") {
                eastRockMap.add([i, j].toString());
            }
        }
    }

    for (let i = 0; i < file.length; i++) {
        for (let j = file[i].length - 1; j >= 0; j--) {
            if (j === file[i].length - 1 && file[i][j] === "O") {
                eastRockMap.add([i, j].toString());
            } else {
                if (
                    file[i][j] === "O" &&
                    (file[i][j + 1] === "O" || file[i][j + 1] === "#")
                ) {
                    eastRockMap.add([i, j].toString());
                    continue;
                }
                if (file[i][j] === "O" && file[i][j + 1] === ".") {
                    const rocksRight = [...eastRockMap.values()]
                        .map((x) => x.split(",").map(Number))
                        .filter((x) => x[0] === i && x[1] >= j);

                    if (!rocksRight.length) {
                        file[i][file[i].length - 1] = "O";
                        file[i][j] = ".";
                        eastRockMap.add([i, file[i].length - 1].toString());
                    } else {
                        let closestRock = rocksRight.sort((a, b) => {
                            if (a[0] === b[0]) return a[1] - b[1];
                            return a[0] - b[0];
                        })[0];
                        let [iRock, jRock] = [i, closestRock[1] - 1];
                        file[iRock][jRock] = "O";
                        file[i][j] = ".";
                        eastRockMap.add([iRock, jRock].toString());
                    }
                }
            }
        }
    }

    let stringFile = file.map((x) => x.join("")).join("|");
    if (cache.has(stringFile)) {
        c = CYCLES - ((CYCLES - c) % (c - cache.get(stringFile)));
    } else {
        cache.set(stringFile, c);
    }
}

for (let i = 0; i < file.length; i++) {
    const countOfO = (file[i].join("").match(/O/g) || []).length;
    load += countOfO * (file.length - i);
}

console.log(load);

const readFile = require("fs").readFileSync;
const writeFile = require("fs").writeFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

let seeds,
    maps = [];

for (let i = 0; i < file.length; i++) {
    if (i === 0) {
        seeds = file[i].split("seeds: ")[1].split(" ").map(Number);
        continue;
    }
    let currMap = file[i].replaceAll("\n", " ").split(": ")[1].split(" ");

    const CHUNK_SIZE = 3;

    let segments = [];

    for (let i = 0; i < currMap.length; i += CHUNK_SIZE) {
        const chunk = currMap.slice(i, i + CHUNK_SIZE);
        segments.push(chunk);
    }

    maps.push(segments);
}

function isFullOverlapping(firstPair, secondPair) {
    return firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1];
}

function getOverlappingPairs(pair, checkAgainstPair) {
    const overlappingPairs = [];

    if (pair[1] < checkAgainstPair[0] || pair[0] > checkAgainstPair[1]) {
        return overlappingPairs;
    }

    const start = Math.max(pair[0], checkAgainstPair[0]);
    const end = Math.min(pair[1], checkAgainstPair[1]);

    if (pair[0] < start) {
        overlappingPairs.push([pair[0], start - 1]);
    }

    overlappingPairs.push([start, end]);

    if (pair[1] > end) {
        overlappingPairs.push([end + 1, pair[1]]);
    }

    return overlappingPairs;
}

let minLoc = [];

for (let i = 0; i < seeds.length; i += 2) {
    let startingPairs = [[+seeds[i], +seeds[i] + (+seeds[i + 1] - 1)]];
    let lastIdx = 0;

    while (startingPairs.length) {
        let currPair = startingPairs.shift();
        let shouldBreak = false;

        for (let mapIdx = lastIdx ?? 0; mapIdx < maps.length; mapIdx++) {
            let currMap = maps[mapIdx];

            for (let range = 0; range < currMap.length; range++) {
                let vals = currMap[range];

                let checkAgainstPair = [+vals[1], +vals[1] + (+vals[2] - 1)];

                let isFullOverlap = isFullOverlapping(
                    currPair,
                    checkAgainstPair
                );

                if (isFullOverlap) {
                    currPair[0] += +vals[0] - +vals[1];
                    currPair[1] += +vals[0] - +vals[1];
                    break;
                }
                let newPairs = getOverlappingPairs(currPair, checkAgainstPair);

                if (newPairs.length) {
                    startingPairs.push(...newPairs);
                    shouldBreak = true;

                    break;
                }
            }

            if (shouldBreak) {
                lastIdx = mapIdx;

                break;
            }

            if (mapIdx === maps.length - 1) {
                minLoc.push(currPair);
            }
        }
    }
}

// solution = 78775051
// IT'S HIDING IN THE ARRAY

console.log(
    "location ranges",
    minLoc.sort((a, b) => a[0] - b[0])
);

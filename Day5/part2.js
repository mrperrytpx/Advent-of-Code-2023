const readFile = require("fs").readFileSync;
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

let minLoc = Infinity;

for (let i = 0; i < seeds.length; i += 2) {
    let seedRanges = [[+seeds[i], +seeds[i] + (+seeds[i + 1] - 1)]];

    for (let map of maps) {
        for (let j = 0; j < seedRanges.length; j++) {
            let pair = seedRanges[j];
            for (let range of map) {
                let checkAgainstPair = [+range[1], +range[1] + (+range[2] - 1)];
                let isFullOverlap = isFullOverlapping(pair, checkAgainstPair);
                if (isFullOverlap) {
                    pair[0] += +range[0] - +range[1];
                    pair[1] += +range[0] - +range[1];
                    break;
                }
                let newPairs = getOverlappingPairs(pair, checkAgainstPair);

                if (newPairs.length) {
                    switch (newPairs.length) {
                        case 3: {
                            seedRanges.push(newPairs[0]);
                            seedRanges.push(newPairs[2]);
                            newPairs[1][0] += +range[0] - +range[1];
                            newPairs[1][1] += +range[0] - +range[1];
                            seedRanges[j] = newPairs[1];
                            break;
                        }
                        case 2: {
                            for (let partial of newPairs) {
                                const isItOverlapping = isFullOverlapping(
                                    partial,
                                    checkAgainstPair
                                );
                                if (isItOverlapping) {
                                    partial[0] += +range[0] - +range[1];
                                    partial[1] += +range[0] - +range[1];
                                    seedRanges[j] = partial;
                                } else {
                                    seedRanges.push(partial);
                                }
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
    const minSeedRange = seedRanges.sort((a, b) => a[0] - b[0])[0][0];
    if (minSeedRange < minLoc) minLoc = minSeedRange;
}

console.log(minLoc);

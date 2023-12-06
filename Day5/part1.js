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

function inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
}

let minLoc = Infinity;

for (let seed of seeds) {
    for (let currMap of maps) {
        for (let vals of currMap) {
            const viable = inRange(seed, +vals[1], +vals[1] + (+vals[2] - 1));
            if (viable) {
                seed = seed + (+vals[0] - +vals[1]);
                break;
            }
        }
    }
    if (seed < minLoc) {
        minLoc = seed;
    }
}

console.log(minLoc);

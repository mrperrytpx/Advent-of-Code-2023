const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let [instructions, ...directionMaps] = file;

let isLooking = true;
let startingIdx = 0;
let rounds = 0;

instructions = instructions.split("").map((x) => (x === "R" ? 1 : 0));
directionMaps = directionMaps.map((x, i) => {
    const split = x.split(" = ");
    if (split[0] === "AAA") startingIdx = i;
    return split;
});

while (isLooking) {
    for (let i = 0; i < instructions.length; i++) {
        let [start, directions] = directionMaps[startingIdx];
        if (start === "ZZZ") {
            isLooking = false;
            break;
        }
        directions = directions.replace(/[\(\)]/g, "").split(", ");
        for (let [idx, [start]] of directionMaps.entries()) {
            if (start === directions[instructions[i]]) {
                startingIdx = idx;
                break;
            }
        }
        rounds++;
    }
}

console.log("rounds to find zzz", rounds);

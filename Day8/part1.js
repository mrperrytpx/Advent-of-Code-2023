const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/example.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let [instructions, ...maps] = file;

const START_TARGET = "AAA";
const END_TARGET = "ZZZ";
instructions = instructions.split("").map((x) => (x === "R" ? 1 : 0));

let directionMaps = {};
maps.forEach((x) => {
    let [start, end] = x.split(" = ");
    end = end.replace(/[\(\)]/g, "").split(", ");
    directionMaps[start] = end;
});
let isLooking = true;
let rounds = 0;

let currStr = START_TARGET;
while (isLooking) {
    for (let i = 0; i < instructions.length; i++) {
        let directions = directionMaps[currStr];
        if (currStr === END_TARGET) {
            isLooking = false;
            break;
        }
        currStr = directions[instructions[i]];
        rounds++;
    }
}

console.log(rounds);

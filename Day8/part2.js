const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let [instructions, ...maps] = file;
instructions = instructions.split("").map((x) => (x === "R" ? 1 : 0));

let directionMaps = {};
let currStrs = [];
maps.forEach((x) => {
    let [start, end] = x.split(" = ");
    end = end.replace(/[\(\)]/g, "").split(", ");
    directionMaps[start] = end;
    if (start.endsWith("A")) currStrs.push(start);
});
let isLooking = true;

const allRoundLens = [];

for (let j = 0; j < currStrs.length; j++) {
    let currStr = currStrs[j];
    let rounds = 0;
    isLooking = true;
    while (isLooking) {
        for (let i = 0; i < instructions.length; i++) {
            let directions = directionMaps[currStr];
            if (currStr.endsWith("Z")) {
                console.log("curr ends with Z", currStr);
                allRoundLens.push(rounds);
                isLooking = false;
                break;
            }
            currStr = directions[instructions[i]];
            rounds++;
        }
    }
}

function greatestCommonDivisor(a, b) {
    for (let temp = b; b !== 0; ) {
        b = a % b;
        a = temp;
        temp = b;
    }
    return a;
}

function leastCommonMultiple(nums) {
    let lcm = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const currNum = nums[i];
        const gcd = greatestCommonDivisor(lcm, currNum);
        lcm = (lcm * currNum) / gcd;
    }

    return lcm;
}

console.log(leastCommonMultiple(allRoundLens));

const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let numOfArrangements = 0;

for (const line of file) {
    let [map, vals] = line.split(" ");
    vals = vals.split(",");

    const results = generatePermutations(map, 0, []);

    for (let r of results) {
        let pairsOfHsh = r.match(new RegExp("#+", "g"));
        let pairsOfAshAsNum = pairsOfHsh?.map((x) => x.length);
        if (pairsOfAshAsNum?.toString() === vals.toString()) {
            numOfArrangements++;
        }
    }
}

console.log(numOfArrangements);

function generatePermutations(str) {
    const result = [];

    function permuteHelper(current, index) {
        if (index === str.length) {
            result.push(current);
            return;
        }

        const char = str[index];
        if (char === "?") {
            permuteHelper(current + "#", index + 1);
            permuteHelper(current + ".", index + 1);
        } else {
            permuteHelper(current + char, index + 1);
        }
    }

    permuteHelper("", 0);
    return result;
}

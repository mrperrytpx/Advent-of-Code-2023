const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let numOfArrangements = 0;

for (const line of file) {
    let [map, vals] = line.split(" ");

    const results = generatePermutations(map, 0, []);

    for (let r of results) {
        let pairsOfHash = r.match(new RegExp("#+", "g"));
        let pairsOfHashAsNum = pairsOfHash?.map((x) => x.length);
        if (pairsOfHashAsNum?.toString() === vals) {
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

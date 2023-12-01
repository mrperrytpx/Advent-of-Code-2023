const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const numsInLetters = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};

let sum = 0;

const pattern = new RegExp(
    "(?=(" + Object.keys(numsInLetters).join("|") + "))",
    "gi"
);

for (let str of file) {
    let newStr = "";

    const matchedWords = [
        ...str.matchAll(pattern, (match) => numsInLetters[match]),
    ];

    if (matchedWords.length) {
        newStr += str.slice(0, matchedWords[0].index);

        for (let i = 0; i <= matchedWords.length - 1; i++) {
            const startingIdx = matchedWords[i].index;
            const spelledNum = matchedWords[i][1];
            const nextIdxStart = matchedWords[i + 1]?.index;

            newStr +=
                numsInLetters[spelledNum] +
                str.slice(startingIdx + spelledNum.length, nextIdxStart);
        }
    }

    if (!newStr) newStr = str;

    newStr = newStr.split("").filter(Number);
    const combinedNum = newStr[0] + newStr[newStr.length - 1];

    sum += +combinedNum;
}

console.log(sum);

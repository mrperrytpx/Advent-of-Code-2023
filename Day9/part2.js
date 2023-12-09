const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => x.split(" ").map(Number));

let sumOfLast = 0;

function findNext(arr, allArrs = []) {
    allArrs.push(arr);
    let newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = arr[i + 1] - arr[i];
        newArr.push(diff);
    }

    if (arr.every((x) => x === 0)) {
        const sumOfAllLast = allArrs
            .reverse()
            .map((arr) => arr[0])
            .reduce((a, b) => b - a, 0);

        return sumOfAllLast;
    }

    return findNext(newArr, allArrs);
}

for (let sequence of file) {
    sumOfLast += findNext(sequence);
}

console.log(sumOfLast);

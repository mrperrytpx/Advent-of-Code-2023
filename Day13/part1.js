const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n")
    .filter((_) => _.trim())
    .map((x) => x.split("\n"));

let someResult = 0;
for (let rowReflections of file) {
    for (let row = 0; row < rowReflections.length; row++) {
        if (rowReflections[row - 1] === rowReflections[row]) {
            let left = row - 1;
            let right = row;

            while (rowReflections[left] === rowReflections[right]) {
                left--;
                right++;
            }

            if (right === rowReflections.length || left === -1) {
                someResult += 100 * Math.round((right + left) / 2);
            }
        }
    }
    let colReflections = rowReflections[0]
        .split("")
        .map((_, i) => rowReflections.map((row) => row[i]).join(""));

    for (let col = 1; col < colReflections.length; col++) {
        if (colReflections[col - 1] === colReflections[col]) {
            let left = col - 1;
            let right = col;

            while (colReflections[left] === colReflections[right]) {
                left--;
                right++;
            }

            if (right === colReflections.length || left === -1) {
                someResult += Math.round((right + left) / 2);
            }
        }
    }
}
console.log(someResult);

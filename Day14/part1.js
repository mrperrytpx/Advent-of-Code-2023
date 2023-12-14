const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => x.split(""));

let load = 0;

for (let i = 1; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        if (file[i][j] === "O" && file[i - 1][j] === ".") {
            let above = i - 1;
            let curr = i;
            while (file?.[above]?.[j] === ".") {
                file[above][j] = "O";
                file[curr][j] = ".";
                above--;
                curr--;
            }
        }
    }
}

for (let i = 0; i < file.length; i++) {
    const countOfO = (file[i].join("").match(/O/g) || []).length;
    load += countOfO * (file.length - i);
}

console.log(load);

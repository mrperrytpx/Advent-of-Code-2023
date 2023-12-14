const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim())
    .map((x) => x.split(""));

const CYCLES = 1000000000;
let load = 0;

for (let c = 0; c < CYCLES; c++) {
    console.log(c);
    for (let i = 1; i < file.length; i++) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "O" && file?.[i - 1]?.[j] === ".") {
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

    // console.log("after roll north");
    // console.log(
    //     JSON.stringify(
    //         file.map((x) => x.join("")),
    //         null,
    //         2
    //     )
    // );

    //west
    for (let i = 0; i < file.length; i++) {
        for (let j = 1; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "O" && file?.[i]?.[j - 1] === ".") {
                let left = j - 1;
                let curr = j;
                while (file?.[i]?.[left] === ".") {
                    file[i][left] = "O";
                    file[i][curr] = ".";
                    left--;
                    curr--;
                }
            }
        }
    }

    // console.log("after roll west");
    // console.log(
    //     JSON.stringify(
    //         file.map((x) => x.join("")),
    //         null,
    //         2
    //     )
    // );

    //south
    for (let i = file.length - 1; i >= 0; i--) {
        for (let j = 0; j < file[i].length; j++) {
            if (file?.[i]?.[j] === "O" && file?.[i + 1]?.[j] === ".") {
                let below = i + 1;
                let curr = i;
                while (file?.[below]?.[j] === ".") {
                    file[below][j] = "O";
                    file[curr][j] = ".";
                    below++;
                    curr++;
                }
            }
        }
    }

    // console.log("after roll south");
    // console.log(
    //     JSON.stringify(
    //         file.map((x) => x.join("")),
    //         null,
    //         2
    //     )
    // );

    //east
    for (let i = 0; i < file.length; i++) {
        for (let j = file[i].length - 1; j >= 0; j--) {
            if (file?.[i]?.[j] === "O" && file?.[i]?.[j + 1] === ".") {
                let right = j + 1;
                let curr = j;
                while (file?.[i]?.[right] === ".") {
                    file[i][right] = "O";
                    file[i][curr] = ".";
                    right++;
                    curr++;
                }
            }
        }
    }

    // console.log("after roll east");
    //     console.log(
    //         JSON.stringify(
    //             file.map((x) => x.join("")),
    //             null,
    //             2
    //         )
    //     );
}

for (let i = 0; i < file.length; i++) {
    const countOfO = (file[i].join("").match(/O/g) || []).length;
    load += countOfO * (file.length - i);
}

console.log(load);

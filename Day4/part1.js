const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let totalPts = 0;

for (let ticket of file) {
    let sum = 0;
    const [_, allNumbers] = ticket.split(":");

    const [winningNums, ticketNums] = allNumbers
        .split("|")
        .map((x) => x.trim().replaceAll("  ", " ").split(" "));

    for (let num of ticketNums) {
        if (winningNums.includes(num)) {
            if (sum === 0) {
                sum = 1;
            } else {
                sum = sum * 2;
            }
        }
    }

    totalPts += sum;
}

console.log("totalPts", totalPts);

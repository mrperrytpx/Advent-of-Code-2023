const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let arr = new Array(file.length).fill(1);

for (let i = 0; i < file.length; i++) {
    const [_, allNumbers] = file[i].split(":");

    let numOfWins = 0;

    const [winningNums, ticketNums] = allNumbers
        .split("|")
        .map((x) => x.trim().replaceAll("  ", " ").split(" "));

    for (let num of ticketNums) {
        if (winningNums.includes(num)) numOfWins++;
    }

    if (numOfWins) {
        for (let j = i + 1; j < i + 1 + numOfWins; j++) {
            const currentTickets = arr[i];
            arr[j] = arr[j] + currentTickets;
        }
    }
}

console.log(arr.reduce((a, b) => a + b));

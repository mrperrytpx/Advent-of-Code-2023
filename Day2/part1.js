const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let sum = 0;

for (let game of file) {
    const [id, data] = game.split(":");

    const draws = data.split(";").map((x) => x.split(",").map((x) => x.trim()));

    let markedForDeath = false;

    for (let round of draws) {
        for (let handful of round) {
            const [amount, color] = handful.split(" ");

            switch (color) {
                case "red": {
                    if (amount > MAX_RED) markedForDeath = true;
                    break;
                }
                case "green": {
                    if (amount > MAX_GREEN) markedForDeath = true;
                    break;
                }
                case "blue": {
                    if (amount > MAX_BLUE) markedForDeath = true;
                    break;
                }
            }
        }
    }

    if (markedForDeath) continue;

    const gameId = +id.split(" ")[1];

    sum += gameId;
}

console.log(sum);

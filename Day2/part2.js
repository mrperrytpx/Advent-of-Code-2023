const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

let power = 0;

for (let game of file) {
    const [_, data] = game.split(":");

    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    const draws = data.split(";").map((x) => x.split(",").map((x) => x.trim()));

    for (let round of draws) {
        for (let handful of round) {
            const [amount, color] = handful.split(" ");

            switch (color) {
                case "red": {
                    if (+amount > minRed) minRed = +amount;
                    break;
                }
                case "green": {
                    if (+amount > minGreen) minGreen = +amount;
                    break;
                }
                case "blue": {
                    if (+amount > minBlue) minBlue = +amount;
                    break;
                }
            }
        }
    }

    const colorsCubed = minRed * minGreen * minBlue;

    power += colorsCubed;
}

console.log(power);

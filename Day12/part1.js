const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

for (const line of file) {
    let [map, vals] = line.split(" ");
    vals = vals.split(",").map(Number);

    const maxSigns = vals.reduce((a, b) => a + b, 0);
    const missingSigns =
        maxSigns - (map.match(new RegExp("#", "g")) || []).length;
    map = map.split("");

    let poss = 0;
    for (let i = 0; i < missingSigns; i++) {
        for (let j = 1 + i; j < map.length; j++) {
            let mapCopy = [...map];

            mapCopy[i] = "#";
            mapCopy[j] = "#";

            mapCopy = mapCopy.map((x) => {
                if (x === "?") return ".";
                return x;
            });

            const matches = mapCopy.join("").match(/#+/g);
            if (matches.length === vals.length) {
                for (let k = 0; k < matches.length; k++) {
                    if (matches[k].length === vals[k]) {
                        console.log(matches, mapCopy, vals);
                    }
                }
            }
        }
    }

    console.log(poss);
    break;
}

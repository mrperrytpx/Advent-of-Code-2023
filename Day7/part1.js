const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const valueMap = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};

const handToValMap = {
    "five of a kind": 7,
    "four of a kind": 6,
    "full house": 5,
    "three of a kind": 4,
    "two pairs": 3,
    "one pair": 2,
    "high card": 1,
};

file = file.map((hand) => {
    let [cards, bid] = hand.split(" ");
    cards = cards.split("").map((x) => valueMap[x]);

    return [cards, bid];
});

function detectPokerHand(hand) {
    const cardCounts = {};
    for (const card of hand) {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
    }

    const maxCount = Math.max(...Object.values(cardCounts));
    switch (maxCount) {
        case 5:
            return handToValMap["five of a kind"];
        case 4:
            return handToValMap["four of a kind"];
        case 3:
            if (Object.values(cardCounts).includes(2)) {
                return handToValMap["full house"];
            }
            return handToValMap["three of a kind"];
        case 2:
            if (
                Object.values(cardCounts).filter((count) => count === 2)
                    .length === 2
            ) {
                return handToValMap["two pairs"];
            }
            return handToValMap["one pair"];
        default:
            return handToValMap["high card"];
    }
}

file = file.sort((a, b) => {
    const [cardsA] = a;
    const [cardsB] = b;

    const handAVal = detectPokerHand(cardsA);
    const handBVal = detectPokerHand(cardsB);

    if (handAVal === handBVal) {
        for (let i = 0; i < cardsA.length; i++) {
            const singleCardA = cardsA[i];
            const singleCardB = cardsB[i];

            if (singleCardA === singleCardB) continue;

            return singleCardA - singleCardB;
        }
    }

    return handAVal - handBVal;
});

let sumOfRatings = 0;

for (let i = 0; i < file.length; i++) {
    let [_, bid] = file[i];
    sumOfRatings += bid * (i + 1);
}

console.log(sumOfRatings);

const readFile = require("fs").readFileSync;

let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .filter((_) => _.trim());

const valueMap = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1,
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

    const uniqueCards = Object.keys(cardCounts).map(Number);
    const pairs = uniqueCards.filter((card) => cardCounts[card] === 2);

    let newJoker = 1;
    switch (uniqueCards.length) {
        case 5:
            newJoker = Math.max(...uniqueCards);
            break;
        case 4:
            newJoker = Math.max(...uniqueCards);
            break;
        case 3:
            if (pairs.length === 2) {
                newJoker = Math.max(...pairs);
            } else {
                const maxCount = Math.max(...Object.values(cardCounts));
                const keyWithThree = Object.keys(cardCounts).find(
                    (key) => cardCounts[key] === maxCount
                );
                newJoker = +keyWithThree;
            }
            break;

        case 2:
            newJoker = Math.max(...uniqueCards);
            break;
        default:
            newJoker = 1;
            break;
    }

    hand = hand.map((x) => (x === 1 ? newJoker : x));

    const newCardCounts = {};
    for (const card of hand) {
        newCardCounts[card] = (newCardCounts[card] || 0) + 1;
    }

    const maxCount = Math.max(...Object.values(newCardCounts));
    switch (maxCount) {
        case 5:
            return handToValMap["five of a kind"];
        case 4:
            return handToValMap["four of a kind"];
        case 3:
            if (Object.values(newCardCounts).includes(2)) {
                return handToValMap["full house"];
            }
            return handToValMap["three of a kind"];
        case 2:
            if (
                Object.values(newCardCounts).filter((count) => count === 2)
                    .length === 2
            ) {
                return handToValMap["two pairs"];
            }
            return handToValMap["one pair"];
        default:
            return handToValMap["high card"];
    }
}

console.log(detectPokerHand([10, 5, 5, 1, 5]));

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

const TYPES = [
    "string",
    "number",
    "array",
]

function getRandomNumber(length) {
    let results = "";
    for (let i = 0; i < length; i++) {
        results += Math.random() * 10;
    }
    return results;
}
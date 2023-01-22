const ALPH = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j" ,"k", "l", "m", "n", "o", "p", "q", "r", "s",
"t", "u", "v", "w", "w", "x", "y", "z" ];

export const getAlph = (index) => ALPH[index] == undefined ? ALPH[0] : ALPH[index];

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function getRandomWord(length, isUpperCase = false) {
    let result = "";

    if(isUpperCase) {
        result = getAlph(getRandomNumber(0, 27)).toUpperCase();
    }
    
    while (result.length < length) {
        result = result + getAlph(getRandomNumber(0, 27));
    }

    return result;
}

export function getRandomSentece(length, isUpperCase = false) {
    let sizes = [];
    let size = 0;

    const max = length / 4;
    const min = 1

    while ( size < (length * (3 / 4)) ) {
        let randomNumber = getRandomNumber(min, max);
        
        sizes.push(randomNumber);
        size += (randomNumber + 1); // + 1 for space
    }

    let results = "";
    sizes.forEach((sizeValue) => {
        results = results + getRandomWord(sizeValue) + " ";
    });

    return results + getRandomWord(length - size);
}
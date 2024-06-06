// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

function getStats(txt) {
    let nChars = getNumberOfChars(txt);
    let nWords = getNumberOfWords(txt);
    let nLines = getNumberOfLines(txt);
    let nNonEmptyLines = getNumberOfNonEmptyLines(txt);
    let maxLineLength = getMaxLineLength(txt);
    let aveWordLen = getAveWordLength(txt);
    let palindromes = getPalindromes(txt);
    let longestWords = getLongestWords(txt);
    let mostFrequentWords = getMostFrequentWords(txt);


function getNumberOfChars(txt) {
    return txt.length;
}

function getNumberOfWords(txt) {
    if (!txt){
        return 0;
    }

    let re = /([A-Z\d])+/ig;

    let arr = txt.match(re);
    return arr.length;
}

function getNumberOfLines(txt) {
    if (!txt){
        return 0;
    }

    let count = 0;
    let re = /([\n])/g;

    let arr = txt.match(re);
    if (arr) {
        count = arr.length;
    }

    let lastLine = getLastLine(txt);
    if (lastLine) {
        count++;
    }

    return count;
}

function getLastLine(txt) {
    if(txt.lastIndexOf("\n")>0) {
        return txt.substring(txt.lastIndexOf("\n"), txt.length + 1);
    } else {
        return txt;
    }
}

function getNumberOfNonEmptyLines(txt) {
    if (!txt){
        return 0;
    }

    let numLines = getNumberOfLines(txt);

    let re = /(^\s*$)/gm;
    let arr = txt.match(re);

    if (arr) {
        return numLines - arr.length;
    }

    return numLines;
}

function getAveWordLength(txt) {
    if (!txt){
        return 0;
    }

    let count = 0;
    let sum = 0;
    let arr;

    let re = /([A-Z\d])+/ig;

    while ((arr = re.exec(txt)) !== null) {
        sum+=arr[0].length;
        count++;
    }
    return sum/count;
}

function getMaxLineLength(txt) {
    if (!txt){
        return 0;
    }

    let max = 0;
    let line;
    let lines = txt.split("\n");

    for (line of lines) {
        let count = getNumberOfChars(line);
        if(count > max) {
            max = count;
        }
    }

    return max;
}

function getPalindromes(txt) {
    if (!txt){
        return [];
    }

    let palindromes = [];
    let word;
    let re = /([A-Z\d])+/ig;

    let arr = txt.match(re);
    for (word of arr) {
        if (word.length > 2) {
            let reverse = reverseString(word);
            if (reverse.toLowerCase() === word.toLowerCase()) {
                palindromes.push(word.toLowerCase());
            }
        }
    }

    return palindromes;
}

//https://medium.freecodecamp.com/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb#.nnzsan6oy
function reverseString(txt) {
    let splitString = txt.split("");
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join("");

    return joinArray;
}

function getLongestWords(txt) {
    if (!txt){
        return [];
    }

    let re = /([A-Z\d])+/ig;
    let arr = txt.match(re);
    let wordLengths = {};

    for (let i = 0; i < arr.length; i++) {
        let word = arr[i].toLowerCase();
        wordLengths[word] = word.length;
    }

    // http://stackoverflow.com/questions/6129952/javascript-sort-array-by-two-fields
    let largest = Object.keys(wordLengths).sort(function (a, b) {
        let aValue = wordLengths[a];
        let bValue = wordLengths[b];

        if(aValue == bValue)
        {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
        else
        {
            return (aValue > bValue) ? -1 : 1;
        }
    });

    let tenLongest = [];
    for (let i = 0; largest.length != 0 && i < 10; i++) {
        let word = largest.shift();
        tenLongest[i] = word;
    }

    return tenLongest;
}

function getMostFrequentWords(txt) {
    if (!txt){
        return [];
    }

    let re = /([A-Z\d])+/ig;

    let arr = txt.match(re);
    let wordCounts = {};

    // http://stackoverflow.com/questions/6565333/using-javascript-to-find-most-common-words-in-string
    for (let i = 0; i < arr.length; i++) {
        let word = arr[i].toLowerCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    // http://stackoverflow.com/questions/6129952/javascript-sort-array-by-two-fields
    let highestCounts = Object.keys(wordCounts).sort(function (a, b) {
        let aValue = wordCounts[a];
        let bValue = wordCounts[b];

        if(aValue == bValue)
        {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
        else
        {
            return (aValue > bValue) ? -1 : 1;
        }
    });

    let tenHighestCounts = [];
    for (let i = 0; highestCounts.length != 0 && i < 10; i++) {
        let word = highestCounts.shift();
        tenHighestCounts[i] = word + "(" + wordCounts[word] + ")";
    }

    return tenHighestCounts;
}



    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines,
        nonEmptyLines: nNonEmptyLines,
        maxLineLength: maxLineLength,
        averageWordLength: aveWordLen,
        palindromes: palindromes,
        longestWords: longestWords,
        mostFrequentWords: mostFrequentWords
    };
}

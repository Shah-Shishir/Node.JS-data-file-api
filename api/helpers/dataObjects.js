import fs from "fs";
import path from "path";

const __dirname = path.resolve();
export const filePath = __dirname + '/api/helpers/output.txt';

export const getFileSizeInKb = () => {
    const stats = fs.statSync(filePath);
    return stats["size"] / 1024.0;
}

const MAX_VALUE = 2147483647;
const MIN_VALUE = -2147483648;

const isDigit = character => character >= "0" && character <= "9";
const isAlpha = character => (character >= "A" && character <= "Z") || (character >= "a" && character <= "z");
const generateRandomSpaces = () => {
    const numberOfSpaces = Math.floor(Math.random() * 3 + 2);
    let spaces = "";
    for (let i=0; i<numberOfSpaces; i++) {
        spaces += " ";
    }
    return spaces;
}
const checkDataType = data => {
    if (data.includes(".")) {
        return "float";
    }

    let digitCount = 0;

    for (const character of data) {
        digitCount = isDigit(character) ? digitCount + 1 : digitCount;
    }

    return digitCount === data.length ? "numeric" : "alphanumeric";
}

export const getRandomIndex = max => Math.floor(Math.random() * max);
export const generateRandomInteger = () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
export const generateRandomFloat = () => Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE;
export const generateRandomString = () => {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    let digitFound = false;
    let alphaFound = false;
    for (let i = 0; i < 10; i++) {
        const character = characters[Math.round(Math.random() * (characters.length - 1))];
        if (isDigit(character)) {
            digitFound = true;
        }
        if (isAlpha(character)) {
            alphaFound = true;
        }
        result += character;
    };
    result = digitFound ? result : result + "1";
    result = alphaFound ? result : result + "a";
    result = generateRandomSpaces() + result + generateRandomSpaces();
    return result;
};

export const countDataTypes = fileData => {
    const dataArray = fileData.split(",");
    let numericCount = 0, alphanumericCount = 0, floatCount = 0;

    for (const data of dataArray) {
        const type = checkDataType(data);

        if (type === "float") {
            ++floatCount;
        } else if (type === "numeric") {
            ++numericCount;
        } else {
            ++alphanumericCount;
        }
    }

    return { 
        totalCount: dataArray.length, 
        numericCount, 
        alphanumericCount, 
        floatCount
    };
}

export const getResults = fileData => {
    let dataArray = fileData.split(",");
    let numericCount = 0, alphanumericCount = 0, floatCount = 0;

    dataArray = dataArray.slice(0, 20);

    const length = dataArray.length;

    for (let i=0; i<length; i++) {
        let type = checkDataType(dataArray[i]);

        if (type === "float") {
            ++floatCount;
        } else if (type === "numeric") {
            ++numericCount;
        } else {
            ++alphanumericCount;
            dataArray[i] = dataArray[i].trim();
        }

        dataArray[i] = `${dataArray[i]} - ${type}`;
    }

    const numericPercentage = ((numericCount/length) * 100).toFixed(2);
    const alphanumericPercentage = ((alphanumericCount/length) * 100).toFixed(2);
    const floatPercentage = ((floatCount/length) * 100).toFixed(2);

    return { 
        totalCount: length, 
        numericCount, 
        alphanumericCount, 
        floatCount,
        numericPercentage,
        alphanumericPercentage,
        floatPercentage,
        dataArray
    };
}
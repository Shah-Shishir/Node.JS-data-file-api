import fs from "fs";

import {  
    filePath, 
    getFileSizeInKb, 
    getRandomIndex, 
    generateRandomInteger, 
    generateRandomFloat, 
    generateRandomString,
    countDataTypes,
    getResults
} from '../helpers/dataObjects.js';

let GENRATE_DATA = true;

export const generateData = (req, res) => {
    fs.writeFileSync(filePath, '');

    const { size } = req.query;

    let fileSizeInKb;

    for (let i=0; ; i++) {
        const idx = getRandomIndex(3);
        let randomData;

        if (idx === 0) {
            randomData = generateRandomFloat();
        } else if (idx === 1) {
            randomData = generateRandomInteger();
        } else {
            randomData = generateRandomString();
        }

        fileSizeInKb = getFileSizeInKb();
        const dataSize = String(randomData).length + 1;
        const newFileSize = ((dataSize * 2) / 1024.0) + fileSizeInKb;

        if (newFileSize > size) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            const countData = countDataTypes(fileData);
            return res.status(200).json({size, newFileSize, fileSizeInKb, fileData, countData});
        } else {
            randomData = fileSizeInKb > 0 ? ("," + randomData) : randomData;
            fs.appendFileSync(filePath, randomData);
        }        
    }
}

export const stopData = () => {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const countData = countDataTypes(fileData);
    const fileSizeInKb = getFileSizeInKb();
    return res.status(200).json({fileSizeInKb, fileData, countData});
}

export const generateResults = (req, res) => {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const results = getResults(fileData);
    return res.status(200).json({
        message: "Results generated successfully!", 
        results
    });
} 
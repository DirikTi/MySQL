import { exit } from 'process';
import { isMainThread, parentPort, workerData } from 'worker_threads'
import { COLUMN_TYPES, getRandomNumber, getRandomSentece, getRandomWord } from './helper.js';
import { DATAS } from './run.js';

let myData = DATAS.filter((value) => (value.tableName == workerData.tableName))[0];

if (isMainThread) {
    console.log("Wrong Script\nRun 'node run.js [host] [database_name] [user] [password] [port]'");
} else {
    console.log("Creating TABLE '" + workerData.tableName + "' ...");    

    parentPort.once("close", (value) => {
        console.log("Create table '" + value + "'");
    });
    
    let query = "INSERT INTO " + workerData.tableName + "(";
    
    workerData.columns.forEach((columnValue, index) => {
        query = query.concat(columnValue.name + ",");
    });
    
    query = query.substring(0, query.length - 1).concat(") VALUES");

    for (let index = 0; index < workerData.rowCount; index++) {
        
    }

    parentPort.postMessage(query);

    exit(0);
}

function* getValues() {
    for (const column in workerData.columns) {
        if(column.type == COLUMN_TYPES.string) {
            yield [getStringType(column.name, column.length, column.unique, column.hasSpaceWord), column.name];
        } 
        else if (column.type == COLUMN_TYPES.number) {
            yield [getRandomNumber(column.options.min, column.options.max), column.name];
        } 
        else if (column.type == COLUMN_TYPES.email) {
            yield [getEmailType(column.name, column.length, column.unique), column.name];
        } 
        else if (column.type == COLUMN_TYPES.boolean) {
            yield [getRandomNumber(0, 100) < column.change, column.name];
        } 
        else if (typeof column.type === COLUMN_TYPES.enum) {
            yield [getEnumType(column.type, column.changes)]
        } 
        else if (column.type == COLUMN_TYPES.phone) {

        }
        else {
            exit(-1);
        }
    }
}

function getStringType(name, length, unique = false, hasSpaceWord = false) {
    let result = hasSpaceWord ? getRandomWord(length) : (function(){
        let _ = "";
        for (const [data, size] of getRandomSentece(length)) {
            _ = _.concat(data);
        }
        return _;
    }());

    if(unique) {
        for(let i = 0; i < myData.values.length; i++) {
            let _ = myData.values;
            if(_[name] == result) {
                getStringType(name, length, unique, hasSpaceWord);
            }
        }
    }
    return result;
}

/**
 * 
 * @param {String} name 
 * @param {Number} length 
 * @param {Boolean} unique 
 * @returns {String}
 */
function getEmailType(name, length, unique) {
    let result = getRandomWord(length) + "@" + getRandomWord(length) + ".com";

    if(unique) {
        for(let i = 0; i < myData.values.length; i++) {
            let _ = myData.values;
            if(_[name] == result) {
                getEmailType(name, length, unique);
            }
        }
    }

    return result;
}

/**
 * 
 * @param {String[]} enums 
 * @param {Number[]} changes 
 * @returns {String}
 */
function getEnumType(enums, changes) {
    let sum = 0;
    enums.forEach((value) => sum += value);

    let randNumber = getRandomNumber(0, sum);
    
    let valueChange = 0;
    for (let index = 0; index < changes.length; index++) {
        valueChange += changes[index];
        if (randNumber < valueChange) {
            return enums[index];
        }
    }
}
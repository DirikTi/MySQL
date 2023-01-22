import { exit } from 'process';
import { isMainThread, parentPort, workerData } from 'worker_threads'
import { COLUMN_TYPES } from './helper.js';

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
        query.concat(getValues());
    }

    parentPort.postMessage(query);

    exit(0);
}

function* getValues() {
    for (const column in workerData.columns) {
        if(column.type == COLUMN_TYPES.string) {
            
        } 
        else if (column.type == COLUMN_TYPES.number) {

        } 
        else if (column.type == COLUMN_TYPES.email) {

        } 
        else if (column.type == COLUMN_TYPES.boolean) {

        } 
        else if (typeof column.type === COLUMN_TYPES.enum) {
            
        } 
        else {
            exit(-1);
        }
    }
}
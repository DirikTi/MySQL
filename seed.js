import { isMainThread, parentPort, workerData,  } from 'worker_threads'

const TYPES = [
    "string",
    "number",
    "array",
]

if (isMainThread) {
    console.log("Wrong Script\nRun 'node run.js [host] [database_name] [user] [password] [port]'");
} else {
    parentPort.once("message", (value) => {
        console.log("Started create table '" + value + "'");
    });
    
    parentPort.once("close", (value) => {
        console.log("Started create table '" + value + "'");
    });
}




console.log();
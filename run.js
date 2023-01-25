import { Worker } from "worker_threads"
import mysql from 'mysql';
import { exit } from "process";
import fs from 'fs'

const argv = process.argv;
/*
if (argv[2] == undefined || argv[3] == undefined || argv[4] == undefined ) {
    console.log("ERROR: missing mysql info parameteres\nnode run.js [host] [database_name] [user] [password] [port=3306] ");
    exit(1);
}

const MySQLInfo = {
    host: argv[2],
    // database: argv[3],
    user: argv[4],
    password: argv[5] && argv[6] ? argv[5] : "",
    port: !argv[6] ? (!argv[5] ? 3306 : argv[5]) : argv[6]
}*/

const MySQLInfo = {
    host: "localhost",
    // database: argv[3],
    user: "root",
    password: "",
    port: 3306
}

console.log(MySQLInfo);

const TABLES = [
    { 
        tableName: "users", important: true, rowCount: 50, columns: [
            { name: "username", type: "string", length: 50, unique: true },
            { name: "email", type: "email", length: 127, unique: true },
            { name: "phone", type: "phone", length: 11, options: { min: 1, max: 9 }, unique: true },
            { name: "name", type: "string", length: 63 },
            { name: "avatar", type: "string", length: 127 },
            { name: "phoneToken", type: "string", length: 63 },
            { name: "isSpecialUser", type: "boolean", change: [20] },
        ]
    },
    { 
        tableName: "posts", important: true, rowCount: 50, columns: [
            { name: "typeId", type: "number", options: { min: 1, max: 50 } },
            { name: "userId", type: "number", options: { min: 1, max: 50 } },
            { name: "typeText", type: "string", length: 127 },
            { name: "postUrls", type: "string", length: 127 },
            { name: "type", type: [ "photo", "video", "mix", "text" ], change: [60, 30, 20, 50] },
        ]
    },
    { 
        tableName: "post_likes", rowCount: 300, columns: [
            { name: "postId", type: "number", options: { min: 1, max: 50 } },
            { name: "userId", type: "number", options: { min: 1, max: 50 } },
        ] 
    },
    { 
        tableName: "post_comments", rowCount: 100, sameData: true, columns: [
            { name: "postId", type: "number", options: { min: 1, max: 50 } },
            { name: "userId", type: "number", options: { min: 1, max: 50 } },
            { name: "comment", type: "string", length: 127, options: { hasSpaceWord: true } },
        ]
    },
    { 
        tableName: "releationships", rowCount: 100, columns: [
            { name: "userOneId", type: "number", options: { min: 1, max: 50 } },
            { name: "userTwoId", type: "number", options: { min: 1, max: 50 } },
            { name: "releation", type: ["friend", "not_friend", "block"], change: [60, 25, 15] },
        ], special: [ "userOneId", "userTwoId" ], notEqualEachOther: [ "userOneId", "userTwoId" ]
    },
    { 
        tableName: "notifications", rowCount: 50, sameData: true, columns: [
            { name: "userId", type: "number", options: { min: 1, max: 50 } },
            { name: "title", type: "string", options: { hasSpaceWord: true }, length: 50 },
            { name: "body", type: "string", length: 127 },
            { name: "isShowed", type: "boolean", change: [50] },
        ] 
    }
]

const CHILD_FILENAME = '/seed.js';
const PATH = process.cwd();
export const DATAS = (function(){
    let result = [];
    TABLES.forEach((value) => {
        let _ = { tableName: value.tableName, values: [] };
        result.push(_);
    })

    return result;
}());


const asikus_db = mysql.createConnection(MySQLInfo);
asikus_db.connect((err) => {
    if(err) {
        console.log(err);
        exit(-1);
    }

    main().then(()  => {
        exit(1);
    });
})

async function main() {
    let promiseArr = [];

    for (let index = 0; index < TABLES.length; index++) {
        const table = TABLES[index];
        if(table.important) {
            await focusTargetAsync(table);
        } else {
            promiseArr.push(focusTargetAsync(table))
            
        }
    }

    await Promise.all(promiseArr);
    
    exit(0);
}

async function focusTargetAsync(_table) {
    return new Promise((resolve, reject) => {
        console.log(_table);
        const worker = new Worker(PATH + CHILD_FILENAME, {
            workerData: {
                ..._table
            }
        });

        // PROMISE HELL TECHNIQUE
        worker.on("message", (__query) => {
            console.log(_table.tableName + " created datas\n");
            fs.writeFile("./INSERT_DATA/" + _table.tableName + ".sql", __query, { encoding: "utf-8" }, (err) => {
                if(err) console.log(_table.tableName + " " +err);
                
            });
        });

        worker.on("error", reject);
        
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error("WTF ERROR"));
                return -1
            }
            resolve();
        })
    });
}
import { Worker } from "worker_threads"
import mysql from 'mysql';
import { exit } from "process";

const argv = process.argv;

if (argv[2] == undefined || argv[2] == undefined || argv[2] == undefined || argv[2] == undefined ) {
    console.log("ERROR: missing mysql info parameteres\nnode run.js [host] [database_name] [user] [password] [port] ");
    exit(1);
}

const MySQLInfo = {
    host: process.argv[2],
    database: process.argv[3],
    user: process.argv[4],
    password: process.argv[5],
    port: !process.argv[6] ? 3306 : process.argv[6]
}

const TABLES = [
    { 
        tableName: "users", rowCount: 50, columns: [
            { name: "username", type: "string", length: 50, unique: true },
            { name: "email", type: "email", length: 127, unique: true },
            { name: "phone", type: "number", length: 11, options: { min: 1, max: 9 }, unique: true },
            { name: "name", type: "string", length: 63 },
            { name: "avatar", type: "string", length: 127 },
            { name: "phoneToken", type: "string", length: 63 },
            { name: "isSpecialUser", type: "boolean", change: [80] },
        ]
    },
    { 
        tableName: "posts", rowCount: 50, columns: [
            { name: "typeId", type: "number" },
            { name: "userId", type: "number" },
            { name: "typeText", type: "string" },
            { name: "postUrls", type: "string" },
            { name: "type", type: [ "photo", "video", "mix", "text" ] },
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
            { name: "comment", type: "string", options: { hasSpaceWord: true } },
        ]
    },
    { 
        tableName: "releationships", rowCount: 100, columns: [
            { name: "userOneId", type: "number", options: { min: 1, max: 50 } },
            { name: "userTwoId", type: "number", options: { min: 1, max: 50 } },
            { name: "releation", type: ["friend", "not_friend", "block"], change: [60, 25, 15], options: { min: 1, max: 50 } },
        ], special: [ "userOneId", "userTwoId" ] 
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

const asidb = mysql.createConnection(MySQLInfo);
asidb.connect((err) => {
    if(err) {
        console.log(err);
        exit(-1);
    }

    main();
})

function main() {

}
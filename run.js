import { Worker } from "worker_threads"
import mysql from 'mysql';
import { exit } from "process";

const MySQLInfo = {
    host: process.argv[2],
    database: process.argv[3],
    user: process.argv[4],
    password: process.argv[5],
    root: !process.argv[6] ? 3306 : process.argv[6]
}

const TABLES = [
    { 
        tableName: "users", columns: [
            { name: "username", type: "string", length: 50 },
            { name: "email", type: "email", length: 127 },
            { name: "phone", type: "phone" },
            { name: "name", type: "string", length: 63 },
            { name: "avatar", type: "string", length: 127 },
            { name: "phoneToken", type: "string", length: 63 },
            { name: "isSpecialUser", type: "boolean", change: [80] },
        ]
    },
    { 
        tableName: "posts", columns: [
            { name: "username", type: string },
            { name: "username", type: string },
            { name: "username", type: string },
            { name: "username", type: string }
        ] 
    },
    { 
        tableName: "users", columns: [
            { name: "username", type: string },
            { name: "username", type: string },
            { name: "username", type: string },
            { name: "username", type: string }
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
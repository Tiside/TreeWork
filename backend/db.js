import mysql from "mysql2"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "treework",
});

export default db;
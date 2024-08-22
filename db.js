require('dotenv').config();
const mysql = require('mysql2')
const env = process.env

const pool = mysql.createPool({
    host:env.DB_HOST,
    user:env.DB_USERNAME,
    password:env.DB_PASSWORD,
    database:env.DB_DATABASE,
    port:env.PORT
})

module.exports = pool.promise()
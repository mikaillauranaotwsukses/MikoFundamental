const {Pool} = require('pg');
const {cors} = require('cors')
require('dotenv').config();

const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

pool.connect((err) => {
    if(err){
        console.error("Terdapat kesalahan", err.stack);
    }else{
        console.log("Sukses Koneksi Database");
    }
})

module.exports = pool;
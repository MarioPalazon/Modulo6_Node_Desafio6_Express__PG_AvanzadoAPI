const {Pool}=require("pg");
require("dotenv/config")

const pool=new Pool({
    host: process.env.GHOST,
    user:process.env.GUSER,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    port:process.env.PGPORT,
    allowExitOnIdle:true
});

module.exports= pool;
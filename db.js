const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "qwert",
  host: "localhost",
  port: 5432,
  database: "blackticket",
});

module.exports = pool;

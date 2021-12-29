const mysql = require("mysql");

const db_config = {
  connectionLimit: 100,
  host: "res162.servconfig.com",
  user: "digitcash",
  database: "digitcash",
  password: "secure@Aminu21",
  multipleStatements: true,
};

const pool = mysql.createPool(db_config);

pool.getConnection((err, connection) => {
  return new Promise((resolve, reject) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        reject("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        reject("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        reject("Database connection was refused.");
      }
    }
    if (connection) connection.release();
    resolve();
    console.log("Database connected successfuly");
  });
});

module.exports = pool;

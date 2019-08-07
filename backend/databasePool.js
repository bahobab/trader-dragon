const { Pool } = require("pg");

const databaseConfiguration = require("./secrets/databaseConfiguration");

const pool = new Pool(databaseConfiguration);

module.exports = pool;

/*********** Test query *****************************/

// pool.query("SELECT * FROM generation", (error, response) => {
//   if (error) return console.log("Query Error:", error);

//   console.log("Query Response:", response.rows);
// });

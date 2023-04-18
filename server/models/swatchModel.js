const { Pool } = require("pg");

const PG_URI =
  "postgres://dbkjgttg:K1d8McZ0WTb1zP6iiNfGEBK6qD_T1PuE@mahmud.db.elephantsql.com/dbkjgttg";

// url - postgres://dbkjgttg:K1d8McZ0WTb1zP6iiNfGEBK6qD_T1PuE@mahmud.db.elephantsql.com/dbkjgttg
// password - K1d8McZ0WTb1zP6iiNfGEBK6qD_T1PuE

const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://excalidraw.com/#room=80755371d230c425e27c,69RJkvmmc_sIDCRm9GgHnA

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};

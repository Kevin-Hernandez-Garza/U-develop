// importing the mysql module
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mySQL username 
        user: 'root',
        //your mySQL password
        password: 'yourSQLpasswordHere',
        database: 'election'
    },
    console.log('Connected to the election database.')  
  );


// exporting 
module.exports = db;
// importing express
const express = require('express');
// importing the mysql module
const mysql = require('mysql2');
// port designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to the database
const db = mysql.createConnection(
  {
      host: 'localhost',
      //your mySQL username 
      user: 'root',
      //your mySQL password
      password: 'ch3Ls3a1sBLu3!',
      database: 'election'
  },
  console.log('Connected to the election database.')  
);


// returning all data from the candidates table 
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

//returning a single candidate using their primary key/id
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     } 
//     console.log(row);
// });

// delete candidate 
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// create candidate
// // sql command 
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
// VALUES (?,?,?,?)`;
// // sql parameters
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });


// Default response for any other request (Not Found) always make sure this is the last route
app.use((req,res) => {
    res.status(404).end(); 
});

// listening, starting the express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
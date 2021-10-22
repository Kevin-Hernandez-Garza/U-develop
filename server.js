// importing express
const express = require('express');
// importing inputCheck module 
const inputCheck = require('./utils/inputCheck');
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


// get all candidates wrapped in a express route
app.get('/api/candidates', (req,res) => {
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        // if there is an error then it will return a 500 error code, and exit the database call
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        // if no error then response is sent back using the following statement as a JSON object
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// getting a single candidate 
app.get('/api/candidate/:id', (req,res) => {
    const sql = `SELECT candidates.*, parties.name
                AS party_name 
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id
                WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//routes for parties table 
app.get('/api/parties', (req,res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, row) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// include id parameter for a single party
app.get('/api/party/:id', (req,res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message:'success',
            data: row
        });
    });
});

// delete party route
app.delete('/api/party/:id', (req,res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: res.message});
        } // checks if anything was deleted 
        else if (!result.affectedRows) {
            res.json({
                message: 'Party not found!'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// delete candidate
app.delete('/api/candidate/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({error: err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// create candidate
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO  candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data:body
        });
    });
});


// update a candidate's party
app.put('/api/candidate/:id', (req,res) => {
    const errors = inputCheck(req.body, 'party_id');

    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `UPDATE candidates SET party_id = ?
                WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message}); 
        } //check if a record was found
        else if(!result.affectedRows) {
            res.json({
                message: 'Candidate not found!'
            });
        } else {
            res.json({
                message: 'Success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


// Default response for any other request (Not Found) always make sure this is the last route
app.use((req,res) => {
    res.status(404).end(); 
});

// listening, starting the express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
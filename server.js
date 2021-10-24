// importing express
const express = require('express');
// importing db module
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
// importing inputCheck module 
const inputCheck = require('./utils/inputCheck');
// port designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found) always make sure this is the last route
app.use((req,res) => {
    res.status(404).end(); 
});

// start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
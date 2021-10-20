// importing express
const express = require('express');
// port designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());





// Default response for any other request (Not Found) always make sure this is the last route
app.use((req,res) => {
    res.status(404).end(); 
});

// listening, starting the express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express()

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api', require('./routes/auth'));
app.use('/api/performers', require('./routes/performer'));
app.use('/api/admin', require('./routes/admin'));

// REQUESTS
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:4000");
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../front-end/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

// DATABASE SETUP AND CONFIG
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URI = `mongodb+srv://admin:${DB_PASSWORD}@oca-pp.dvstq.mongodb.net/performer_db?retryWrites=true&w=majority&appName=oca-pp`; 

mongoose.connect(DB_URI, {
    tlsInsecure: true,
})
.then(() => console.log("MongoDB connection successful!"))
.catch(err => console.log("MongoDB connection error: ", err));
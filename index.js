const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// express init
const app = express();

// Cors Configuration
app.use(cors());

// DataBase
dbConnection();

// routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`servidor correindo por el puerto ${process.env.PORT}`);
});
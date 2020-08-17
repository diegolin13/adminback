const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// express init
const app = express();

// Cors Configuration
app.use(cors());

// COnfiguración y parseo del body
app.use(express.json());

// DataBase
dbConnection();

// routes
app.use('/api/users', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));

// Se levanta el servidor
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
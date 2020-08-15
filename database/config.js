const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to database')
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting with mongo, check logs');
    }

}

module.exports = {
    dbConnection
};
const mongoose = require('mongoose');

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect(process.env.mongo_url, connectionParams);
        console.log('Connected to DataBase');
    } catch (e) {
        console.log(`Could not connect to DB ` + e);
    }
}
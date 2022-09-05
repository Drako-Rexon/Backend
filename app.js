const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();
const port = process.env.PORT || 8900;

dotenv.config();

mongoose.connect(
    process.env.mongo_url,
    { useNewUrlParser: true },
    () => {
        console.log('Mongo has connected successfully');
    }
);

app.use(
    cors({
        origin: "*",
    })
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send("Hello there. This is social meadia api");
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {
    console.log(`The server has started at http://localhost:${port}`);
});
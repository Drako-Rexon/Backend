require("dotenv").config();
const express = require("express");
const connection = require('./db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 800;
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlists');

connection();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/song', songRoutes);
app.use('/api/playlist', playlistRoutes);

app.listen(port, () => {
    console.log(`The server has started http://localhost:` + port);
});

// npm install express dotenv
// npm install jsonwebtoken joi joi-password-complexity
// npm install bcrypt cors express-async-errors
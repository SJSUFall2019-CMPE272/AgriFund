const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const route = require('./routes/auth');
const postRoute = require('./routes/posts');
const issueRoute = require('./routes/issues');

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to the database!')
);

//middleware
app.use(express.json());

//route middleware
app.use('/', route);
app.use('/posts', postRoute);
app.use('/', issueRoute);

app.listen(3000, () => console.log('Server is up and running!'));
const express = require('express');
var app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import routes
const route = require('./routes/auth');
const postRoute = require('./routes/posts');
const issueRoute = require('./routes/issues');
const donorRoute = require('./routes/donors');

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to db!')
);

const donorRouter = express.Router();

//middleware
app.use(express.json());

//route middleware
app.use('/', route);
app.use('/posts', postRoute);
app.use('/', issueRoute);
app.use('/', donorRoute);
// app.use('/donors/:donorName', donorRoute);
//
// donorRouter.get('/', async (req, res) => {
//     try {
//         console.log(req.params.donorName);
//         const donors = await Donor.find({donorName: req.params.donorName});
//         await res.json(donors);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

app.listen(3000, () => console.log('Server is up and running!'));
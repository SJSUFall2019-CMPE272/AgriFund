const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT_DONOR,
    { useNewUrlParser: true },
    () => console.log('Connected to the database!')
);

const donorSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true
    },
    donorName: {
        type: String,
        required: true
    },
    donatedAmount: {
        type: String,
        required: true
    },
    donatedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Donor', donorSchema);
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    farmer_name: {
        type: String,
        required: true
    },
    issue_created_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    requested_amount: {
        type: String,
        required: true
    },
    raised_amount: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Issue', issueSchema);
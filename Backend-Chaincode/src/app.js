'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


app.get('/issues', (req, res) => {
    network.queryAllFarmerIssues()
        .then((response) => {
            let issuesRecord = JSON.parse(response);
            res.send(issuesRecord);
        });
});

app.get('/issues/:issue_id', (req, res) => {
    console.log(req.params.issue_id);
    network.querySingleFarmerIssue(req.params.issue_id)
        .then((response) => {
            let issuesRecord = JSON.parse(response);
            res.send(issuesRecord);
        });
});

app.post('/issues', (req, res) => {
    console.log(req.body);
    network.queryAllFarmerIssues()
        .then((response) => {
            console.log(response);
            let issuesRecord = JSON.parse(response);
            let numIssues = issuesRecord.length;
            let newKey = 'ISSUE' + numIssues;
            network.createFarmerIssue(newKey, req.body.farmer_name, req.body.issue, req.body.issue_created_date, req.body.description, req.body.requested_amount, req.body.raised_amount)
                .then((response) => {
                    res.send(response);
                });
        });
});

app.post('/donate', (req, res) => {
    network.addDonationToAnIssue(req.body.key, req.body.donator_name,req.body.donated_amount, req.body.donated_date )
        .then((response) => {
            res.send(response);
        });
});

app.listen(process.env.PORT || 8081);
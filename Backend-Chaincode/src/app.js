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


app.get('/api/issues', (req, res) => {
    network.queryAllFarmerIssues()
        .then((response) => {
            let issuesRecord = JSON.parse(response);
            res.send(issuesRecord);
        });
});

app.get('/api/issues/:issue_id', (req, res) => {
    console.log(req.params.issue_id);
    network.querySingleFarmerIssue(req.params.issue_id)
        .then((response) => {
            let issuesRecord = JSON.parse(response);
            res.send(issuesRecord);
        });
});

app.post('/api/issues', (req, res) => {
    console.log(req.body);
    network.queryAllFarmerIssues()
        .then((response) => {
            console.log(response);
            let issuesRecord = JSON.parse(response);
            let numIssues = issuesRecord.length;
            let newKey = 'ISSUE' + numIssues;
            network.createFarmerIssue(newKey, req.body.farmer_name, req.body.issue, req.body.issue_created_date,
                 req.body.description, req.body.requested_amount, req.body.raised_amount, req.body.problem_faced, req.body.solution_proposed)
                .then((response) => {
                    res.send(response);
                });
        });
});

app.post('/api/donate/:issue_id', (req, res) => {
    network.addDonationToAnIssue(req.params.issue_id, req.body.donator_name,req.body.donated_amount, req.body.donated_date )
        .then((response) => {
            res.send(response);
        });
});

app.put('/api/issues/:issue_id', (req, res) => {
    network.updateAnIssue(req.params.issue_id, req.body.description, req.body.requested_amount, req.body.problem_faced, req.body.solution_proposed )
        .then((response) => {
            res.send(response);
        });
});

app.post('/api/close/:issue_id', (req, res) => {
    console.log(req.params.issue_id);
    network.closeAnIssue(req.params.issue_id)
        .then((response) => {
            res.send(response);
        });
});

app.get('/api/farmers/:farmer_name', (req, res) => {
    console.log(req.params.farmer_name);
    network.queryAllFarmerIssues()
        .then((response) => {
            let farmersRecords =  JSON.parse(response);
            function getFarmerData(item, index){
                if(item.Record.farmer_name == req.params.farmer_name){
                    return item;
                }
            }
            const list =  farmersRecords.map(x => getFarmerData(x));
            res.send(list.filter(n => n));
            
        });
});

app.listen(process.env.PORT || 8081);
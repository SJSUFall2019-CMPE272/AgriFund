const issueRouter = require('express').Router();
const Issue = require('../model/Issue');

issueRouter.post('/issues', async (req,res) => {
    //check if issue already exists
    const issueExist = await Issue.findOne({issueName: req.body.issueName});
    if(issueExist) return res.status(400).send('Issue already exists!');

    //create a new issue
    const issue = new Issue({
        issueName: req.body.issueName,
        description: req.body.description,
        farmer_name: req.body.farmer_name,
        issue_created_date: req.body.issue_created_date,
        requested_amount: req.body.requested_amount,
        raised_amount: req.body.raised_amount
    });
    try{
        const savedIssue = await issue.save();
        res.send( savedIssue );
    }catch(err){
        res.send(400).send(err);
    }
});

issueRouter.get('/issues', async (req, res) => {
    try {
        const issues = await Issue.find();
        await res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

issueRouter.get('/{farmer_name}', async (req, res) => {
    try {
        const issues = await Issue.findOne();
        await res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = issueRouter;
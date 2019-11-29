const donorRouter = require('express').Router();
const Donor = require('../model/Donor');

donorRouter.post('/donors', async (req,res) => {
    //check if donor already exists
    //const donorExist = await Donor.findOne({donorName: req.body.donorName});
    //if(donorExist) return res.status(400).send('Donor already exists!');

    //create a new issue
    const donor = new Donor({
        issueId: req.body.issueId,
        donorName: req.body.donorName,
        donatedAmount: req.body.donatedAmount,
        donatedDate: req.body.donatedDate
    });
    try{
        const savedDonor = await donor.save();
        res.send( savedDonor );
    }catch(err){
        res.send(400).send(err);
    }
});

donorRouter.get('/donors', async (req, res) => {
    try {
        const donors = await Donor.find();
        await res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

donorRouter.get('/donors/:donorName', async (req, res) => {
    try {
        console.log(req.params.donorName);
        const donors = await Donor.find({donorName: req.params.donorName});
        await res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = donorRouter;
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req,res) => {
   //check if user already exists
   const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('Incorrect email!');
   //check password
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Invalid password!');

   //create and assign a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
   //res.send('Login succeeded!');
});

module.exports = router;
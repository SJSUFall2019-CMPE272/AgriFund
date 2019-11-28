const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req,res) => {
   //check if user already exists
   const emailExist = await User.findOne({email: req.body.email});
   if(emailExist) return res.status(400).send('User already exists!');

   //hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   //create a new user
   const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType
   });
   try{
      const savedUser = await user.save();
      res.send( savedUser );
   }catch(err){
      res.send(400).send(err);
   }
});

router.post('/login', async (req,res) => {
   //check if user already exists
   const user = await User.findOne({fullName: req.body.fullName});
   if(!user) return res.status(400).send('Incorrect username!');
   //check password
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Invalid password!');

   //create and assign a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   //res.header('auth-token', token).send(token);
   await res.json(user);
});

module.exports = router;
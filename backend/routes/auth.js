const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'sankalptrip@thi$'

//ROUTE 1 Create a User using: POST "/api/auth/createuser" No Login required
router.post("/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({min: 5,}),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with with email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "A User with this Email is already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass =await bcrypt.hash(req.body.password, salt);
      // Create a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data =  {
        user:{
          id:user. id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      // res.json(user);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  });

// ROUTE 2 Authenticate a User using: POST "/api/auth/login" No Login required
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],async (req, res) => {
         // If there are errors, return bad request and the error
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    
    const {email, password}= req.body;
    try {
       let user = await User.findOne({email});
       if(!user){
         return res.status(400).json({error: "Please try to Login with correct Credential"});
       }
       const passwordCompare =await bcrypt.compare(password, user.password);
       if(!passwordCompare){
        return res.status(400).json({error: "Please try to Login with correct Credential"});
      }
      const data =  {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  })


// ROUTE 3 Get loggedin user details: POST "/api/auth/getuser"  Login required
router.post("/getuser",fetchuser, async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  })
module.exports = router;

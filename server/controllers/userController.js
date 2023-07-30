const asyncHandler = require("express-async-handler") ;
const User = require("../models/userModel.js") ;
const generateToken = require("../utils/generateToken.js") ;

//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public
const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;


  // email validation - should be alphanumeric@alphanumeric.alpha
  console.log("This is the email:", email);
  const isValidEmail = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
  console.log("Tegex result: ", isValidEmail);
  if (isValidEmail === null) {
    console.log('Validemail false', isValidEmail)
    res.status(400).json({ message: "Invalid email!" });

  }


  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists!" });

  }

  
  

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("already exists?");
    res.status(400).json({ message: "Invalid user data!" });

  }
});

//ENDPOINT  POST api/users/login
//PURPOSE   Authenticate User and get token
//ACCESS    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password!" });

  }
});



module.exports = { registerUser, authUser };
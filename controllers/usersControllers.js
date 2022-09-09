const User = require("../models/user");

async function signup(req, res) {
  // get email and password from req.body
  const email = req.body.email;
  const password = req.body.password;
  // create a new user
  const user = await User.create({ email: email, password: password });
  // send response
  res.sendstatus(200);
}

// function login(req, res) {}

// function logout(req, res) {}

module.exports = {
  signup,

};

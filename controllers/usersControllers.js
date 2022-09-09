const User = require("../models/user");
async function signup(req, res) {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.json({ user });
  
}

    
// function login(req, res) {}

// function logout(req, res) {}

module.exports = {
  signup,

};

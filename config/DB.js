//LOAD ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGOURI, () => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDb;

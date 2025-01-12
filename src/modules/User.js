const mongoose = require("mongoose");

const schemas =new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const UserModule = mongoose.model("User", schemas);

module.exports = { UserModule };

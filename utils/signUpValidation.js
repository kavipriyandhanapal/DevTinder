const validator = require("validator");

const signUpValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First Name and Last Name is Requried");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Enter The Name Between 4 To 50 Characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter Valid Email Id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password ");
  }
  return true;
};

module.exports = { signUpValidation };

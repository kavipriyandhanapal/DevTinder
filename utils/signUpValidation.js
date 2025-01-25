const validator = require("validator");
const jwt = require("jsonwebtoken");
const { UserModule } = require("../src/modules/User");

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

const editReqValidation = (req) => {
  const editFields = ["firstName", "lastName", "age", "gender", "skills"];

  const isValid = Object.keys(req.body).every((fields) =>
    editFields.includes(fields)
  );

  return isValid;
};

const passwordValidation = async (req, res, next) => {
  const { newPassword, currentPassword } = req.body;
  console.log(req.cookies);

  const cookies = req.cookies;
  const token = cookies.token;

  try {
    console.log(token);

    const decodedToken = jwt.decode(token, "DEVTINDERKEY");
    console.log(decodedToken);
    const userId = decodedToken._id;

    const fetchedUser = await UserModule.findOne({ _id: userId });

    if (!fetchedUser) {
      throw new Error("User not found");
    }
    console.log(fetchedUser);

    const isCorrectPassword = await fetchedUser.comparePassword(
      currentPassword
    );
    console.log(isCorrectPassword);

    if (!isCorrectPassword) {
      throw new Error("Current Password Is Not Matching");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong");
    }

    req.user = fetchedUser;
    next();
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ error: error.message || "Failed To Update Password" });
  }
};

module.exports = { signUpValidation, editReqValidation, passwordValidation };

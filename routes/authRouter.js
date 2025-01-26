const express = require("express");
const authRouter = express.Router();
const { signUpValidation } = require("../utils/signUpValidation");
const { UserModule } = require("../src/modules/User");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  const { password, firstName, lastName, email, age, gender } = req.body;
  try {
    signUpValidation(req);

    const passwordval = await bcrypt.hash(password, 10);
    const userData = new UserModule({
      firstName,
      lastName,
      email,
      age,
      gender,
      password: passwordval,
    });
    await userData.save();
    res.send("User Saved Sucessfully");
  } catch (err) {
    res.status(400).send("Error" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Await the result of findOne
    const user = await UserModule.findOne({ email: email });
    const cookie = await user.getjwtToken();

    if (user) {
      // Correct order for bcrypt.compare
      const isUser = await user.comparePassword(password);

      if (isUser) {
        res.cookie("token", cookie, {
          expires: new Date(Date.now() + 50000000),
        });
        res.send("Login Successfully");
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User Logout Sucessfully");
});

module.exports = authRouter;

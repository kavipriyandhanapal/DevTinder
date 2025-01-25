const express = require("express");
const { AuthMiddleWare } = require("../src/middlewares/AuthMiddleWare");
const {
  editReqValidation,
  passwordValidation,
} = require("../utils/signUpValidation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", AuthMiddleWare, async (req, res) => {
  try {
    console.log("hi");

    const user = req.user;

    if (user) {
      res.send(user);
    } else {
      new Error("USER PROFILE IS NOT FOUND");
    }
  } catch (error) {
    res.send("ERROR PROFILE NOT FOUND");
  }
});

profileRouter.patch(
  "/profile/edit",
  AuthMiddleWare,
  async (req, res) => {
    const ReqValidation = editReqValidation(req);

    try {
      if (!ReqValidation) {
        res.status(403).send("Entered Fields Are Not Allowed To Edit ");
      }
      const userToUpdate = req.user;

      Object.keys(req.body).forEach(
        (key) => (userToUpdate[key] = req.body[key])
      );

      console.log(userToUpdate);

      res.json({ message: "User Was sucessfully Updated", data: userToUpdate });

      await userToUpdate.save();
    } catch (error) {
      res.send(error + "Entered Fields Are Not Allowed To Edit  ");
    }
  },

  profileRouter.patch(
    "/profile/password",
    passwordValidation,
    async (req, res) => {
      const { newPassword } = req.body;

      try {
        const user = req.user;

        const bcryptPassword = await bcrypt.hash(password, 10);

        user.password = bcryptPassword;

        await user.save();
        res.send("Password Reset Sucessfully");
      } catch (error) {
        req.status(400).send("Failed To update Password ");
      }
    }
  )
);

module.exports = profileRouter;

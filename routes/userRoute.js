const express = require("express");
const { AuthMiddleWare } = require("../src/middlewares/AuthMiddleWare");
const connectionModule = require("../src/modules/connectionRequest");
const { UserModule } = require("../src/modules/User");
const userRouter = express.Router();

const USER_DETILS = "firstName lastName age gender";

userRouter.get("/user/request/received", AuthMiddleWare, async (req, res) => {
  try {
    loggesdInUser = req.user;

    const requests = await connectionModule
      .find({ toObjectId: loggesdInUser._id, status: "interested" })
      .populate("fromObjectId", "firstName lastName");

    if (!requests) {
      return res.status(400).send("NO REQUEST FOUND");
    }

    res.json({ message: "Requested Peopels", data: requests });
  } catch (error) {
    res.status(400).send("ERROR " + error);
  }
});

userRouter.get("/user/connections", AuthMiddleWare, async (req, res) => {
  const loggedInUser = req.user;

  try {
    const connections = await connectionModule
      .find({
        $or: [
          { fromObjectId: loggedInUser._id, status: "accepted" },
          { toObjectId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromObjectId", USER_DETILS)
      .populate("toObjectId", USER_DETILS);

    if (!connections) {
      return res.send("YOU HAVE NO CONNNECTIONS TILL NOW");
    }

    const filteredUser = connections.map((row) => {
      console.log(row.fromObjectId._id);

      if (row.fromObjectId._id.equals(loggedInUser._id)) {
        return row.toObjectId;
      }
      return row.fromObjectId;
    });

    res.json({
      meassage: loggedInUser.firstName + "Connection Are ",
      data: filteredUser,
    });
  } catch (error) {
    res.status(400).send("ERROR " + error);
  }
});

userRouter.get("/feed/:page/:limit", AuthMiddleWare, async (req, res) => {
  //  User should not get his own profile
  //  Requested and Reviwed Profiles should not be shown

  const page = req.params.page || 0;
  const limit = req.params.limit || 10;
  const currentRage = (page - 1) * limit;

  try {
    const loggedInUser = req.user;

    const connectionReq = await connectionModule
      .find({
        $or: [
          { fromObjectId: loggedInUser._id },
          { toObjectId: loggedInUser._id },
        ],
      })
      .select("fromObjectId toObjectId");

    const hideUsersFromFeed = new Set();

    connectionReq.forEach((req) => {
      hideUsersFromFeed.add(req.fromObjectId.toString()),
        hideUsersFromFeed.add(req.toObjectId.toString());
    });

    const feedUsers = await UserModule.find({
      $or: [{ _id: { $nin: Array.from(hideUsersFromFeed) } }],
    })
      .select(USER_DETILS)
      .skip(currentRage)
      .limit(limit);

    res.json({ message: "Feed Users Are   ", data: feedUsers });
  } catch (error) {
    res.status(400).send("ERROR   " + error);
  }
});

module.exports = userRouter;

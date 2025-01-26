const express = require("express");
const { AuthMiddleWare } = require("../src/middlewares/AuthMiddleWare");
const connectionModule = require("../src/modules/connectionRequest");
const { UserModule } = require("../src/modules/User");

const connectionRouter = express();

connectionRouter.post(
  "/request/send/:status/:userId",
  AuthMiddleWare,
  async (req, res) => {
    const fromObjectId = req.user._id;
    const toObjectId = req.params.userId; // Correct parameter usage
    const status = req.params.status;

    try {
      // Validate status
      const statusTypes = ["interested", "ignored"];
      if (!statusTypes.includes(status)) {
        return res.status(400).send("Request status is not valid");
      }

      // Check if the target user exists
      const isUserFound = await UserModule.findOne({ _id: toObjectId });
      if (!isUserFound) {
        return res.status(404).json({
          message: "User not found in the database",
          data: toId,
        });
      }

      // Check if a connection request already exists
      const isExistingReq = await connectionModule.findOne({
        $or: [
          { fromObjectId, toObjectId },
          { fromObjectId: toObjectId, toObjectId: fromObjectId },
        ],
      });

      if (isExistingReq) {
        return res.status(400).json({
          message:
            "Cannot make multiple requests to the same user, or the user has already made a connection request",
        });
      }

      // Create a new connection request
      const connectionRequest = new connectionModule({
        fromObjectId: fromObjectId,
        toObjectId: toObjectId,
        status,
      });

      await connectionRequest.save();

      res.json({
        message:
          req.user.firstName +
          "   Successfully sent a connection request to" +
          isUserFound.firstName,
        data: connectionRequest,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to send the connection request",
        error: error.message,
      });
    }
  }
);

connectionRouter.post(
  "/request/review/:status/:reqId",
  AuthMiddleWare,
  async (req, res) => {
    // reqId should Be valid
    // Req Object ToObjId should be Current user
    // status should be accept or reject
    // Req Object Status Should Be (Intrested) only

    try {
      const { status, reqId } = req.params;

      const validStatus = ["accepted", "rejected"];

      const isValidStatus = validStatus.includes(status);

      if (!isValidStatus) {
        return res.status(401).send("Invalid Status Type");
      }

      const reqObj = await connectionModule.findOne({
        _id: reqId,
        toObjectId: req.user._id,
        status: "interested",
      });

      if (!reqObj) {
        return res.status(401).send("Req Is not Present in the DB");
      }

      reqObj.status = status;

      const data = await reqObj.save();

      res
        .status(200)
        .json({ message: "Req Status Was Updated SucessFully", data: data });
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = connectionRouter;

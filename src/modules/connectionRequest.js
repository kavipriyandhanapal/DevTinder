const mongoose = require("mongoose");

const connectionRequsetSchema = new mongoose.Schema(
  {
    fromObjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    toObjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not correct type",
      },
    },
  },
  { timestamps: true }
);

connectionRequsetSchema.pre("save", function (next) {
  const user = this;

  if (user.fromObjectId.equals(user.toObjectId)) {
    throw new this.errors("You Cant Make A Request To Yourself");
  }
  next();
});

connectionRequsetSchema.index({ fromObjectId: 1, toObjectId: 1 });

const connectionModule = mongoose.model(
  "connectionreq",
  connectionRequsetSchema
);

module.exports = connectionModule;

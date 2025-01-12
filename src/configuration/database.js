const mongoose = require("mongoose");

const ConnectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://kavipriyan:nPvv1IZlgGxNsSxt@kavipriyan.u7umr.mongodb.net/DevTinder"
  );
};
module.exports= {ConnectDb}


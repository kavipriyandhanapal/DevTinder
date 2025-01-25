const jwt = require("jsonwebtoken");
const { UserModule } = require("../modules/User");

const AuthMiddleWare = async (req, res, next) => {
  const cookies = req.cookies
  const token = cookies.token

  try {
    const decode = jwt.decode(token, "DEVTINDERKEY");

    

    const user = await UserModule.findOne({ _id: decode._id });

    
    if (!user) {
      throw new Error("User Not Found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
      throw new Error("User Not Found");
  }
};


module.exports={AuthMiddleWare}

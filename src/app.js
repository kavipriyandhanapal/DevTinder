const express = require("express");
const { AdminMiddleWare, UserMiddleWare } = require("./middlewares/admin");
const { ConnectDb } = require("./configuration/database");
const { UserModule } = require("./modules/User");
const { signUpValidation } = require("../utils/signUpValidation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { AuthMiddleWare } = require("./middlewares/AuthMiddleWare");

const app = express();

// app.get("/test", (req, res) => {
//   console.log(req.query);
//   res.send("Testing specific test method api");
// });

// app.get("/test/add", (req, res) => {
//   console.log(req.query);
//   console.log(
//     "Testing get method but along with 2 routing ..now the req will not handle by the above req handler method because the req should have the 2 routing params"
//   );
//   res.send("testing with 2 routing param argument");
// });

// app.post("/tes?t", (req, res) => {
//   res.send("tesing post method ");
// });

// app.delete("/test", (req, res) => {
//   res.send("testing delete along with regex");
// });

// app.use("/test/:userid", (req, res) => {
//   console.log(req.params);
//   res.send("Now We Are Running By Using Path Req ");
// });

// app.use("/kavi", (req, res) => {
//   res.send("kavi is great");
// });

// app.use("/", (req, res) => {
//   res.send("Welcome To Node Js ");
// });

app.use("/admin", AdminMiddleWare);

// app.use("/", (error, res, req) => {
//   try {
//     throw new error("Sever down");
//   } catch (err) {
//     res.send("internal error dont worry");
//   }
// });

app.post("/admin/add", (req, res) => {
  res.send("Admin added data Sucessfully");
});

app.delete("/admin/delete", (req, res) => {
  res.send("Admin deleted Data Sucessfully");
});

app.use("/user", UserMiddleWare, (req, res) => {
  res.send("user authorized sucessfully ");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(501).send("dont worry its an internal Server error");
  }
});

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
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

app.get("/profile", AuthMiddleWare, async (req, res) => {
  try {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);

    // Await the result of findOne
    const user = await UserModule.findOne({ email: email });
    const { _id } = user._id;
    const cookie = await jwt.sign({ _id }, "DEVTINDERKEY@",{expiresIn:'7d'});

    if (user) {
      // Correct order for bcrypt.compare
      const isUser = await bcrypt.compare(password, user.password);

      if (isUser) {
        res.cookie("token", cookie,{expires:new Date(Date.now() + 500000)});
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

app.get("/feed", async (req, res) => {
  try {
    const userDatas = await UserModule.find({});
    if (userDatas) {
      res.send(userDatas);
    } else {
      res.send("No User Found");
    }
  } catch (err) {
    res.status(400).send("Cant Fetch Feeds");
  }
});

app.get("/userbyid", async (req, res) => {
  const userId = req.body;
  console.log(userId);
  try {
    const userdata = await UserModule.findById(userId.id);
    if (userdata) {
      res.send(userdata);
    } else {
      res.send("No User Found");
    }
  } catch (err) {
    res.status(400).send("Cant fetch User By The Id");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.id;
  try {
    await UserModule.findByIdAndDelete(userId);
    res.send("user", userId, "deleted sucessfully");
  } catch (error) {
    res.status(400).send("User", userId, "deleted failed");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const body = req.body;
  const userId = req.params.userId;
  try {
    const UPDATE_FEILDS = ["firstName", "lastName", "skills", "gender", "age"];
    const isValidUpdateFields = Object.keys(body).every((key) =>
      UPDATE_FEILDS.includes(key)
    );
    if (!isValidUpdateFields) {
      throw Error("The Enter Fields Are Not Allowed To Update");
    }
    const doc = await UserModule.findByIdAndUpdate(userId, body, {
      returnDocument: "before",
    });
    res.send(doc);
  } catch (error) {
    res.status(400).send("Failed To Update The Document" + error);
  }
});

ConnectDb()
  .then(() => {
    app.listen(7777);
    console.log("SucessFully Connected To The Db");
  })
  .catch((error) => console.log(error, "Connection To the Db Failed"));

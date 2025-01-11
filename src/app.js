const express = require("express");
const { AdminMiddleWare, UserMiddleWare } = require("./middlewares/admin");

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

app.use("/",(error,res,req)=>{
  try{
  throw new error('Sever down')
  }
  catch(err){
    res.send('internal error dont worry')
  }
})

app.post("/admin/add", (req, res) => {
  res.send("Admin added data Sucessfully");
});

app.delete("/admin/delete", (req, res) => {
  res.send("Admin deleted Data Sucessfully");
});

app.use("/user",UserMiddleWare,(req,res)=>{
  res.send("user authorized sucessfully ")
});

app.use('/',(err,req,res,next)=>{
  if(err){
   res.status(501).send('dont worry its an internal Server error')
  }
})

app.listen(7777);

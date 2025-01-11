const AdminMiddleWare = (req, res, next) => {
  const token = "kavi";

  if (token === "kavi") {
    next();
  } else {
    res.status(401).send("Unauthorized User");
  }
};

const UserMiddleWare = (req, res, next) => {
  const token = "justin";
  if (token === "justin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { AdminMiddleWare, UserMiddleWare };

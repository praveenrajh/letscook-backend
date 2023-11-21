const express = require("express");
const { AuthenticateUser } = require("../controllers/login");
var router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = await req.body;
  var loginCredentials = await AuthenticateUser(email, password);
  console.log(loginCredentials);
  if (loginCredentials === "Invalid User name or Password") {
    res.status(200).send("Invalid User name or Password");
  } else if (loginCredentials === "Server Busy") {
    res.status(200).send("Server Busy");
  } else {
  }
});

module.exports = router;

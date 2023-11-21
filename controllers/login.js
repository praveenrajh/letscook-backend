const User = require("../models/User");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

async function CheckUser(email) {
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return true;
    }
    return false;
  } catch (e) {
    return "Server Busy";
  }
}

async function AuthenticateUser(email, password) {
  try {
    const userCheck = await User.findOne({ email: email });
    console.log(userCheck);
    const validPassword = bcrypt.compare(password, userCheck.password);
    console.log(validPassword);
    if (validPassword) {
      const token = jwt.sign({ email }, process.env.LOGIN_SECRET_TOKEN);
      const response = {
        id: userCheck._id,
        name: userCheck.name,
        email: userCheck.email,
        token: token,
        status: true,
      };
      await User.findOneAndUpdate(
        { email: userCheck.email },
        { $set: { token: token } },
        { new: true }
      );
      return response;
    }
    return "Invalid User name or Password";
  } catch (e) {
    console.log(e);
    return "Server Busy";
  }
}

module.exports = { CheckUser, AuthenticateUser };

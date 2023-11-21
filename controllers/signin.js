const User = require("../models/User");
const { sendMail } = require("./SendMail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyUser = require("../models/verifyUser");
dotenv.config();

async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const newUser = new verifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });

    const activationLink = `http://localhost:4000/signin/${token}`; // Yet to be added
    const content = `<h4> hi,there </h4>
                     <h5> Welcome to the app</h5>
                     <p> Thank you for signing up. Click on below link to activate</p>
                     <a href="${activationLink}">Click Here</a>
                     <p>Regards</p>
                     <p>Team</p>`;
    console.log(newUser);
    await newUser.save();
    sendMail(email, "VerifyUser", content);
  } catch (error) {
    console.log(error);
  }
}

function generateToken(email) {
  const token = jwt.sign(email, process.env.SIGNUP_SECRET_TOKEN);
  return token;
}

async function InsertSignUpUser(token) {
  try {
    const userVerify = await verifyUser.findOne({ token: token });
    if (userVerify) {
      const newUser = new User({
        name: userVerify.name,
        email: userVerify.email,
        password: userVerify.password,
        forgetPassword: {},
      });
      await newUser.save();
      await userVerify.deleteOne({ token: token });
      const content = `<h4> Registration Successful </h4>
                       <h5> Welcome to the app</h5>
                       <p>yor are successfully registered</p>
                       <p>Regards</p>
                       <p>Team</p>`;
      sendMail(newUser.email, "Registration Successful", content);
      return `<h4> hi,there </h4>
              <h5> Welcome to the app</h5>
              <p>yor are successfully registered</p>
              <p>Regards</p>
              <p>Team</p>`;
    }
    return `<h4>Registration failed</h4>
            <p>Link expired........</p>
            <p>yor are successfully registered</p>
            <p>Regards</p>
            <p>Team</p>`;
  } catch (error) {
    console.log(error);
    return `<html>
            <body>
            <h4>Registration failed</h4>
                 <p>Unexpected error happened........</p>
                 <p>Regards</p>
                 <p>Team</p>
            </body>
            </html>`;
  }
}

module.exports = { InsertVerifyUser, InsertSignUpUser };

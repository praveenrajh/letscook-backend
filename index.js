const express = require("express");
const connectDb = require("./db");
const cors = require("cors");
var signinRouter = require("./routes/signin");
var loginRouter = require("./routes/login");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({ orgin: "*" }));
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/signin", signinRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});

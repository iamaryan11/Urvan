const express = require("express");
const app = express();
const cors = require("cors");
const main = require("./config/db");
const authRouter = require("./routes/userAuth");
const redisClient = require("./config/redis");
const { allPlantsroute } = require("./routes/plantRoutes");
const cartRouter = require("./routes/cartRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adminRight = require("./routes/adminRight");
const aiRouter = require("./routes/chatAiRoute");
dotenv.config();

app.use(
  cors({
    origin: "https://urvan-frontend.onrender.com/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/allPlants", allPlantsroute);
app.use("/user", authRouter);
app.use("/usercart", cartRouter);
app.use("/Ai", aiRouter);

app.use("/adminrightss", adminRight);

const InitializeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log(`both database connected succefully`);
    app.listen(process.env.BE_PORT, () => {
      console.log(`server listening at port: ${process.env.BE_PORT}`);
    });
  } catch (err) {
    console.log(`Error occured while connecting to the database ` + err);
  }
};
InitializeConnection();

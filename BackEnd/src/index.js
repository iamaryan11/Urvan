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


const allowedOrigins = [
  'https://urvan-frontend.onrender.com', // Your old frontend URL
  'https://urvan-final-frontend.onrender.com' // Your new frontend URL
];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is in our allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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

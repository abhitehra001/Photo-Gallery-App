const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { authenticate } = require("./authentication/Auth");
const userRouter = require("./routes/User");
const photoRouter = require("./routes/Photo");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Mongo DB Atlas");
}).catch((err) => {
    console.log("Error in Connecting to Mongo DB Atlas");
})

app.use(cookieParser());
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.REACT_URL,
    allowedHeaders: "*"
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 60*60*1000,
        secure: true,
        sameSite: "none"
    }
}))

app.get("/", (req, res)=> {
    res.status(200).json({
        msg: "Welcome to the Backend of Photo Gallery App"
    })
})

app.use("/users", userRouter);
app.use("/photos", authenticate, photoRouter);

app.listen(8000, () => {
    console.log("Server started at Port 8000");
})
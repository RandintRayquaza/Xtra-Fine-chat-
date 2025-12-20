import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRout from './routes/userRouts.js'

dotenv.config({});  

const PORT = process.env.PORT || 5000;
const app = express();

//routes

app.use("api/v1/users", userRoute);




app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

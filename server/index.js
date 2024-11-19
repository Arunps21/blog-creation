const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
const port = process.env.PORT
const mongoose = require("mongoose");
const main = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Server connected to MongoDB"))
    .catch((err) => console.log("Error in connecting MongoDB", err));
};
main();
const blogRouter = require("./routes/blogRouter")
const userRouter = require("./routes/userRouter")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"))
app.use("/blogRouter",blogRouter)
app.use("/userRouter",userRouter)

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});


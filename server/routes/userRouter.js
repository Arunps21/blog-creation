const express = require("express")
const userRouter = express.Router()
const upload = require("../multer/userMulter")
const {userReg, userLogin} = require("../control/userControl")

userRouter.route("/userReg").post(upload.single("image"),userReg)
userRouter.route("/userLogin").post(userLogin)

module.exports = userRouter
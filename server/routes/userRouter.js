const express = require("express")
const userRouter = express.Router()
const upload = require("../multer/userMulter")
const {userReg, userLogin, viewUser} = require("../control/userControl")

userRouter.route("/userReg").post(upload.single("image"),userReg)
userRouter.route("/userLogin").post(userLogin)
userRouter.route("/viewUSer").get(viewUser)

module.exports = userRouter
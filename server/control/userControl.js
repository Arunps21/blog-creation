const userModel = require("../model/userModel");
const upload = require("../multer/userMulter");
const bcrypt = require("bcrypt");
let salt = 10;

const userReg = async (req, res) => {
  try {
    const { fullname, image, email, password } = req.body;
    const result = await userModel.find({ email: email });
    if (result.length > 0) {
      res.status(200).json({ status: 200, msg: "Email already exists" });
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        userModel.create({
          fullname,
          image: req.file.filename,
          email,
          password: hash,
        });
      });
      res.status(201).json({ status: 201, msg: "User Registered" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, msg: "Failed to add user" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.find({ email: email });
  let password_db;
  if (user.length > 0) {
    password_db = user[0].password;
    const result = await bcrypt.compare(password, password_db);
    if (result) {
      res
        .status(201)
        .json({ status: 201, msg: "Login Success", userId: user[0]._id });
    } else {
      res.status(200).json({ status: 200, msg: "Incorrect password" });
    }
  } else {
    res
      .status(200)
      .json({ status: 200, msg: "You doesn't have any account, pls SignUp" });
  }
};

const viewUser = async (req, res) => {
  try {
    const view = await userModel.find();

    if (view.length > 0) {
      const updatedView = view.map((user) => ({
        ...user.toObject(),
        image: user.image ? `/uploads/${user.image}` : null,
      }));
      res.status(201).json(updatedView);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { userReg, userLogin, viewUser };

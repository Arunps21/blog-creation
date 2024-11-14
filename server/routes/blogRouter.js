const express = require("express")
const blogRouter = express.Router()

const {addBlog, viewBlog, deleteBlog} = require("../control/blogControl")

blogRouter.route("/addBlog").post(addBlog)
blogRouter.route("/viewBlog").get(viewBlog)
blogRouter.route("/deleteBlog/:id").delete(deleteBlog)

module.exports = blogRouter
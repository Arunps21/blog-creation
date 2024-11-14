const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String}
},{timestamps:true})

const blogModel = mongoose.model("blog_tbl",blogSchema)

module.exports = blogModel
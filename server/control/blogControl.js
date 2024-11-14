const blogModel = require("../model/blogModel");

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlog = await blogModel.create({
      title,
      description,
    });
    console.log(req.body);
    res
      .status(201)
      .json({ status: 201, msg: "Blog added succesfully", blog: newBlog });
  } catch (err) {
    console.log("Error:", err);
    res
      .status(500)
      .json({ error: "Failed to add todo", details: error.message });
  }
};

const viewBlog = async (req, res) => {
  try {
    const blog = await blogModel.find();
    blog.length > 0 ? res.json(blog) : res.json([]);
  } catch (err) {
    console.log("Error getting blog", err);
  }
};

const deleteBlog=async(req,res)=>{
    try{
        const {id} = req.params
        if(id){
        await blogModel.deleteOne({_id:id})
        res.status(200).json({status:200,msg:"Blog deleted succesfully"})
        }
        else{
            res.status(400).json({status:400,msg:"Error in Deleting"})
        }
    }
    catch(err){
        console.log("Error deleting blog",err)
    }
}

module.exports = { addBlog, viewBlog, deleteBlog };

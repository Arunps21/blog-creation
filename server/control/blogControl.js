const blogModel = require("../model/blogModel");

const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userid } = req.headers; 

    console.log("Received Headers:", req.headers);

    if (!userid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newBlog = await blogModel.create({
      userId:userid,
      title,
      description,
    });
    
    console.log(req.body);
    res.status(201).json({ status: 201, msg: "Blog added successfully", blog: newBlog });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Failed to add blog", details: err.message });
  }
};

const viewBlog = async (req, res) => {
  try {
    const blog = await blogModel.find();
    if (blog.length > 0) {
      res.json(blog);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.log("Error getting blog", err);
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedBlog = await blogModel.deleteOne({ _id: id });
      if (deletedBlog.deletedCount === 0) {
        return res.status(404).json({ status: 404, msg: "Blog not found" });
      }
      res.status(200).json({ status: 200, msg: "Blog deleted successfully" });
    } else {
      res.status(400).json({ status: 400, msg: "Blog ID is required" });
    }
  } catch (err) {
    console.log("Error deleting blog", err);
    res.status(500).json({ error: "Failed to delete blog", details: err.message });
  }
};

module.exports = { addBlog, viewBlog, deleteBlog };

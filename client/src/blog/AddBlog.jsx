import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";

function AddBlog() {
  const [blog, setBlog] = useState({ title: "", description: "" });
  const userId = localStorage.getItem("userId");

  const blogFun = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:9000/blogRouter/addBlog",
        blog,
        { headers: { userId: userId } }
      );
      console.log(data);
      if (data.status === 201) {
        setBlog({ title: "", description: "" });
        alert(data.msg);
      } else {
        alert("Error adding blog");
      }
    } catch (err) {
      console.log("In Error:", err);
    }
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "50%", margin: "2rem auto" }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handlePost}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Add New Blog
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={blog.title}
                onChange={blogFun}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={blog.description}
                onChange={blogFun}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" type="submit">
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddBlog;

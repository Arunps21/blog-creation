import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

export default function UserHome() {
  const [view, setView] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  // Fetch blogs
  const viewBlog = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/blogRouter/viewBlog"
      );
      setView(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  // Fetch user details
  const viewUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/userRouter/viewUser"
      );
      setUser(data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // Delete blog
  const deleteFun = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:9000/blogRouter/deleteBlog/${id}`
      );
      if (data.status === 200) {
        alert(data.msg);
        viewBlog();
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await viewBlog();
      await viewUser();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Container sx={{ padding: 4 }}>
        <Typography variant="h5" align="center">
          Loading data, please wait...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.length > 0 ? user[0].fullname : "User not found"}
      </Typography>
      {user.length > 0 && (
        <img
          src={user[0].image || "/default-image.png"}
          alt="User"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "16px",
          }}
        />
      )}

      <Grid container spacing={3} sx={{ padding: 2 }}>
        {view
          .filter((blog) => blog.userId === userId)
          .map((list) => (
            <Grid item xs={12} sm={6} md={3} key={list._id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardHeader title={list.title} />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {list.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteFun(list._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

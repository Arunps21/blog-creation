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
  const userId = localStorage.getItem("userId");

  const viewBlog = async () => {
    const { data } = await axios.get(
      "http://localhost:9000/blogRouter/viewBlog"
    );
    setView(data);
  };

  const deleteFun = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:9000/blogRouter/deleteBlog/${id}`
    );
    if (data.status === 200) {
      alert(data.msg);
      viewBlog();
    } else {
      alert(data.msg);
    }
  };

  useEffect(() => {
    viewBlog();
  }, []);

  console.log("Logged-in user ID:", userId);

  return (
    <Container sx={{ padding: 4 }}>
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {view
          .filter((blog) => blog.userId === userId) 
          .map((list) => (
            <Grid item xs={12} sm={6} md={3} key={list._id}>
              <Card sx={{ maxWidth: 345 }}>
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

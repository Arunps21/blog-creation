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

export default function HomePage() {
  const [view, setView] = useState([]);
  const userId = localStorage.getItem("userId");

  const viewBlog = async () => {
    const { data } = await axios.get("http://localhost:9000/blogRouter/viewBlog");
    setView(data);
  };

  const deleteFun=async(id)=>{
    const {data} = await axios.delete(`http://localhost:9000/blogRouter/deleteBlog/${id}`)
    console.log(id)
    if(data.status == 200){
      alert(data.msg)
    }
    else{
      alert(data.msg)
    }
  }

  useEffect(() => {
    viewBlog();
  });

  return (
    <>
      {view.length > 0 &&
        view.map((list) => (
          <Card key={list._id} sx={{ maxWidth: 345, marginBottom: 2 }}>
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
              {/* {userId && userId.trim() !== "" && ( */}
                <IconButton aria-label="delete" onClick={()=>deleteFun(list._id)}>
                  <DeleteIcon />
                </IconButton>
              {/* )} */}
            </CardActions>
          </Card>
        ))}
    </>
  );
}

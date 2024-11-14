import React from "react";
import { Container, TextField, Button, Grid, Paper, Link, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function UserReg() {
  const [reg,setReg] = useState({})
  const navigate = useNavigate()
  const formData = new FormData()
  const regFun=(event)=>{
    setReg({...reg,[event.target.name]:event.target.value})
  }

  const imgFun=(event)=>{
    setReg({...reg,[event.target.name]:event.target.files[0]})
  }
  const handleSubmit=async(event)=>{
    event.preventDefault()
    formData.append("fullname",reg.fullname)
    formData.append("image",reg.image)
    formData.append("email",reg.email)
    formData.append("password",reg.password)
    try{
      const {data} = await axios.post("http://localhost:9000/userRouter/userReg",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      if(data.status==201){
        alert(data.msg)
        navigate("/userLogin")
      }
      else{
        alert(data.msg)
      }
    }
    catch(err){
      console.log("Error:",err)
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}
      >
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                type="text"
                name="fullname"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image"
                type="file"
                name="image"
                onChange={imgFun}
                required
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
          <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
            If you are already a user,
            <Link href="/userLogin" underline="hover">
              Login Here
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default UserReg;

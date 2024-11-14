import React from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [login,setLogin]=useState({})
  const navigate = useNavigate()
  const loginFun = (event)=>{
    setLogin({...login,[event.target.name]:event.target.value})
  }
  const handleSubmit=async(event)=>{
    event.preventDefault()
    try{
    const {data} = await axios.post("http://localhost:9000/userRouter/userLogin",login)
    if(data.status==201){
      localStorage.setItem("userId",data.userId)
      alert(data.msg)
      navigate("/userHome")
    }
    else{
      alert(data.msg)
    }
    }
    catch(err){
      console.log("Error in:",err)
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={loginFun}
                fullWidth
                required
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={loginFun}
                fullWidth
                required
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
          <Typography align="center" sx={{ marginTop: 2 }}>
            If you are not a user please
            <a href="/userReg" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign Up Here
            </a>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default UserLogin;

import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserHome from './UserHome';
import AddBlog from '../blog/AddBlog';
import UserNav from './UserNav';


function UserWrap() {
  return (
    <>
    <Routes>
        <Route path='/userHome' element={<UserHome/>}/>
        <Route path='/addBlog' element={<AddBlog/>}/>
    </Routes>
    </>
  )
}

export default UserWrap
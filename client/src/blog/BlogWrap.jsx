import HomePage from "./HomePage";
import NavbarPage from "./NavbarPage";
import UserLogin from "../user/UserLogin";
import UserReg from "../user/UserReg";
import { Routes, Route } from "react-router-dom";

function BlogWrap() {
  return (
    <>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userReg" element={<UserReg />} />
      </Routes>
    </>
  );
}

export default BlogWrap;

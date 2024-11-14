import './App.css'
import AddBlog from './blog/AddBlog'
import HomePage from './blog/HomePage'
import NavbarPage from './blog/NavbarPage'
import UserLogin from './user/UserLogin'
import UserReg from './user/UserReg'

function App() {

  return (
    <>
    <NavbarPage/>
    <AddBlog/>
    <HomePage/>
    <UserReg/>
    <UserLogin/>
    </>
  )
}

export default App

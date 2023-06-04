import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/Navbar"
import UserForm from "./components/UserForm"

const App = () => {

  const [user, setUser] = useState({})

  return <>

    <NavbarComponent/>
    <Routes>
      <Route path="/" element={<UserForm isSignup heading={'Signup Form'} setUser={setUser} />} />
      <Route path="/signin" element={<UserForm isSignup={false} heading={'Signin Form'} setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
    </Routes>

  </>

}

export default App
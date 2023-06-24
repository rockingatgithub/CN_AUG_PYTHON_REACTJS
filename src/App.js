import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import NavbarComponent from "./components/Navbar"
import UserForm from "./components/UserForm"

const App = () => {

  return <>

    <NavbarComponent/>
    <Routes>
      <Route path="/" element={<UserForm isSignup heading={'Signup Form'} />} />
      <Route path="/signin" element={<UserForm isSignup={false} heading={'Signin Form'}  />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  </>

}

export default App
import React, { useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import UserForm from "./components/UserForm"

const App = () => {

  const [user, setUser] = useState({})

  return <>

    <nav>
      <Link to="/"> Signup </Link>
      <Link to="/signin"> Signin </Link>
      <Link to="/dashboard"> Dashboard </Link>

    </nav>

    <Routes>
      <Route path="/" element={<UserForm isSignup={true} heading={'Signup Form'} setUser={setUser} />} />
      <Route path="/signin" element={<UserForm isSignup={false} heading={'Signin Form'} setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
    </Routes>

  </>

}

export default App
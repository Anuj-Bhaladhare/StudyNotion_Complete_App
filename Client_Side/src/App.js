import React from "react";
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/common/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

const App = () => {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/about" element={ <AboutUs /> }/>
        <Route path="/contact" element={ <ContactUs /> }/>
        <Route path="/forgot-password" element={ <ForgotPassword /> }/>
        <Route path="/dashboard" element={ <Dashboard /> }/>
        <Route path="/verify-user" element={<VerifyEmail />}/>
      </Routes>

    </div>
  );

}

export default App;

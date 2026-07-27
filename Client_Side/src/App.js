import React from "react";
import { Route, Routes } from "react-router-dom"

import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";

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
        {/* Open Routes */}
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/about" element={ <AboutUs /> }/>
        <Route path="/contact" element={ <ContactUs /> }/>
        <Route path="/forgot-password" element={ <ForgotPassword /> }/>
        <Route path="/verify-user" element={<VerifyEmail />}/>

        {/* Protected Routes */}
        <Route path="/user" element={ <PrivateRoute /> }>
          <Route path="dashboard" element={ <Dashboard /> }/>
        </Route>
      </Routes>

    </div>
  );
}

export default App;

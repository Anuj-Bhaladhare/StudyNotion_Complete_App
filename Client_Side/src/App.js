import React from "react";
import { Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./redux/hooks/index.ts";
import { ACCOUNT_TYPE } from "./utils/constants.js"; 

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

// Dashboard Pages
import MyProfile from "./components/core/dashboard/MyProfile.jsx";
import Settings from "./components/core/dashboard/Settings/Setting.jsx";
import Cart from "./components/core/dashboard/Cart/Cart.jsx";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses.jsx";
import Instructor from "./components/core/dashboard/InstructorDashboard/Instructor.jsx";
import AddCourse from "./components/core/dashboard/AddCourse/AddCourse.jsx";
import MyCourses from "./components/core/dashboard/MyCourses.jsx";
import EditCourse from "./components/core/dashboard/EditCourse.jsx";

const App = () => {

  const { user } = useAppSelector( (state) => state.profile );
  console.log("user", user)

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
        <Route element={ <PrivateRoute /> }>

          <Route path="/dashboard" element={ <Dashboard /> }>

            <Route path="my-profile" element={ <MyProfile /> }/>
            <Route path="settings" element={ <Settings /> }/>

            {/* Component for Student  */}
            { user?.account_type === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="cart" element={<Cart />} />
                  <Route path="enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }            
            
            {/* Component for Instructor  */}
            { user?.account_type === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="instructor" element={<Instructor />} />
                  <Route path="add-course" element={<AddCourse />} />
                  <Route path="my-courses" element={<MyCourses />} />
                  <Route path="edit-course/:courseId" element={<EditCourse />} />
                
                </>
              )
            }
            
          </Route>

        </Route>

        
      </Routes>

    </div>
  );
}

export default App;

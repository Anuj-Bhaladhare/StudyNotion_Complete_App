import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc"
import IconBtn from "./../../common/IconBtn.jsx";
import CoursesTable from "./InstructorCourses/CoursesTable"
import { useAppDispatch, useAppSelector }from "./../../../redux/hooks/index.ts";

const MyCourses = () => {

    const [ courses, setCourses ] = useState(null);
    const navigate = useNavigate();

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>

  )
}

export default MyCourses;

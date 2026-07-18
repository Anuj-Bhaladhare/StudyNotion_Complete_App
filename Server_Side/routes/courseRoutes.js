const express = require("express");
const router = express.Router();

const {
    createCourse,
	getAllCourses,
	getCoursesByInstructorId,
	getCoursesByStudentId
} = require("./../controllers/Course.js")

router.post("/create-course", createCourse);
router.get("/get-courses", getAllCourses);
router.get("/get-instructor-course", getCoursesByInstructorId);
router.get("/get-student-course", getCoursesByStudentId);

module.exports = router;

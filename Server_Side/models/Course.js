const pool = require("./../config/database.js");

// Create New Course Entry
const createCourseModule = async ({ course_name, course_description, instructor, what_you_will_learn, price, thumbnail, category, status }) => {
    try {
  
        const result = await pool.query(
            `
                INSERT INTO courses
                    (course_name, course_description, instructor_id, what_you_will_learn, price, thumbnail_url, category_id, status)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id;
            `,
            [course_name, course_description, instructor, what_you_will_learn, price, thumbnail, category, status]
        );

        console.log("create Course Module: ", result.rows[0].id);

        return result.rows.length > 0 ? result.rows[0].id : false;

    } catch (error) {

        console.log("Error Occured in create Course Module: ", error);
        throw new error;

    }
}


// Get All Course List
const getAllCourseList = async () => {
    try {

        const result = await pool.query(
            `
                SELECT * FROM courses;
            `
        );

        return result?.rows?.length > 0 ? result?.rows : false;

    } catch (error) {

        console.log("Error Occured in create Course Module: ", error);
        throw new error;

    }
}


const coursesListByInstructorId = async (instructor_id) => {
    try {


        const result = await pool.query(
            `
                SELECT * FROM courses WHERE instructor_id = $1;
            `, [instructor_id]
        );

        return result?.rows?.length > 0 ? result?.rows : false;

    } catch (error) {

        console.log("Error Occured in create Course Module: ", error);
        throw new error;

    }
}


const coursesListByStudentId = async () => {
    try {

        console.log("coursesListByStudentId");

    } catch (error) {

        console.log("Error Occured in create Course Module: ", error);
        throw new error;

    }
}


module.exports = {
    createCourseModule,
    getAllCourseList, 
	coursesListByInstructorId, 
	coursesListByStudentId 
}



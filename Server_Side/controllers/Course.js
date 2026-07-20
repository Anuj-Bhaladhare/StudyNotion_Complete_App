const { 
	createCourseModule, 
	getAllCourseList, 
	coursesListByInstructorId, 
	coursesListByStudentId,
	getStudentCoursesId
} = require("./../models/Course.js");
const { Category } = require("./../models/Category.js");
const { findUserByUserId } = require("./../models/User.js");
const { uploadImageToCloudinary } = require("./../utils/imageUploader.js");
const { createTagModule } = require("./../models/Tags.js");


const createCourse = async (req, res) => {
	try {
		// get data from  request body;
		const { 
			user_id, 
			course_name, 
			course_description, 
			what_you_will_learn, 
			price, 
			category_id,
			thumbnail_img,
			tags, 
			status 
		} = req.body;

		// get thambnail image from request file
		// const { thumbnail_img } = req.files;

		// valdate the data
		if ( !user_id || !course_name || !course_description || !what_you_will_learn || !price || !thumbnail_img || !category_id || !tags ) {
			return res.status(422).json({
                "success": false,
                "title": "Missing Required Fields",
                "status": 422,
                "message": "The request body is missing mandatory information required to complete this action.",
            });
		}

		if ( !status || status === undefined ) {
			status = "DRAFT";
		}

		// get user detail from database
		const user_db_result = await findUserByUserId(user_id); 

		// check if the user is availabe in our system 
		if ( !user_db_result || user_db_result === null ) {
			return res.status(404).json({
				"success": false,
				"message": "User Not Found in Our database"
			})
		}

		// check if the user is instructor 
		if ( user_db_result.account_type !== "Instructor") {
			return res.status(401).json({
				"success": false,
				"message": "User is Not a Instructor"
			})
		}

		// const thumbnailImage = await uploadImageToCloudinary( 
		// 	thumbnail_img,
		// 	process.env.FOLDER_NAME
		// );

		// Create a new course with the given details
		const new_course = await createCourseModule({
			course_name,
			course_description,
			instructor: user_id,
			what_you_will_learn,
			price,
			thumbnail: thumbnail_img,
			category: category_id,
			status,
		});

		// when new course is created then add database entry in tags
		if ( !new_course ) {
			return res.status(401).json({
				"success": false,
				"message": "Error Occured in create Course Controller"
			});
		}

		// create Tags for the course
		const insert_tags = await createTagModule({course_id: new_course, tags});

		if ( !insert_tags ) {
			return res.status(401).json({
				"success": false,
				"message": "Course tag is not insert properlly"
			});
		}

		return res.status(201).json({
			"success": true,
			"message": "Course Created successfully.",
			"data": {
				"user": user_id
			}
		});

	} catch (error) {

        console.log("Error Occured in create Course Controller", error);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in create Course Controller",
            "error": error
        });

	}
}


const getAllCourses = async (req, res) => {
	try {
		
		const courses_result = await getAllCourseList();

		if ( !courses_result ) {
			return res.status(404).json({
				"success": false,
				"message": "Course List Not Found"
			});
		} 

		return res.status(200).json({
			"success": true,
			"message": "Courses Data get Successfully",
			"data": {
				"courses": courses_result
			}
		});
		
		
	} catch (error) {

        console.log("Error Occured in SignUp Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in SignUp Controller",
            "error": error
        });

	}
}


const getCoursesByInstructorId = async (req, res) => {
	try {

		const { instructor_id } = req.body;

		if ( !instructor_id ) {
			return res.status(404).json({
				"success": false,
				"message": "Instructor ID is Not Present"
			});
		}

		const db_result = await coursesListByInstructorId(instructor_id);

		if ( db_result ) {
			return res.status(200).json({
				"success": true,
				"message": "Instructor Courses get Successfully",
				"data": {
					"courses": db_result
				}
			});
		} else {
			return res.status(404).json({
				"success": false,
				"message": "Instructor Courses Not Found"
			});
		}

	} catch (error) {

        console.log("Error Occured in get CoursesBy Instructor Id Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get CoursesBy Instructor Id Controller",
            "error": error
        });

	}
}


const getCoursesByStudentId = async (req, res) => {
	try {

		const { student_id } = req.body;

		if ( !student_id ) {
			return res.status(404).json({
				"success": false,
				"message": "Student ID is Not Present"
			});
		}

		// get Student Courses id
		const course_id_result = await getStudentCoursesId(student_id);

		if (course_id_result) {

			const db_result = await coursesListByStudentId({student_ids: course_id_result});

			if ( db_result ) {

				return res.status(200).json({
					"success": true,
					"message": "Student Courses get Successfully",
					"data": {
						"courses": db_result
					}
				});

			} else {

				return res.status(404).json({
					"success": false,
					"message": "Student Courses Not Found"
				});

			}
			
		}

	} catch (error) {

        console.log("Error Occured in get Courses By StudentId Controller", error);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get Courses By StudentId Controller",
            "error": error
        });

	}
}


module.exports = {
	createCourse,
	getAllCourses,
	getCoursesByInstructorId,
	getCoursesByStudentId
}

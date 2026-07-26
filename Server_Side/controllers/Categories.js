
const { getAllCategory } = require("./../models/Category.js");

const showAllCategory = async (req, res) => {
	try {

		const categories_result = await getAllCategory();

        if (categories_result) {
            return res.status(200).json({
                success: true,
                message: "Get All Categories List Successfully",
                data: categories_result
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Categories List Not Found"
            })
        }
		
	} catch (error) {

        console.log("Error Occured in Category Module: ", error);
        throw new error;
		
	}
}


module.exports = {
	showAllCategory
}

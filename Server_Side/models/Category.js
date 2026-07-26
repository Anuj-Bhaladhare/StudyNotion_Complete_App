const pool = require("./../config/database.js");

const getAllCategory = async () => {
	try {

		const result = await pool.query(
			`
				SELECT * FROM categories;
			`
		);

		return result.rows.length > 0 ? result.rows	: null;

	} catch (error) {

        console.log("Error Occured in Get All Category Module: ", error);
        throw new error;
		
	}
}


module.exports = {
	getAllCategory
}


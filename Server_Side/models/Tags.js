const pool = require("./../config/database.js");

const createTagModule = async ({ course_id, tags }) => {
    try {
        for (const tag of tags) {
            await pool.query(
                `
                INSERT INTO tags
                    (tag_id, name, description, course_id)
                VALUES
                    ($1, $2, $3, $4);
                `,
                [tag.id, tag.name, tag.description, course_id]
            );
        }

        return true;

    } catch (error) {
        console.error("Database Error [createTagModule]:", error);
        throw error;
    }
};



module.exports = {
    createTagModule
}

const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

const uploadImageToCloudinary = async ( file, folder, height, quality ) => {
    try {
        const options = {folder};

        if ( height ) {
            options.height = height;
        }

        if ( quality ) {
            options.quality = quality;
        }

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);

    } catch (error) {

        console.log("Error Occured in Cloudnary Image Upload: ", error);
        throw new error;

    }
}

module.exports = {
    uploadImageToCloudinary
}

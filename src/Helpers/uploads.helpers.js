const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const upload = async (file, allowedFileExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {
    try {
        const shortNameImage = file.name.split('.');
        const extension = shortNameImage[shortNameImage.length - 1];

        if (!allowedFileExtensions.includes(extension)) {
            throw new Error(`The extension ${extension} is not an allowed file extension. Allowed extensions: ${allowedFileExtensions.join(', ')}`);
        }

        const uniqueName = uuidv4();

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            // resource_type: 'raw', // Especifica el tipo de recurso como "raw" para archivos no procesados
            public_id: uniqueName,
            folder: folder,
            overwrite: true
        });

        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};

const updateFile = async (newFile, oldFile) => {

    if (newFile && newFile.image) {
        if (oldFile) {
            const publicId = oldFile.match(/\/v\d+\/(.+)\./)[1];
            await cloudinary.uploader.destroy(publicId);
        }

        return imageUrl = await upload(newFile.image);
    }
}


module.exports = {
    upload, 
    updateFile
}
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const upload = async (file, allowedFileExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {
    if (!file) {
        return null;
    }
    try {
        console.log(file.name, "upload file")
        const shortNameImage = file.name.split('.');
        const extension = shortNameImage[shortNameImage.length - 1];

        if (!allowedFileExtensions.includes(extension)) {
            throw new Error(`The extension ${extension} is not an allowed file extension. Allowed extensions: ${allowedFileExtensions.join(', ')}`);
        }

        const uniqueName = uuidv4();

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: (extension == 'pdf') ? 'raw' : null,
            public_id: uniqueName,
            folder: folder,
            overwrite: true
        });

        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};


const updateFile = async (newFile, oldFile, allowedFileExtensions = ['png', 'jpg', 'jpeg', 'pdf'], folder = '', atribute = "pdf") => {

    if (!newFile || !newFile[atribute]) {
        return null;
    }

    if (oldFile) {
        const urlArr = oldFile.split('/')
        const arr = urlArr[urlArr.length - 1]
        const publicId = arr.includes('.') ? arr.split('.')[0] : arr

        await cloudinary.uploader.destroy(publicId);
    }

    return imageUrl = await upload(newFile[atribute], allowedFileExtensions, folder);
}


module.exports = {
    upload,
    updateFile
}
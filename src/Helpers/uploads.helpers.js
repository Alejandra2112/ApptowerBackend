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

const updateFile = async (newFile, oldFile, allowedFileExtensions = ['png', 'jpg', 'jpeg'], folder = '', atribute = "image") => {

    // if (!newFile || !newFile.pdf) {
        
    //     return null;
    // }
    
    console.log(newFile[atribute], 'new file')


    if (oldFile) {
        let publicId;

        if (oldFile.endsWith('.png') || oldFile.endsWith('.jpg') || oldFile.endsWith('.jpeg')) {
            const urlArr = oldFile.split('/');
            const arr = urlArr[urlArr.length - 1];
            const [public_id]  = arr.split('.');
            publicId = public_id;
        } else {
            const urlArr = oldFile.split('/');
            const arr = urlArr[urlArr.length - 1];
            publicId = arr;
        }

        console.log(publicId , 'id to delete')
        await cloudinary.uploader.destroy(publicId);
        return await upload(newFile[atribute], allowedFileExtensions, folder);
    }

    // Handle the case when oldFile is not provided
    return await upload(newFile[atribute], allowedFileExtensions, folder);
};


module.exports = {
    upload,
    updateFile
}
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
//file system from node.js and it is by default , you don't have to import manually

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadonCLoudinary = async (localfilepath) => {
    try {
        if (!localfilepath) {
            return null;
        }
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localfilepath,{resource_type: "auto"});
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response
    } catch (error) { 
        fs.unlinkSync(localfilepath); //delete the file from local storage
        console.log("error in uploading file on cloudinary",error);
        return null;
    }
}

export {uploadonCLoudinary};

cloudinary.v2.uploader.upload("https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/sample.jpg",
{public_id: "olympic_flag"},
function(error, result) {console.log(result, error); });

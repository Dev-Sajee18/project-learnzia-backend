import  cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name:'dltbmg2h6',
    api_key:'665713339682688',
    api_secret:'kjNwXvvuvE7m4_G1CxZ5p51K1MQ',


})
export default  cloudinary;
// export const uploadFileToCloudinary = async (file) => {
//     try {
//         // Upload the file to Cloudinary
//         const result = await cloudinary.v2.uploader.upload(file.path, { folder: 'uploads' });
        
//         //cloudinary.v2.uploader.upload(file.path, { folder: 'uploads' });

//         // If you need to perform additional actions with the result, you can do it here

//         return result;
//     } catch (error) {
//         throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
//     }
// };










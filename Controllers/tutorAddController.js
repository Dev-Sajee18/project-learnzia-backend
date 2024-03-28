import cloudinary from "../utils/cloudinary.js";
import Image from "../models/tutorAddModel.js";





const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ success: false, message: 'Missing required fields: name or description' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        if (!result) {
            return res.status(500).json({ success: false, message: 'Failed to upload image to cloudinary' });
        }

        const newImage = await Image.create({
            url: result.url,
            public_id: result.public_id,
            name: req.body.name,
            description: req.body.description
        });

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};








const getImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({
            success: true,
            images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// const deleteImage = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const image = await Image.findById(id);
//         if (!image) {
//             return res.status(404).json({ success: false, message: 'Image not found' });
//         }

//         // Delete image from Cloudinary
//         await cloudinary.uploader.destroy(image.public_id);

//         // Delete image from your database
//         await image.remove();

//         res.status(200).json({ success: true, message: 'Image deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };


const deleteImage = async (req, res) => {
    const { image } = req.body;
    try {
      if (!image) {
        return res.status(400).json({ success: false, message: 'Image object is required' });
      }
  
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);
  
      // Delete image from your database
      // Assuming your schema has a unique identifier for each image, such as an email or name
      // Replace `email` with the appropriate unique identifier from your schema
      await Image.findOneAndDelete({ email: image.email });
  
      res.status(200).json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


// const deleteImage = async (req, res) => {
//     const { email } = req.body;
//     try {
//       if (!email) {
//         return res.status(400).json({ success: false, message: 'Email is required' });
//       }
  
//       // Find the image by email
//       const image = await Image.findOne({ email });
//       if (!image) {
//         return res.status(404).json({ success: false, message: 'Image not found' });
//       }
  
//       // Delete image from Cloudinary
//       await cloudinary.uploader.destroy(image.public_id);
  
//       // Delete image from your
//       res.status(200).json({ success: true, message: 'Image deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   };
  
  
  


// const deleteTutor = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const tutor = await Tutor.findById(id);
//         if (!tutor) {
//             return res.status(404).json({ success: false, message: 'Tutor not found' });
//         }

//         // Delete tutor's image from Cloudinary
//         await cloudinary.uploader.destroy(tutor.public_id);

//         // Delete tutor from your database
//         await tutor.remove();

//         res.status(200).json({ success: true, message: 'Tutor deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export { deleteTutor };



export{
    uploadImage,
    getImages,
    deleteImage,
    // deleteTutor

};






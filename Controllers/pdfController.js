import cloudinary from "../utils/cloudinary.js";
import Image from '../models/pdfModel.js';

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ success: false, message: 'Missing required fields: version or description' });
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

const deleteImage = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(image.public_id);

        // Delete image from your database
        await image.remove();

        res.status(200).json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export{
    uploadImage,
    getImages,
    deleteImage
};




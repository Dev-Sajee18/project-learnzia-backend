
import asynchandler from 'express-async-handler';
import File from '../models/filesModel.js';


const getFile = asynchandler(async (req, res) => {
  const file = await File.find({});
  res.json(file);
});

// @desc Get a single file by ID
// route GET /api/file/ id
// @access Public

const getFileById = asynchandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (file) {
    res.json(file);
  } else {
    res.status(404);
    throw new Error('File not found');
  }
});


// @desc Update a file by ID
// route Patch /api/file/:id
// @access Private 

const updateFileById = asynchandler(async (req, res) => {
  const { name, description, price } = req.body;

  const file = await File.findById(req.params.id);

  if (file) {
    file.name = name || file.name;
    file.description = description || file.description;
    file.price = price || file.price;


    const updatedFile = await file.save();
    res.json(updatedFile);
  } else {
    res.status(404);
    throw new Error('File not found');
  }
});

// @desc Delete file by ID
// route DELETE /api/file/:id
// @access Private 
const deleteFileById = asynchandler(async (req, res) => {
 const {id} =req.params;
 
  try  {
    const filedelete= await File.findOneAndDelete(id)
    res.json({ message: 'file removed',filedelete });
  } catch {
    res.status(404);
    throw new Error('file not found');
  }


});

export {  getFile,getFileById,updateFileById,deleteFileById};






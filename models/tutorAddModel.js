import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    
    url: {type: String},
    public_id:{type: String},
    name:{type: String},
        description: { type: String }});


const Image = mongoose.model('TutorImage', imageSchema);
export default Image;



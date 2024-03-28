// import bcrypt from 'bcryptjs'
// import mongoose from 'mongoose';
// const TutorSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true
//     },
//     staff: {
//         type: String,
//         enum: ['government', 'private'],
//     },
//     workingTime: {
//         type: String,
//         enum: ['fullTime', 'partTime'],
    
//     },
  
// }, {
//     timestamps: true,
// });



// TutorSchema.pre('save',async function(next){
//     if (!this.isModified('password')){
//    next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password =bcrypt.hash(this.password, salt)
// });

// TutorSchema.methods.matchPassword= async function(enteredPassword){
//   return await bcrypt.compare(enteredPassword, this.password) 
// };
// const tutor = mongoose.model('learntutor', TutorSchema);

// export default tutor;



import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const TutorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from the beginning and end of the string
        minlength: 2, // Minimum 2 characters
        maxlength: 50, // Maximum 50 characters
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure email is unique
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum 6 characters
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, // Minimum 5 characters
        maxlength: 100, // Maximum 100 characters
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\d{10}$/, // Phone number format validation (10 digits)
    },
    staff: {
        type: String,
        enum: ['government', 'private'],
    },
    workingTime: {
        type: String,
        enum: ['fullTime', 'partTime'],
    },
}, {
    timestamps: true,
});

TutorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

TutorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const tutor = mongoose.model('learntutor', TutorSchema);

export default tutor;

  


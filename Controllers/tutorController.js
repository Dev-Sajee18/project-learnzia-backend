import nodemailer  from 'nodemailer'

import generateToken from "../utils/generateToken.js"
import cloudinary from "../utils/cloudinary.js"
import Tutor from "../models/tutorModel.js"

const TutorSignUp = async (req, res) => {
  try {
      const {
          name,
          email,
          password,
          address,
          phoneNumber,
           staff,
          workingTime,
          resume,
          approved,
      } = req.body;

      const tutorExists = await Tutor.findOne({ email });
      if (tutorExists) {
          return res.status(400).json({ error: 'Tutor already exists' });
      }

      const newTutor = new Tutor({
          name,
          email,
          password,
          address,
          phoneNumber,
           staff,
          workingTime,
          resume,
          approved,
      });

      await newTutor.save();

      return res.status(201).json({ message: 'Tutor created successfully', tutor: newTutor });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};











const  TutorLogin =  async (req, res) => {
  const { email, password } = req.body

  const tutor = await Tutor.findOne({ email })

  if (tutor && (await tutor.matchPassword(password))) {
    generateToken(res, tutor._id)
    res.status(201).json("Login Successfully ")
  }
  else {
    res.status(401)
    throw new Error('Invaild email or password')
  }
}

// const tutorDelete =async(req,res)=>{
//   try {
//       const tutor = await Tutor.findById(req.params.id)
//       if(!tutor){
//           res.send(401).json("Tutor not found")

//       }
//       const deletetutor = await Tutor.findByIdAndDelete(req.params.id);
//   res.status(201).json({
//       success: true,
//       message: " Tutor  deleted successfully",
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

const tutorDelete = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ email: req.params.email });
    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }
    await Tutor.findOneAndDelete({ email: req.params.email });
    res.status(200).json({ success: true, message: "Tutor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const sendmail=async(email,subject)=>{
  console.log("93",email)
  try {
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 's.mahan19com@gmail.com',
          pass: 'rvtlnrkiaxaluggi'
      }
  });
  var mailOptions = {
    from: 's.mahan19com@gmail.com',
    to: email,
    subject: subject,
    text: `Hi ${subject}  successfully, \n we will contact sortly`
};
return new Promise((resolve, reject) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      resolve(false);
    } else {
      console.log(info);
      resolve(true);
    }
  });
});
  } catch (error) {
    console.log(error)
  }
}

const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};




  export {
    TutorSignUp,
    TutorLogin,
    tutorDelete,
    getAllTutors,
    sendmail
  }





  

  
  
  
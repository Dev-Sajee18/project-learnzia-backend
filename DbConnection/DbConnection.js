import mongoose from "mongoose";


const DbConnection =async(req,res)=>{
    mongoose.connect(process.env.DATABASE_URL).then((res)=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log(err)
    })
}

export default DbConnection






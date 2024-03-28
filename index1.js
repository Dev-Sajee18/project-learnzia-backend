// const express = require('express')
// const {google} = require ('googleapis')
// const multer = require ('multer')

// const path = require('path')
// const cors = require('cors')

// const fs = require('fs')
// // const app =express()

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename:function(req,file,callback){
// const extension = file.originalname.split(".").pop()
// callback(null,`${file.fieldname}-${Date.now()}.${extension}`)
//     }
// })


// const upload = multer({storage:storage})

// app.use(cors())


// app.post('/upload',upload.array('files'),async(req,res)=> {
//     try {
//         const auth = new google.auth.GoogleAuth({
//             keyFile:"key.json",
//             scopes:["https://www.googleapis.com/auth/drive"]
//         })

//         console.log(auth)

//        const drive = google.drive({
//         version:'v3',
//         auth
//        })

//        const uploadFiles = []

//        for(let i=0;i<req.files.length;i++){
         
//        const file = req.files[i]

//        const response = await drive.files.create({
//         requestBody:{
//             name: file.originalname,
//             mimeType: file.mimeType,
//             parents:['1mh5644f1o7TisVqGKosDZfz_N-Dmm2Hy']
//         },
//         media:{
//             body:fs>fs.createReadStream(file.path)
//         }
//        })

//        uploadFiles.push(response.data)
//     }

//     res.json({files:uploadedFiles})

//     }catch (error) {
//         console.log(error)
//     }
// })



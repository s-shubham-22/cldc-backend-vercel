const { Career }= require('../models')
const fs = require('fs');
const path = require('path');
const dir_path = (__dirname+'/Resume')
const cloudinary = require('cloudinary').v2;
const {upload} = require('../uploads')

exports.getStudent = async(req,res) => {
    try {
        const student = await Career.findOne({
          where: {
            id: req.params.id,
          },
        });
    
        if (!student) {
          res.status(404);
          throw new Error('Student not found');
        }
    
        res.status(201).json(student);
      } catch (err) {
        res.status(500);
        throw new Error(err);
      }   
}

exports.getStudents = async(req,res) => {
    try {
        const students = await Career.findAll();
        res.status(201).json(students);
      } catch (err) {
        res.status(500);
        throw new Error(err);
      }
}

exports.createStudent = async(req,res) => {
  console.log(req.body.college_id)
    try {
      const existingStudent = await Career.findOne({
        where: {
                 mail_id: req.body.mail_id ,
                 linkedin: req.body.linkedin ,
                }
    });
    if (existingStudent) {
        return res.status(400).json({ error: 'Already applied!!' });
    }

    //uploading file to cloudinary

    const folder='Resume'
    const {college_id,name}=Career
    const filename = `${college_id}_${name}`
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
        return;
      }
      const resume = files.find((file) => file.startsWith(college_id));

      if (resume) {
        const resume_path = path.join(dir_path, resume);

      const result = await cloudinary.uploader.upload(
        resume_path,
        {
          resource_type:"raw",
          public_id:filename,
          folder:folder,
          pages:true
        },
      )
      std = {
        ...req.body,resume:result.secure_url,
      }
    }
    else{
      console.log(`Resume for ${filename} not found`)
    }

    const student = await Career.create(std);
    return res.status(201).json(student);
} )
    }
catch (err) {
    return res.status(500).json({ error: err.message });
}
// try{
// const student = await Career.create(req.body);
//     return res.status(201).json(student);}
// catch(err){
//   res.send(err);
// }

}

// exports.deleteStudent = async(req,res) => {
// }






const multer = require('multer')
const career=require('./models/Career')
const path = require('path')

const fstorage = multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null, path.join(__dirname, '/Resume/'))
    },
    filename:async(req,res,cb)=>{
        var id= await req.body.college_id
        var name= await req.body.name
        cb(null,`${id}_${name}.pdf`)
    }
})

const uploads=multer({
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="application/pdf"){
            cb(null,true)
        }
        else{
            cb(null,false)
            return cb(new Error('Only pdf files allowed!'))
        }
    },
    storage:fstorage,
    limits : {fileSize : 1000000}
})

module.exports = {uploads,fstorage}
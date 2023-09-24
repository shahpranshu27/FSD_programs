// Write a program to upload a text file upto 1MB size only using express JS. Perform necessary validation for file format and size. 

const expr = require('express')
const app = expr()
const multer = require("multer")
const path = require("path")
const port = 3000

const storage = multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='text/plain'){
            cb(null, true)
        }
        else{
            cb(new Error("only text files are allowed"))
        }
    }
})

app.use(expr.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'upload.html'))
})
    // expr.static(path.join(__dirname,'upload.html')))

app.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send("no file uploaded")
    }
    if(req.file.size > 1024*1024){
        return res.status(401).send("file exceeds 1 mb")
    }
    res.status(200).send("file uploaded successfully")
})

app.listen(port,()=>{
    console.log("server running at port : ",{port})
})
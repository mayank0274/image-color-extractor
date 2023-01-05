const express = require("express")
const app = express()
const port = 3000 || process.env.PORT
const getColors = require('get-image-colors')
const fs = require("fs")
const multer = require("multer")
const cors = require("cors")
app.use(cors())

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload")
  },
  filename: (req, file, cb)=> {
    const name = `${Date.now()}-${file.originalname}`
    cb(null, name);
  }
})
/*
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpg") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
*/
const upload = multer({
  storage: multerStorage
 // fileFilter: multerFilter
})

app.get("/m",(req,res)=>{
  return res.json("ok")
})


app.post("/getColor",upload.single("file"),(req,res)=>{
 // res.send("okay")
 
const src = req.file.path;
console.log("api called")
console.log(src)
getColors(src).then(colors => {
  
  // `colors` is an array of color objects
const color = colors.map(color => color.hex())
  return res.json(color)
})
.catch((err) => {return res.json(err)})

fs.unlinkSync(src);
})


app.listen(port,()=>{
  console.log("connected to server",port)
})
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

const upload = multer({
  storage: multerStorage
})

app.post("/getColor",upload.single("file"),(req,res)=>{
 // res.send("okay")
 
const src = req.file.path;
console.log("api called")
console.log(src)
getColors(src).then(colors => {
  
  // `colors` is an array of color objects
const color = colors.map(color => color.hex())
  fs.unlinkSync(src);
  console.log("delete file",src)
  },0)
  return res.json(color)
})
.catch((err) => {return res.json(err)})
})


app.listen(port,()=>{
  console.log("connected to server",port)
})
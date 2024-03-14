const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json());

const mongoURL =
"mongodb+srv://jeffry:admin@databasetest.fadywiv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DatabaseTest"

//connection mongodb
mongoose.connect(mongoURL)
.then(() => { 
    app.listen(5000, () => {
        console.log("Server is listening at 5000")
        console.log("MOngoose Has Been Connected")
    })
    }).catch((error) => {
        console.log(error)
    })

require("./imageModel");
const Images =  mongoose.model('ImageDetails')

app.get('/' , (req,res) => {
    res.send('Success')
})


/////////////////////////////////

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../src/Images")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  
app.post('/upload-image',upload.single("image"), async(req,res) => {
    console.log(req.body)
  
    // if(req.file.filename == null){
    //     res.send({status:'file not found'})
    // }
    const imageName = req.file.filename;
    try {
        await Images.create({image:imageName})
        res.json({status:"oke"})
    } catch (error) {
        res.json({status:error})
    }
})

app.get('/get-image', async(req,res) => {
    try {
        Images.find({})
        .then((data)=> {
            res.send({ status:"ok", data:data})
        });
    } catch (error) {
        res.json({status:error})
    }
})
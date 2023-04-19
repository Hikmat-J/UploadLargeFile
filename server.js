var express = require('express');
var multer = require('multer');
var cors = require('cors');
var app = express();
var path = require('path')


const Images = require("./controllers/ImageController");

// Middleware to enable CORS .
app.use(cors());

require("./routes/ImageRoutes")(app);

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// ---------------------
// Upload
// ---------------------
// Set uploaded file destination path 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ouruploads')
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() +path.extname(file.originalname) 
    cb(null, fileName)
  }
});

// Multer for handling multipart/form-data
const uploadMiddleware = multer({ storage: storage }).single('file',500000)

// Upload path
app.post('/api/files/upload', uploadMiddleware, function (req, res) {
  Images.create(req.file?.filename);
  // console.log('object :>> ', req.file?.filename);
  res.json({ message: `File ${req.file?.filename} uploaded successfully!` });
});



app.listen(8080, function () {
  console.log('Server is running on port 8080');
});  
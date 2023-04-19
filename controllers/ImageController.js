const path = require('path');
const fs = require("fs");
const url = require("url");
const db = require("../models");

const img = db.Image;

exports.create = (name) => {

  // Create a Image
  const image = new img({
    path: name,
    url: name,
    caption: name,
  });

  // Save Image in the database
  image
    .save(image)
    .then(data => {
      // res.send(data);
    })
    .catch(err => {
      // res.status(500).send({
      //   message:
      //     err.message || "Some error occurred while creating the Image."
      // });
    });
};

// Retrieve all Image from the database.
exports.findAll = (req, res) => {

    img.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Image."
      });
    });
};

// Update a Image by the id in the request
exports.getImage = (req, res) => {
  var request = url.parse(req.url, true);
 
    // Extracting the path of file
    var action = request.pathname;
 
    // Path Refinements
    var filePath = path.join('./app/upload/',
            action).split("%20").join(" ");
 
    // Checking if the path exists
    fs.exists(filePath, function (exists) {
 
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain" });
            res.end("404 Not Found");
            return;
        }
 
        // Extracting file extension
        var ext = path.extname(action);
 
        // Setting default Content-Type
        var contentType = "text/plain";
 
        // Checking if the extension of
        // image is '.png'
        if (ext === ".png") {
            contentType = `image/png`;
        }
 
        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType });
 
        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
  };
  

  exports.getTestImage = (req, res) => {
    var request = url.parse(req.url, true);
   
      // Extracting the path of file
      var action = request.pathname;
   
      // Path Refinements
      var filePath = path.join('./ouruploads/',
              action).split("%20").join(" ");
   
      // Checking if the path exists
      fs.exists(filePath, function (exists) {
   
          if (!exists) {
              res.writeHead(404, {
                  "Content-Type": "text/plain" });
              res.end("404 Not Found");
              return;
          }
   
          // Extracting file extension
          var ext = path.extname(action);
   
          // Setting default Content-Type
          var contentType = "text/plain";
   
          // Checking if the extension of
          // image is '.png'
          // if (ext === ".png") {
              contentType = `image/${ext}`;
          // }
   
          // Setting the headers
          res.writeHead(200, {
              "Content-Type": contentType });
   
          // Reading the file
          fs.readFile(filePath,
              function (err, content) {
                  // Serving the image
                  res.end(content);
              });
      });
    };


  // Delete a Image with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    img.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
          });
        } else {
          res.send({
            message: "Image was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Image with id=" + id
        });
      });
  };
  
  // Delete all Image from the database.
  exports.deleteAll = (req, res) => {
    img.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Image were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Image."
        });
      });
  };


  exports.UploadImage=('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;
  

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
   // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv( './app/upload/' +image.name+Date.now() +path.extname(image.name) );

    // All good
    res.send({path:image.name+Date.now() +path.extname(image.name)});
});
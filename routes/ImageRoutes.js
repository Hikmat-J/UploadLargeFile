module.exports = app => {
    const image = require("../controllers/ImageController.js");
  
    var router = require("express").Router();
  
    router.post("/", image.create);
    router.post("/upload", image.UploadImage);
  
    // router.get("/", image.getImage);
    router.get("/getAll/", image.findAll);
    // router.get("/:id", image.getImage);
    router.get("/:id", image.getTestImage);
  
    router.delete("/:id", image.delete);
  
    router.delete("/", image.deleteAll);
  
    app.use("/api/images", router);
  };
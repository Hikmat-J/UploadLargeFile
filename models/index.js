const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = {
  mongoose: mongoose,
  url: dbConfig.url,

  Image: require("./Image"),

};

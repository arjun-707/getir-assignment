const mongoose = require("mongoose");
const glob = require("glob");
const {
  dbConfig: {
    mongo: { mongoURL, mongoOptions },
  },
} = require("../configs");

exports.connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI || mongoURL, mongoOptions);
    const db = mongoose.connection;
    db.on("error", (error) => {
      mongoose.disconnect();
      __print_error(`MongoDB connection error : ${error}`);
      return reject(false);
    });
    db.on("reconnected", () => {
      __print("MongoDB reconnected!");
    });
    db.on("connected", () => {
      const models = glob.sync(__root_path(`/models/*.model.js`));
      models.forEach(require);
      __print(`[**] connected to database at ${mongoURL}`);
      return resolve(true);
    });
  });
};

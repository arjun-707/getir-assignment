module.exports = {
  dbConfig: {
    mongo: {
      mongoURL: MONGO_URI || "mongodb://localhost:27017/getir-case-study",
      mongoOptions: {
        useNewUrlParser: true,
        // autoReconnect: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      },
    }
  },
};

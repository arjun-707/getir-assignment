const express = require("express");
require("express-async-errors");
const cors = require("cors");
const { ErrorResponse, isObject } = require(`../utils`);

exports.initMiddleware = (app) => {
  app.use(cors());
  // app.use(allowCrossDomain);

  // query param parsing
  app.use(express.json({ limit: "300mb", extended: true }));
  app.use(express.urlencoded({ limit: "300mb", extended: true }));
  app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (responseResult) {
      __print(
        "********************************************** sending response ***********************************************"
      );
      if (isObject(responseResult)) responseResult.servedBy = "Getir";
      res.send = oldSend;
      return res.send(responseResult);
    };
    next();
  });
  app.use((req, res, next) => {
    __print("req.host        ==> ", req.get("Host"));
    __print("req.originalUrl ==> ", req.originalUrl);
    __print("req.method      ==> ", req.method);
    __print("req.headers      ==> ", req.headers);
    __print("req.query       ==> ", req.query);
    __print("req.body        ==> ", req.body);
    __print("req.params        ==> ", req.params);
    next();
  });

  // global error handling and send response
  app.use((err, req, res, next) => {
    if (!err) return next();
    __print(
      "****************************** express-async-errors ******************************"
    );
    __print_error(err);
    __print("req.originalUrl =====> ", req.get("Host"), req.originalUrl);
    if (!res.headersSent)
      return ErrorResponse(
        res,
        "internal",
        "wrong",
        "something wrong happened"
      );
  });
};

exports.finalMiddleware = (app) => {
  // 404 Handler
  app.use((req, res, next) => {
    return ErrorResponse(res, "notFound", "noRoute", "error");
  });
};

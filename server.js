"use strict";

var express = require("express");
var cors = require("cors");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//**POST form */

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  console.log(req.file);
  const uploadedFile = { filename: req.file.originalname, filesize: req.file.size };
  res.json(JSON.stringify(uploadedFile));
});

//**Error handler */

app.use((err, req, res, next) => {
  let errCode, errMessage;
  errCode = err.status || 404;
  errMessage = err.message || "Not Found";
  res.status(errCode).type("txt").send(errMessage);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});

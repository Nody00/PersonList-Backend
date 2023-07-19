const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/person");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/person", personRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, error: true });
});

mongoose
  .connect(
    process.env.MONGO_CONNECT ||
      "mongodb+srv://dinokrcic2077:WIE5ZiNdPBLW0QKL@cluster0.p4qnyoc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));

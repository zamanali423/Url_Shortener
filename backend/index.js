require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const shortUrlRouter = require("./routers/shortUrl");

const port = process.env.PORT;
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
app.use("/short_url", shortUrlRouter);
app.get("/", (req, res) => {
  res.send("server running");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connect database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

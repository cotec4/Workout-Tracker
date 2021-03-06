const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require("path");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/Workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require(path.join(__dirname, "/routes/api-routes.js")));
app.use(require(path.join(__dirname, "/routes/view.js")));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}..`);
})
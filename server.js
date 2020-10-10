const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3030;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((data) => res.json(data))
        .catch((err) => res.status(500).send(err));
});

app.post("/api/workouts", (req, res) => {
    const workout = req.body;
    db.Workout.create(workout)
        .then((data) => res.json(data));
});

app.put("/api/workouts/:id", (req, res) => {
    const workout = req.body;
    const id = req.params.id;
    db.Workout.findByIdAndUpdate(id, { $push: { exercises: workout } })
        .then(() => res.send(201))
        .catch((err) => res.status(500).send(err));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

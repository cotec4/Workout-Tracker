const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    excercises: [
        {
            type: {
                type: String,
                required: true,
                enum: ["Resistance", "Cardio"]
            },
            name: {
                type: String,
                required: true
            },
            distance: {
                type: Number,
                required: function () {
                    return excercises.type === "Cardio"
                }
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: function () {
                    return excercises.type === "Resistance"
                }
            },
            reps: {
                type: Number,
                required: function () {
                    return excercises.type === "Resistance"
                }
            },
            sets: {
                type: Number,
                required: function () {
                    return excercises.type === "Resistance"
                }
            }
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
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
                    return this.type === "Cardio"
                }
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: function () {
                    return this.type === "Resistance"
                }
            },
            reps: {
                type: Number,
                required: function () {
                    return this.type === "Resistance"
                }
            },
            sets: {
                type: Number,
                required: function () {
                    return this.type === "Resistance"
                }
            }
        }
    ]
});

workoutSchema.virtual("totalDuration").get(() => {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
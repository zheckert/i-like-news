const mongoose = require("mongoose")
const Schema = mongoose.Schema
const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    votes: {
        type: [],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        voteType: {
            type: String
        }
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("News", newsSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const votesSchema = new Schema({
    type: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
})

module.exports = mongoose.model("Votes", votesSchema)
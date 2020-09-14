const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    vote:{type: String, required: true},
    voters:{type: Array, required: false}

})

module.exports =mongoose.model('Post',postSchema)
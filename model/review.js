const mongoose = require('mongoose');
const Game = require('../model/game')

const reviewSchema = new mongoose.Schema({
    author: {
        required: true,
        type: String
    },
    game:{
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Review', reviewSchema)
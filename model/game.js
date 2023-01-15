const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Game', gameSchema)
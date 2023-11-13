const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A list must have a title.'],
        unique: true,
        trim: true,
        minlength: [1, 'A list title must have at least 1 character.']
    },

})

const List = mongoose.model('List', listSchema);

module.exports = List;

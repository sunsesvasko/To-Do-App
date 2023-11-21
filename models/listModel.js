const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A list must have a title.'],
        unique: true,
        trim: true,
        minlength: [1, 'A list title must have at least 1 character.']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
});

listSchema.virtual('tasks', {
    ref: 'Task',
    foreignField: 'list',
    localField: '_id'
})


const List = mongoose.model('List', listSchema);

module.exports = List;

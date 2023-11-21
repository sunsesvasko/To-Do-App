const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title.'],
        trim: true,
        minlength: [1, 'A task title must have at least 1 character.']
    },
    content: String,
    scheduled: Date,
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: [true, 'A task must belong to a list.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
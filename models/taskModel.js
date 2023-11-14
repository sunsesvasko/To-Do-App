const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A task must have a name.'],
        trim: true,
        minlength: [1, 'A task name must have at least 1 character.']
    },
    content: String,
    scheduled: Date,
    tags: Array,
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: [true, 'A task must belong to a list.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A task must belong to a user.']
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
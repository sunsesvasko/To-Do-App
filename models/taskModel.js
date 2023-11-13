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
    tags: Array
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
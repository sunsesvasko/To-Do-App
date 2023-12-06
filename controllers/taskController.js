const Task = require('./../models/taskModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getTask = factory.getOne(Task);
exports.getAllTasks = factory.getAll(Task);

exports.createTask = catchAsync(async(req, res, next) => {
    const task = await Task.create({
        title: req.body.title,
        content: req.body.content,
        list: req.body.list,
        // user: req.user.id
    })

    res.status(201).json({
        status: 'success',
        data: {
            task
        }
    });
})

exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);
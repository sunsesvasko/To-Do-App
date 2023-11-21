const List = require('./../models/listModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getList = factory.getOne(List, { path: 'tasks' , select: {
    title: 1,
}});
exports.getAllLists = factory.getAll(List);
exports.createList = factory.createOne(List);
exports.updateList = factory.updateOne(List);
exports.deleteList = factory.deleteOne(List);
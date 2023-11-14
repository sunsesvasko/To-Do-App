const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getOne = (Model, popOptions) => catchAsync(async(req, res, next) => {
    let query = Model.findById(req.params.id);
    if(popOptions) query = query.populate(popOptions);
    const doc = await query;

    if(!doc) return next(new AppError(`No document found with that ID`), 404);

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    });
});

exports.getAll = Model => catchAsync(async(req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
        status: 'success',
        length: docs.length,
        data: {
            docs
        }
    });
});

exports.createOne = Model => catchAsync(async(req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            doc: newDoc
        }
    });
});

exports.updateOne = Model => catchAsync(async(req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!updatedDoc) return next(new AppError(`No document found with that ID`), 404);

    res.status(200).json({
        status: 'success',
        data: {
            doc: updatedDoc
        }
    })
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
        status: 'success',
        data: null
    })
});
const catchAsync = require('../utils/catchAsync');
const List = require('./../models/listModel');
const Task = require('./../models/taskModel');

const reOrderTimeSensitiveTaskArray = (arr) => {
    // Re-Order 
    const upcoming = arr.pop();
    const stickywall = arr.shift();
    arr.unshift(upcoming);
    arr.push(stickywall);
    return arr;
}

const findDefaultListsAndPopulate = async(arr) => {
    return List.find({
        title: { $in: arr }
    }).populate('tasks');
}

const findPersonalListAndPopulate = async(arr) => {
    return List.find({
        title: { $nin: arr }
    }).populate('tasks');
}

const structureListName = (listName) => {
    let result = listName.split(' ');

    for(let i = 0; i < result.length; i++) {
        result[i] = result[i][0].toUpperCase() + result[i].substr(1);
    }

    return result;
}

exports.getLandingPage = (req, res) => {
    res.status(200).render('landingPage', {
        title: 'Landing Page'
    });
}

exports.getSignupForm = (req, res,) => {
    res.status(200).render('signup', {
        title: 'Signup Page'
    })
}

exports.getSigninForm = (req, res,) => {
    res.status(200).render('signin', {
        title: 'Signin Page'
    })
}

exports.getOverviewPage = catchAsync(async(req, res,) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const defaultLists = await findDefaultListsAndPopulate(excludeLists);
    const personalLists = await findPersonalListAndPopulate(excludeLists);

    // Re-Order 
    reOrderTimeSensitiveTaskArray(defaultLists);

    res.status(200).render('overview', {
        title: 'Your To-Do List',
        personalLists,
        defaultLists
    })
});

exports.getListPage = catchAsync(async(req, res, next) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const defaultLists = await findDefaultListsAndPopulate(excludeLists);
    const personalLists = await findPersonalListAndPopulate(excludeLists);

    const listName = structureListName(req.query.name);

    const currentList = await List.findOne({ title: listName.join(' ') }).populate('tasks');

    reOrderTimeSensitiveTaskArray(defaultLists);

    res.status(200).render('list', {
        title: `${listName}`,
        defaultLists,
        personalLists,
        currentList
    })

});

exports.getNewListPage = catchAsync(async(req, res, next) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const defaultLists = await findDefaultListsAndPopulate(excludeLists);
    const personalLists = await findPersonalListAndPopulate(excludeLists);

    reOrderTimeSensitiveTaskArray(defaultLists);

    res.status(200).render('newList', {
        title: `Add New List`,
        defaultLists,
        personalLists
    })

});

exports.getTaskPage = catchAsync(async(req, res, next) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const defaultLists = await findDefaultListsAndPopulate(excludeLists);
    const personalLists = await findPersonalListAndPopulate(excludeLists);

    // const listName = req.query.listName.split(' ');
    const listName = structureListName(req.query.listName);
    const taskName = req.query.taskName;

    const currentList = await List.findOne({ title: listName.join(' ') }).populate('tasks');
    const currentTask = await Task.findOne({ title: taskName }).select('title content');

    // TO DO - SEND BACK currentTask and start displaying TASK MENU TO USER
    reOrderTimeSensitiveTaskArray(defaultLists);

    res.status(200).render('task', {
        title: `${listName}`,
        defaultLists,
        personalLists,
        currentList,
        currentTask 
    });
});

exports.getNewTaskPage = catchAsync(async(req, res, next) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const defaultLists = await findDefaultListsAndPopulate(excludeLists);
    const personalLists = await findPersonalListAndPopulate(excludeLists);

    // const listName = req.query.listName.split(' ');
    const listName = structureListName(req.query.listName);
    // const taskName = req.query.taskName;

    const currentList = await List.findOne({ title: listName.join(' ') }).populate('tasks');
    // const currentTask = await Task.findOne({ title: taskName }).select('title content -_id');

    // TO DO - SEND BACK currentTask and start displaying TASK MENU TO USER
    reOrderTimeSensitiveTaskArray(defaultLists);

    res.status(200).render('newTask', {
        title: `${listName}`,
        defaultLists,
        personalLists,
        currentList,
        // currentTask 
    });
});
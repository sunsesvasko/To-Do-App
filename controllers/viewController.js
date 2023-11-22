const catchAsync = require('../utils/catchAsync');
const List = require('./../models/listModel');

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
    const defaultLists = await List.find({
        title: { $in: excludeLists }
    }).populate('tasks');
    const personalLists = await List.find({
        title: { $nin: excludeLists }
    }).populate('tasks');

    // Re-Order 
    const upcoming = defaultLists.pop();
    const stickywall = defaultLists.shift();
    defaultLists.unshift(upcoming);
    defaultLists.push(stickywall);

    res.status(200).render('overview', {
        title: 'Your To-Do List',
        personalLists,
        defaultLists
    })
});

exports.getListPage = catchAsync(async(req, res, next) => {
    const excludeLists = ['Upcoming', 'Today', 'Sticky Wall']
    const lists = await List.find({
        title: { $nin: excludeLists }
    }).populate('tasks');
    console.log(lists);
    const listName = req.query.name.split(' ');

    for(let i = 0; i < listName.length; i++) {
        listName[i] = listName[i][0].toUpperCase() + listName[i].substr(1);
    }
    const list = await List.findOne({ title: listName.join(' ') });

    res.status(200).render('list', {
        title: `${listName}`,
        lists,
        list
    })

});
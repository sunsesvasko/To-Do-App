const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getLandingPage);
router.get('/signup', viewController.getSignupForm);
router.get('/signin', viewController.getSigninForm);
router.get('/overview', viewController.getOverviewPage);
router.get('/overview/list', viewController.getListPage);
router.get('/overview/list/task', viewController.getTaskPage);
router.get('/overview/list/newTask', viewController.getNewTaskPage);

module.exports = router;
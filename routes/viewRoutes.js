const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getLandingPage);
router.get('/signup', viewController.getSignupForm)
router.get('/signin', viewController.getSigninForm)
router.get('/overview', viewController.getOverviewPage)

module.exports = router;
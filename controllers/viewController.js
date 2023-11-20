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

exports.getOverviewPage = (req, res,) => {
    res.status(200).render('overview', {
        title: 'Your To-Do List'
    })
}
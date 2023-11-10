


exports.getLandingPage = (req, res) => {
    res.status(200).render('landingPage', {
        title: 'This is the Landing Page'
    })
}

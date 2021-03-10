const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn =  req.get('Cookie')
    // .split(';')[1]
    // .trim() // to remove white space
    // .split('=')[1] === 'true';

    // console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: "Your orders",
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie','isLoggedIn=true'); // Set-Cookie is the reserved key name to send the cookie. here we are sending isLoggedIn cookie as  true which can be seen on DevTools

    // req.session.isLoggedIn = true;
    // res.redirect('/');

    User.findById("60472e979bff78338ce267ca")
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
};
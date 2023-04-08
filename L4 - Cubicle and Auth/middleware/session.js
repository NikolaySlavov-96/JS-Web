const { verifyToken } = require('../services/userService');

module.exports = (app) => (req, res, next) => {
    const token = req.cookies.token;
    // const token = req.cookies[token];

    if(token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/login');
            return;
        }
    }
    next()
}


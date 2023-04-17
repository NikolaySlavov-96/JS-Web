const { verifyToken } = require("../servicess/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.user = userData;
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/'); //TO DO check addres
            return
        }
    }
    next();
}
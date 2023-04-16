const { verifyToken } = require("../servicess/userService");

module.exports = () => (req, res, next) => {
    const token = req.body.cookie;

    if(token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/'); //TO DO check addres
            return
        }
    }
    next();
}
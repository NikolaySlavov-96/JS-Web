const { verifyToken } = require("../services/userServices");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        try {
            const userVerify = verifyToken(token);
            console.log(userVerify)
            req.user = userVerify;
            res.locals.email = userVerify.email;
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return
        }
    }
    next();
}
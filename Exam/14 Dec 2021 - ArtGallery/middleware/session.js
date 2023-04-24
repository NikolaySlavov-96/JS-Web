const { verificationToken } = require("../services/authService");

module.exports = () => async (req, res, next) => {
    const token = req.cookie.token;

    if (token) {
        try {
            const userData = await verificationToken(token);
            req.user = userData;
            res.locals.username = userData.username;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return
        }
    }
    next();
}
const { parseToke } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if(token) {
        try {
            const payload = parseToke(token);
            req.user = payload;
            req.token = token;
        } catch(err) {
            return res.status(401).json({message: 'Invalid authorization token'});
        }
    }
    next();
}
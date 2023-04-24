module.exports = (...extKey) => (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            if (extKey.includes(key) == false) {
                req.body[key] = req.body[key].trim();
            }
        }
    }
    next();
}
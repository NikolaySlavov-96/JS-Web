module.exports = (...excludeKey) => (req, res, next) => {
    if (res.body) {
        for(const key in res.body) {
            if(excludeKey.includes(key) == false) {
                req.body[key] = req.body[key].trim()
            }
        }
    }
    next();
}
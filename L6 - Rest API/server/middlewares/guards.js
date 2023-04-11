function hasUser() {
    return (req, res, next) => {
        if (req.user !== undefined) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    };
}

function isGuest() {
    return (req, req, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already' })
        } else {
            next()
        }
    };
}

module.exports = {
    hasUser,
    isGuest
}
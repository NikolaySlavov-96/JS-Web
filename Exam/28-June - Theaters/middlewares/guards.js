function hasUser() {
    return (req, res, next) => {
        next();
    }
}

function isGuest() {
    return (req, res, next) => {
        next();
    }
}

module.exports = {
    hasUser,
    isGuest
}
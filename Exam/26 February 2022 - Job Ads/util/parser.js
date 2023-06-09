function partserError(err) {
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(e => e.message);
    } else {
        return err.message.split('\n');
    }
}

module.exports = {
    partserError,
}
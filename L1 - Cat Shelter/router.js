const routes = {};

function register(method, path, handler) {
    if(routes[path] == undefined) {
        routes[path] = {};
    }

    routes[path][method] = handler;
}

function match(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    let handler;
    const action = routes[url.pathname];
    if(action != undefined) {
        handler = action[req.method];
    }

    if(typeof handler == 'function') {
        handler(req, res);
    } else {
        // router.default['GET'](req, res);
    }
}

module.exports = {
    match,
    get: register.bind(null, 'GET'),
    post: register.bind(null, 'POST')
}
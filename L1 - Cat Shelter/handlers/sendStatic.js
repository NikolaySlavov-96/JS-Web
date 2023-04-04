const fs = require('fs');

function sendStaticFile(req, res) {
    
    const addressArray = req.url.split('/');

    res.writeHead(200, {
        'Content-Type': 'image'
    });
    fs.createReadStream(`./content/${addressArray[2]}/${addressArray[3]}`).pipe(res);
}

module.exports = {
    sendStaticFile
}
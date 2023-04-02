const http = require('http');
const port = 3005;
const router = require('./router');
const { homeControler } = require('./handlers/home');
const { addBreed, addCat } = require('./handlers/addControllers');

router.get('/', homeControler)
router.get('/cats/addBreed', addBreed);
// router.post('/cats/addBreed', createBreed);
router.get('/cats/addCat', addCat);
// router.post('/cats/addCat', createCat);


const server = http.createServer(router.match);
server.listen(port);
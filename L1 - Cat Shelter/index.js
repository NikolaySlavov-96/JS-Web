const http = require('http');
const port = 3000;
const router = require('./router');
const { homeControler } = require('./handlers/home');
const { addBreed, addCat } = require('./handlers/addControllers');
const { sendStaticFile } = require('./handlers/sendStatic');
const { createBreed, createCats } = require('./handlers/postControllers');

router.get('/', homeControler)
router.get('/cats/addBreed', addBreed);
router.post('/cats/addBreed', createBreed);
router.get('/cats/addCat', addCat);
router.post('/cats/addCat', createCats);
// router.get('default', )

router.get('/content', sendStaticFile)

const server = http.createServer(router.match);
server.listen(port);
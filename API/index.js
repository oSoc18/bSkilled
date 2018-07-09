const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'API up and running' });   
});

app.use('/api', router);
app.listen(port);
console.log('API running on port:' + port);
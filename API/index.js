const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
const uuidv1 = require('uuid/v1');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();

router.get('/', function(req, res) {
    res.json({ status: 'success' });   
});

router.get('/badgeclasses', function(req, res) {
    res.json({
            status: 'success', 
            badgeclasses: db.get('badgeclasses').value() 
        });
});

router.post('/assertion', function(request, response){
    let assertion = {};
    assertion.id = uuidv1();
    assertion.type = "Assertion"
    let date = new Date();
    assertion.issuedOn = date.toISOString();
    response.send(request.body);
});


app.use('/api', router);
app.listen(port);
console.log('API running on port:' + port);
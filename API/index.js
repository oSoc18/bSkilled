const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
const uuidv1 = require('uuid/v1');
const shortid = require('shortid');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();


router.get('/', function (req, res) {
  res.json({ status: 'success' });
});

router.get('/badgeTemplate', function (req, res) {
  res.send(db.get('badgeTemplate').value());
});

router.get('/badgeTemplate/:id', function (req, res) {
    res.send(db.get('badgeTemplate').value()[req.params.id]);
  });

router.post('/implication', function (request, response) {
  let implication = { "@context": "https://w3id.org/openbadges/v2",
    "id" : uuidv1(),
    "type": "Assertion",
    "badgetemplate": request.body.badgetemplate,
    "recipient": request.body.recipient
    };
  let sid = shortid.generate();
  db.get('implication').set(sid, implication).write();
  response.send({sid,implication});

});

router.get('/implication/:id', function (req, res) {
    res.send(db.get('implication').value()[req.params.id]);
  });

router.post('/assertion', function (request, response) {
    let assertion = request.body;
    let sid = shortid.generate();
    db.get('assertion').set(sid, assertion).write();
    response.send({sid,assertion});
  });

router.get('/assertion/:id', function (req, res) {
    res.send(db.get('assertion').value()[req.params.id]);
  });


router.post('/profile', function (request, response) {//TODO test
    let profile = request.body;
    let sid = request.body.publickey;//validate
    db.get('profile').set(sid, assertion).write();
    response.send({sid,assertion});
  });

router.get('/profile/:identifier', function (req, res) {//TODO test
    res.send(db.get('profile').value()[req.params.identifier]);
  });
app.use('/api', router);
app.listen(port);
console.log('API running on port:' + port);
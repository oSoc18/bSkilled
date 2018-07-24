const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

db.defaults({
  version: 'v0.1',
  badgeTemplate: {},
  implication: {},
  assertion: {},
  profile: {}
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();

// Set CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD, PUT, PATCH, DELETE, TRACE, CONNECT");
  next();
});

// Set Content-Type always be JSON
router.use(function(req, res, next) {
  res.set({ 'Content-Type': 'application/json; charset=utf-8' });
  next();
});

router.get('/', function(req, res) {
  res.json({ status: 'success' });
});

router.get('/badgeTemplate', function(req, res) {
  const templates = db.get('badgeTemplate').value();
  if (templates) {
    res.send(templates);
  } else {
    res.status(404).send();
  }
});

router.get('/badgeTemplate/:id', function(req, res) {
  const badgeTemplate = db.get('badgeTemplate').value()[req.params.sid];
  if (badgeTemplate) {
    res.send(badgeTemplate);
  } else {
    res.status(404).send();
  }
});

router.post('/implication', function(request, response) {
  const sid = shortid.generate();
  const { badgeTemplate, recipient } = request.body;
  const implication = { badgeTemplate, recipient, sid, signed: false };
  db.get('implication').set(sid, implication).write();
  response.send({ sid, implication });
});

router.patch('/share/:sid', function(req, res) {
  const sid = req.params.sid;
  const { sourceImgUrl, imageBase64, signedAssertion } = req.body;
  const implication = db.get('implication').value()[req.params.sid];
  const badge = {
    signed: true,
    sid,
    sourceImgUrl,
    imageBase64,
    signedAssertion,
    implication
  };
  db.get('implication').set(req.params.sid, badge).write();
  res.send();
});

router.get('/share/:sid', function(req, res) {
  const implication = db.get('implication').value()[req.params.sid];
  if (implication) {
    res.send(implication);
  } else {
    res.status(404).send();
  }
});


router.post('/profile', function(request, response) { //TODO test
  let profile = request.body;
  let sid = profile.fingerprint;
  delete profile.fingerprint;
  db.get('profile').set(sid, profile).write();
  response.send({ sid, profile });
});

router.get('/profile/:identifier', function(req, res) { //TODO test
  const profile = db.get('profile').value()[req.params.identifier];
  if (profile) {
    res.send(profile);
  } else {
    res.status(404).send();
  }
});

router.use('/proxy/:url', function(req, res) {
  const base64url = req.params.url;
  const url = Buffer.from(base64url, 'base64').toString('utf-8');
  req.pipe(request(url)).pipe(res);
});


app.use('/api', router);
app.listen(port);

console.log(`API running on http://localhost:${port}/api`);
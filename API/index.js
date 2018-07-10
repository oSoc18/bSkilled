const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);


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

router.post('/assertion', function(request, response) {
  response.send(request.body); // echo the result back
});


app.use('/api', router);
app.listen(port);
console.log('API running on port:' + port);
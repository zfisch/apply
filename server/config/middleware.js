var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var redis = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var morgan = require('morgan');
var applicationController = require('../application/applicationController.js');
var appController = require('../app/appController');
var statusController = require('../status/statusController');

module.exports = function(app, express) {

  var router = express.Router();
  var client = redis.createClient();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('tiny'));
  app.use(express.static(__dirname + '/../../client'));

  app.use(session({
    secret: 'ssshhhhh',
    store: new redisStore({ host: 'localhost', port: 6379, client: client }),
    resave: false,
    saveUninitialized: false
  }));

  router.get('/session', function(req, res){
    console.log(req.session.user);
    if(!req.session.user){
      res.status(401).send({ error: "User is not logged in." });
    } else {
      res.status(200).send(req.session.user);
    }
  });

  router.get('/user/:id/application', appController.getUserApplications);

  router.post('/user/:id/application', appController.createNewApplication);

  router.post('/user', appController.signup);
  router.post('/user/login', appController.login);
  router.post('/user/logout', appController.logout);

  app.use('/api', router);

};

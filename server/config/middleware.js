var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var redis = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var morgan = require('morgan');
var utils = require('./utility');
var applicationController = require('../application/applicationController.js');
var appController = require('../app/appController');
var statusController = require('../status/statusController');

module.exports = function(app, express) {

  var router = express.Router();
  var client = redis.createClient();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  app.use(express.static(__dirname + '/../../client'));

  app.use(session({
    secret: 'ssshhhhh',
    store: new redisStore({ host: 'localhost', port: 6379, client: client }),
    resave: false,
    saveUninitialized: false
  }));

  // router.post('/session', utils.createSession);

  //  function(req, res) {
  //   req.session.redSession = req.params.value;
  //   res.send('session written in Redis successfully');
  // });

  // router.get('/session', utils.getSession);

  //   function(req, res) {
  //   if(req.session.redSession)
  //     res.send('the session value stored in Redis is: ' + req.session.redSession);
  //   else
  //     res.send("no session value stored in Redis ");
  // });

  router.post('/application', appController.createNewApplication);

  router.post('/user', appController.signup);
  router.post('/user/login', appController.login);
  // router.post('/user/logout', appController.logout);

  app.use('/api', router);

};

var bodyParser = require('body-parser');
var utils = require('./utility');
var applicationController = require('../application/applicationController.js');
var appController = require('../app/appController');
var statusController = require('../status/statusController');

module.exports = function(app, express) {

  var router = express.Router();

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  router.post('/application', appController.createNewApplication);

  router.post('/user', appController.signup);
  router.post('/user/login', appController.login);

  app.use('/api', router);

};

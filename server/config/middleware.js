var bodyParser = require('body-parser');
var utils = require('./utility');
var applicationController = require('../application/applicationController.js');
var appController = require('../app/appController');

module.exports = function(app, express) {

  var router = express.Router();

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  router.post('/application', applicationController.saveApplication);

  router.post('/user', appController.signup);

  app.use('/api', router);

};

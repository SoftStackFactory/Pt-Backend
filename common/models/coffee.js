var mailgun = require('../../mailgun/testMailgun.js');

module.exports = function(Appuser) {
  Appuser.resetPassword = function(cb) {
    mailgun.sendEmail();
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  Appuser.remoteMethod(
    'resetPassword', {
      http: {
        path: '/resetPassword',
        verb: 'get'
      },
      returns: {
        
        arg: 'status',
        type: 'string'
      }
    }
    
  );
};
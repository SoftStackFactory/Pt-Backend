var test = require('./hello.js');

test.hello();

var mailgun = require('./testMailgun.js');
mailgun.sendEmail();
'use strict';

var mailgun = require('../../mailgun/testMailgun.js');

module.exports = function(Appuser) {
    Appuser.observe('after save', function(ctx, next) {
        if(ctx.isNewInstance === true) {
            var instance = ctx.instance;
            instance.createAccessToken(1209600000, function(err, response) { 
                if(err === null) ctx.instance["token"] = response.id;
                next();
            });
        }else {
             next();
        }
    });
    Appuser.resetPassword = function(cb) {
        console.log("password reset email requested");
        
        //generate new temporary password (or token?)
        
        mailgun.sendEmail();
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

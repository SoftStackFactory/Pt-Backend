'use strict';

var mailgun = require('../../mailgun/passReset.js');

module.exports = function(Appuser) {
   /*
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
    */
    Appuser.resetPassword = function(email, code, cb) {
        console.log("password reset email requested");
        
        mailgun.sendEmail( email, code );
        
        console.log("Password Reset Email Sent");
        var response = 'Password Reset request sent to ' + 
          email;
        cb(null, response);
        console.log('response', response);
    };
    
    Appuser.remoteMethod(
    'resetPassword', {
      http: {
        path: '/resetPassword',
        verb: 'post'
      },
      
      accepts: [{arg: 'email', type: 'string'}],
      
      returns: {
        arg: 'resetPassword',
        type: 'string'
      }
    }
    
  );
    
};


/* COPY OF ORGANIZATION MODEL
Organization.request = function( userId, name, website, cb) {
      mailgun.sendEmail(userId, name, website);
    //Organization.request = function (cb) {    
        //mailgun.sendEmail();
        
        console.log("New Organization request email sent");
        var response = 'New organization request submited by ' + userId + 
          ' for ' + name + ' at ' + website;
        cb(null, response);
        console.log('response', response);
        
    };
    
    Organization.remoteMethod(
    'request', {
      http: { path: '/request', verb: 'post' },
      
      accepts: [{arg: 'userId', type: 'string' }, 
          { arg: 'name', type: 'string' },
          { arg: 'website', type: 'string' }],
        
      //accepts: { arg: 'website', type: 'string'},
      returns: {
        arg: 'request',
        type: 'string'
      }
    }
    
  );
  */
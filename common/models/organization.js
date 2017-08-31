'use strict';

var mailgun = require('../../mailgun/orgRequest.js');


module.exports = function(Organization) {
    
    //Organization.request = function(userId, name, website, cb) {
        //mailgun.sendEmail(userId, name, website);
    Organization.request = function (cb) {    
        
        var response;
        
        mailgun.sendEmail();
        
        console.log("New Organization request email sent");
        
        response: 'New Organization request email sent';
        
        cb(null, response);
        
    };
    
    Organization.remoteMethod(
    'request', {
      http: {
        path: '/request',
        /*
        accepts: [{arg: 'userId', type: 'string' }, 
            { arg: 'name', type: 'string' },
            { arg: 'website', type: 'string' }],
        */
        verb: 'post'
      },
      returns: {
        
        arg: 'request',
        type: 'string'
      }
    }
    
  );

};

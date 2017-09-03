'use strict';

var mailgun = require('../../mailgun/orgRequest.js');


module.exports = function(Organization) {
    
    Organization.request = function( website, cb) {
      mailgun.sendEmail(website);
    //Organization.request = function (cb) {    
        //mailgun.sendEmail();
        
        console.log("New Organization request email sent");
        var response = 'New Organization request email sent for ' + website;
        cb(null, response);
        console.log('response', response);
        
    };
    
    Organization.remoteMethod(
    'request', {
      http: { path: '/request', verb: 'post' },
      
      /*
        accepts: [{arg: 'userId', type: 'string' }, 
            { arg: 'name', type: 'string' },
            { arg: 'website', type: 'string' }],
        */
      
      accepts: { arg: 'website', type: 'string'},
      returns: {
        arg: 'request',
        type: 'string'
      }
    }
    
  );

};

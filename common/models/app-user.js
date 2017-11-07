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
    
    Appuser.afterRemote('login', async (ctx, user, next) => {
        if(user){
            console.log("hit")
            user.token = user.id;
        
            let userData = await Appuser.find({
                    fields:{password: false, username: false, realm: false, '_id': 0},
                    include:[{
                        relation: 'testTakens',
                            scope: {
                                fields: ['name', 'userId', 'date', 'orgId', 'id', 'testId'],
                                include:{
                                    relation: 'Answer',
                                    scope: {
                                        fields: ['questionId', 'testTakenId', 'selection', 'date', 'id', 'keyed', 'category']
                                    }
                                }
                            }
                        },{
                        relation: 'Organization',
                            scope: {
                                fields: ['name', 'ownerId', 'description', 'id'],
                                include:{
                                    relation: 'Test',
                                    scope: {
                                        fields: ['description', 'orgId', 'name', 'type', 'style', 'date', 'metric', 'id', 'category'],
                                        include:{
                                            relation: 'Question',
                                            scope: {
                                                fields: ['testId', 'text', 'category', 'multiplier', 'weight', 'keyed', 'id']
                                            }
                                        }
                                    }
                                }
                            }
                    }],
                    where: {
                    id: user.userId
                }
            })
            
            console.log()
            user.userData = userData[0]
        }
    })
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

// let userData = await Appuser.find({
//                     fields:{password: false, username: false, realm: false, '_id': 0},
//                     include:[{
//                         relation: 'testTakens',
//                             scope: {
//                                 fields: ['name', 'userId', 'date', 'orgId', 'id'],
//                                 include:{
//                                     relation: 'Answer',
//                                     scope: {
//                                         fields: ['questionId', 'testTakenId', 'selection', 'date', 'id', 'keyed', 'category']
//                                     }
//                                 }
//                             }
//                         },{
//                         relation: 'Organizations',
//                             scope: {
//                                 fields: ['name', 'ownerId', 'description', 'id'],
//                                 include:{
//                                     relation: 'Test',
//                                     scope: {
//                                         fields: ['description', 'orgId', 'name', 'type', 'style', 'date', 'metric', 'id', 'category'],
//                                         include:{
//                                             relation: 'Question',
//                                             scope: {
//                                                 fields: ['testId', 'text', 'category', 'multiplier', 'weight', 'keyed', 'id']
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                     }],
//                     where: {
//                     id: user.userId
//                 }
//             })
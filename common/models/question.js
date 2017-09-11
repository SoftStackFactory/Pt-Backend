'use strict';

module.exports = function(Question) {
Question.uniqueCategories= function ( cb) {
    var productCollection = Question.getDataSource().connector.collection(Question.modelName),
        uniqueTags = productCollection.distinct('category', function (err, results) {
            cb(null, results)
        })
}
    Question.remoteMethod(
    'uniqueCategories', {
      http: {
        path: '/uniqueCategories',
        verb: 'get',
        },
         description: 'Get  list of unique b Questions category',
        returns: { arg: 'data', type: ['Question'], root: true }
    });
}
module.exports = function(app) {
  var jsonArr = require('../questions.json');
  console.log('app.models.Question', app.models.Question);
  var Question = app.models.Question;

  Question.destroyAll();
  Question.upsert(jsonArr, (err, obj) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Questions inserted successfully");
    }
  })
}

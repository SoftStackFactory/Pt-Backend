module.exports = function(app) {
  var jsonArr = require('../questions.json');
  console.log('app.models.Question', app.models.Question);
  var Question = app.models.Question;
  // var Answer = app.models.Answer;
  // var TestTaken = app.models.TestTaken;
  var AppUser = app.models.AppUser;

  // Answer.destroyAll();
  // TestTaken.destroyAll();
  AppUser.destroyAll();
  
  Question.destroyAll();
  Question.upsert(jsonArr, (err, obj) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Questions inserted successfully");
    }
  })
  
}

module.exports = function(app) {
  var jsonArr = 
    [
      (require('../questions/questions.json')), 
      (require('../questions/questions-pedro.json')),
      (require('../questions/questions-catell.json')),
      (require('../questions/questions-mini.json')),
      (require('../questions/questions-7factor.json'))
    ];
  // console.log('app.models.Question', app.models.Question);
  var Question = app.models.Question;
  // var Answer = app.models.Answer;
  // var TestTaken = app.models.TestTaken;
  // var AppUser = app.models.AppUser;

  // Answer.destroyAll();
  // TestTaken.destroyAll();
  // AppUser.destroyAll();
  
  Question.destroyAll();
  Question.upsert(jsonArr, (err, obj) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Questions inserted successfully");
    }
  })
  
}

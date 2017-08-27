const Request = require("request");
const ConfigJson = require('./config.json');
const mode = ConfigJson.mode;
const url = ConfigJson[mode]["alerts"]["email"]["emailUrl"];
const Url = "https://api:key-022e0e4b40a34cb007e882a6a736e9fb@api.mailgun.net/v3/mg.idsentral.com/messages"

//Email list for group send
const Emails = [
    'peterehorton@gmail.com', 
    "phorton@softstackfactory.org"
    ]
//User info so we can send personalized emails with recepient variables below
let users = 
    {
        "peterehorton@gmail.com": 
            { "first":"eter" },
        "phorton@softstackfactory.org":
            { "first": "Johnny" },
        "marenkb@gmail.com":
            { "first": "Maren" }
    }
    
//Email data to send % note recipient variables    
let formData = {
 'recipient-variables':JSON.stringify(users),
  from:'Excited User <mailgun@mg.idsentral.com>',
  to: Emails,
  subject:'Hey, %recipient.first%' + new Date().toISOString(),
  text:'Hello %recipient.first%, click Here to Go to'
}
// HTTP here with call back function as second parameter
Request.post({
        url:Url, 
        formData: formData
    }, 
    function(err, httpResponse, body) {
        if (err) {
            return console.error('post failed:', err);
        }
     console.log('Post successful!  Server responded with:', body);
});

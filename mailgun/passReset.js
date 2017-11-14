const Request = require("request");

const Url = "https://api:key-022e0e4b40a34cb007e882a6a736e9fb@api.mailgun.net/v3/mg.idsentral.com/messages"

exports.sendEmail = function( email, code ) {
    Request.post({
        url:Url, 
        formData: {
            from:'PersonaTest <mailgun@mg.idsentral.com>',
            to: email,
            subject:'PersonaTest Password Reset',
            text: 'Your password reset request has been processed. ' +
            'Please use this temporary password to log in, then change your password: ' +
                //code
                123456
        }
    }, 
    function(err, httpResponse, body) {
        if (err) {
            return console.error('post failed:', err);
        }
     console.log('Post successful!  Server responded with:', body);
    });
}

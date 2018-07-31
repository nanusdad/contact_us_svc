var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
}));

var mailOptions = {
  from: "contactus@sending-domain.com",
  to: "to@send-to.com",
  subject: "hello there",
  html: 'testing one two three'
}

// send mail with defined transport object
transport.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
  }else{
    console.log('Message sent: ' + info.response);
  }
});

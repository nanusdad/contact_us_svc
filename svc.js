var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  console.log(util.inspect(req.url));
  console.log(util.inspect(req.method));
  if (req.url == '/submit' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files) {
      res.setHeader("Access-Control-Allow-Origin", 
                        "http://sending-domain.cosending-domain.com");
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields}));
      console.log(util.inspect({fields: fields}));
      email_out(JSON.stringify(fields));
    });

    return;
  }
      
}).listen(3065); 


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
}));

function email_out(formdata) {
  var mailOptions = {
    from: "contactus@sending-domain.com",
    to: "to_who_form_data@send-to.com",
    subject: "hello there",
    html: formdata
  }

  // send mail with defined transport object
  transport.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
  });
}

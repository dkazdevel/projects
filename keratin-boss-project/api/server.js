const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      nodemailer = require('nodemailer'),
      app = express(),
      server = require('http').createServer(app);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/apitry/sendEmail', (req, res) => {
  let message,
  recipient = 'dkaz.devel@gmail.com',
  title = 'New request for contact';
  message = `Название курса: ${req.body.title}.<br> Имя: ${req.body.userName}.<br>Телефон: ${req.body.userTel}.<br>Email: ${req.body.userEmail}`;

  sendEmail(message, recipient, title);

	res.sendStatus(204);
});

async function sendEmail(message, recipient, title) {
  transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'goDancingJsClub@gmail.com',
    pass: 'Qaz12 xsw 3!@#'
  }
});

  const mailOptions = {
    from: 'goDancingJsClub@gmail.com',
    to: recipient,
    subject: title,
    html: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

server.listen(3000, () => console.log('Server has been started...'));

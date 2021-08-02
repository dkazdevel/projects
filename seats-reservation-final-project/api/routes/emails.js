const express = require('express'),
      router = express.Router(),
      config = require('config'),
      fs = require('file-system'),
      async = require("async");
      nodemailer = require('nodemailer');


router.post('/api/sendEmailToOffice', (req, res) => {
  let message = `Имя: ${req.body.name}.<br>Телефон: ${req.body.telNumber}.<br>Email: ${req.body.email}`,
  recipient = 'dkaz.devel@gmail.com',
  title = 'New request for contact';

  sendEmail(message, recipient, title);

	res.sendStatus(204);
});

router.post('/api/sendEmailToCustomer', (req, res) => {
  const messageObj = req.body;
  let message = `Спасибо за Ваше бронирование! Ваш номер заказа: ${messageObj.orderId}<br>Детали Вашего заказа:<br>Имя: ${messageObj.userName}<br>Телефон: ${messageObj.userTel}
  <br>Email: ${req.body.userEmail}<br><br>Концерт: ${messageObj.title}<br>Дата: ${messageObj.date}<br>Место: ${req.body.place}<br>Тип места: ${messageObj.seatType}<br>Номер Вашего места: ${messageObj.seatId}<br>
  Количество мест: ${messageObj.quantity}<br>Стоимость заказа: ${messageObj.price * messageObj.quantity}zł`,
  recipient = messageObj.userEmail,
  title = `Подтверждение бронирования номер: ${messageObj.orderId}`;

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

module.exports = router;

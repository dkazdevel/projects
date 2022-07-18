const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})

const port = process.env.PORT || 6000;
app.listen(port);

console.log('server started '+ port);

//
//const express = require('express');
// const path = require('path');
// const serveStatic = require('serve-static');
//
// app = express();
//
// app.use(express.static(__dirname + '/dist'));
//
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/index.html'))
// })
//
// const server = app.listen(app.get('port'), function() {
//     console.log('listening on port ', server.address().port);
// });




var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');










const app = express();




// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client/build")));


app.get('*', (req, res) => {
  res.json('Hello!')
});



const server = http.createServer(app)

server.listen();

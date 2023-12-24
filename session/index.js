'use strict'

const express = require('express')
const session = require('express-session')

const app = express()

// Populates req.session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat'
}))

app.get('/', function(req, res){
  let body = ''
  if(req.session.views){
    ++req.session.views
  }else {
    req.session.views = 1
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
})

app.listen(3000);
console.log('Express app started on port 3000');
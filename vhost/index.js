'use strict'

const express = require('express')
const logger = require('morgan')
const vhost = require('vhost')


/**
 * edit /etc/hosts:
 * 127.0.0.1  foo.example.com
 * 127.0.0.1  bar.example.com
 * 127.0.0.1  example.com
 */

// Mains server app
const main = express()

main.use(logger('dev'))

main.get('/', function(req, res){
  res.send('Hello from main app!')
})

main.get('/:sub', function(req, res){
  res.send('requested ' + req.params.sub)
})

// Redirect app

const redirect = express()
redirect.use(function(req,res){
  console.log(req.vhost)
  res.redirect('http://example.com:3000/'+ req.vhost[0])
})

// Vhost app

const app = express()

app.use(vhost('http://sub.localhost:3000/', redirect)) // Serves all subdomain all subdomains via Redirect app
app.use(vhost('http://localhost/:3000', main)) // Serves top level domain via Main Server app

app.listen(3000, () => console.log('Express started on port 3000'))
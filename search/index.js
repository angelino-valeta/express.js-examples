'use strict'
const express = require('express')
const path = require('path')
const redis =require('redis')

let db = redis.createClient()

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// populate search

db.sAdd('ferret', 'tobi');
db.sAdd('ferret', 'loki');
db.sAdd('ferret', 'jane');
db.sAdd('cat', 'manny');
db.sAdd('cat', 'luna');

/**
 * GET search for :query
 */

app.get('/search/:query?', function(req, res){
  let query = req.params.query
  db.sMembers(query, function(err, vals){
    if(err) return res.send(500)
    res.send(vals)
  })
})

app.get('/client.js', function(req, res){
  res.sendFile(path.join(__dirname, 'client.js'))
})

app.listen(3000, () => console.log('Express started on port 3000'))
'use strict'

const express = require('express')
const logger = require('morgan')
const path = require('path')
const app = express()


// log request
app.use(logger('dev'))

// express on it own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GEt /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')))


// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')))


// if some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET   /style.css" instead of "GET /css/style.css"
// app.use(express.static(path.join(__dirname, 'public', 'css')))


app.listen(3000)
console.log('listening on port 3000')
console.log('try:')
console.log(' GET /index.txt')
console.log(' GET /js/app.js')
console.log(' GET /css/style.css')
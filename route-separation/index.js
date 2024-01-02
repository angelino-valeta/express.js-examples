const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')


const app = express()

module.exports = app

// Config

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))

app.listen(3000, () => { console.log('Express started on port 3000')})
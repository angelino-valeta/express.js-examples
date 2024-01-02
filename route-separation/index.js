const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')


const app = express()

app.listen(3000, () => { console.log('Express started on port 3000')})
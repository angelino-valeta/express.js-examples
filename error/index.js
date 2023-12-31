'use strict'

const express = require('express')
const app = express();
const logger = require('morgan')
const test = app.get('env') === 'test'

if(!test) app.use(logger('dev'))

// error handling middleware have an arity of 4
// instead of the typical (req,res, next),
// otherwise they behave exactly like regular
// middleware, you may have several of them,
// in different orders etc

function error(err, req, res, next){
  // log it
  if(!test) console.error(err.stack);

  // respond with 500 "Internal server Error"

  res.status(500)
  res.send('Internal Server Error')
}

app.get('/', function(){
  // Caught and passed down to the errorHandler middleware
  throw new Error('something broke!')
})


app.get('/next', function(req, res, next){
  // We can also pass exception to next()
  // The reason for process.nextTick() is to show that
  // next() can be called inside an async operation
  // in real life it can be a DB read or HTTP request
  process.nextTick(function(){
    next(new Error('oh no!'))
  })
})


// The error handler is placed after routes
// if it were above it should not receive errors
// from app.get() etc

app.use(error)



app.listen(3000, () => {
  console.log("Server started on port 3000")
})
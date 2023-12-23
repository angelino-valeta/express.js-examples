'use strict'

const express = require('express')
const path = require('path')
const User = require('./user')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// filter ferrets only
function ferrets(user){
  return user.species === 'ferret'
}

// native nesting approach
// delegating errors to next(err)
// in order to expose the "count"
// and "users" locals

app.get('/', function(req, res, next){
  User.count(function(err, count){
    if(err) return next(err)
    User.all(function(err, users){
      if(err) return next(err)
      res.render('index', {
        title: 'Users',
        count: count,
        users: users.filter(ferrets)
      })
    })
  })
})


// this approach is cleaner
// less nesting and we have
// the variables available
// on the request object

function count(req, res, next){
  User.count(function(err, count){
    if(err) return next(err)
    req.count = count
    next()
  })
}

function users(req, res, next){
  User.all(function(err, users){
    if(err) return next(err)
    req.users = users
    next()
  })
}


app.get('/midlleware', count, users, function(req, res){
  res.render('index', {
    title: 'Users',
    count: req.count,
    users: req.users
  })
})


// this approach is much like the last
// however we're explicity exposing
// the locals within each middleware
//
// note that this may not always work
// well, for example here we filter
// the users in  the middleware, which
// may not be ideal for our application.
// so in that sense the previous example
// is more flexible with `req.users`.

function count2(req, res, next){
  User.count(function(err, count){
    if(err) return next(err)
    res.locals.count = count
    next()
  })
}


function users2(req, res, next){
  User.all(function(err, users){
    if(err) return next(err)
    res.locals.users = users
    next()
  })
}

app.get('/middleware-locals', count2, users2, function(req, res){
  // you can see now how we have much less
  // to pass to res.render(). If we have
  // several routes related to users this
  // can be a great productivity booster
  console.log(res.locals)
  res.render('index', { title: 'Users' })
})




app.listen(3000, () => console.log('Express started on port 3000') )
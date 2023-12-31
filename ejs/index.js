const express = require('express')
const path = require('path')
const app = express();

// Register ejs as .html. If we did
// not call this, we would need to 
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function  that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// case `ejs.__express`.

app.engine('.html', require('ejs').__express)

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'))

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')))

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html')
app.set('view engine', 'html')

// Dummy users
const users = [
  {name: 'tobi', email: 'tobi@learnboost.com'},
  {name: 'loki', email: 'lok@learnboost.com'},
  {name: 'jane', email: 'jane@learnboost.com'}
]

app.get('/', function(req, res){
  res.render('users', {
    users: users,
    title: 'EJS example',
    header: 'Some users'
  })
})


app.listen(3000, () =>{
  console.log('Server started on port 3000')
})
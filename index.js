const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphndbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphndbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine) // engine registration
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true })) // use middlewares
app.use(todoRoutes)
app.use(express.static(path.join(__dirname, 'public')))

async function start() {
  try {
    await mongoose.connect('mongodb+srv://nem:q1w2e3r4@cluster0.pbrzz.mongodb.net/nodeExpressMongo', {
      useUnifiedTopology: true, 
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT, ()=> {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
} 

start()
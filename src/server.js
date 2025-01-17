require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
const app = express()
const port = process.env.PORT

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// config templates engine & config static file 
configViewEngine(app)

// khai báo routes
app.use('/', webRoutes)
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      
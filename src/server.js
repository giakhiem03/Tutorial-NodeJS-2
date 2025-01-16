require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const mysql = require('mysql2')

const app = express()
const port = process.env.PORT

// config templates engine & config static file 
configViewEngine(app)

// khai báo routes
app.use('/', webRoutes)

//test connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect();
 
connection.query('SELECT * from users', function (error, results, fields) {
  if (error) throw error;
  console.log('The result is: ', results);
});
 
connection.end();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      
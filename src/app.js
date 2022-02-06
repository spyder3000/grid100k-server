/* the starting point for our application -- creates an express app & gets it running;  */
const express = require('express'); 
const path = require('path');   // core node module (nodejs.org);  
var cors = require('cors'); 

require('./db/mongoose')  // will connect to mongoose
const personRouter = require('./routers/person'); 

const app = express()
if (process.env.NODE_ENV !== 'production') {
   app.use(cors());     // cors used to allow access from client 
}

const publicPath = path.join(__dirname, '../client/public'); 

app.use('/api/', personRouter);  // all /api routes should be handled by the server code

// Serve static assets if in Production  
console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV); 
//if (process.env.NODE_ENV === 'production') {
   // Set static folder 
   app.use(express.static(publicPath)); 
   app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html')); 
   })
//}

module.exports = app

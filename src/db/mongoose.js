const mongoose = require('mongoose'); 

const connectionURL  = process.env.MONGODB_URL;  //  e.g. 'mongodb://127.0.0.1:27017/grid_project'

// creates new database -- grid_project
mongoose.connect(connectionURL, {   
    useCreateIndex: true, 
    useFindAndModify: false   //  to fix (node:18156) DeprecationWarning: collection.findAndModify is deprecated. (ch 93 promise-chaining.js) 
})

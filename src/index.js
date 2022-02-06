const app = require('./app')

//const port = process.env.PORT || 3001;    // process.env.PORT will come from Heroku for production;  3001 otherwise
const port = process.env.PORT                

app.listen(port, () => {
    console.log('CORS Server is up on port ' + port); 
})


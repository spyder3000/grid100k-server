// NOT Used -- placeholder in case authentication will be added at a later time 

/* const jwt = require('jsonwebtoken')  // to validate token provided
const User = require('../models/user')   // to find user in db after we've authenticated token

// Check JWT Authentication Tokens before proceeding to route handler 
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   

        // also want to make sure this token is in users token array (active tokens;  tokens are deleted from array upon logging out)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});  // tokens.token -- looks for user w/ a given token value in array
        if (!user) {
            throw new Error()   // no message - will trigger catch below
        }
        req.token = token;      // setting req.token here allows other route handlers to have access to the token (e.g. to logoff) 
        req.user = user;        // passes user to allow route handler to access, so route handlers won't have to access user a 2nd time; 
        next();             // all is good;  let route handler run
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth; 
*/


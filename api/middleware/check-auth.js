const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //use arrow funtion with next for if success move to next function
   try { //use try to try and verify token against env key
    //const token = req.headers.authorization; you can test token delivery by assigning token to req.header.authorization and loging it
    //console.log(token);
    const token = req.headers.authorization.split(' ')[1]; //we split the token to parse and account for the whitespace between Bearer and token
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    next(); //upon success move forward
} catch { //if failed catch error and return response
    return res.status(401).json({
        message: 'Auth failed'
    });
}

     
};

//tokens should be passed through the Authorization header 
// Key: Authorization
// Value: Bearer authToken
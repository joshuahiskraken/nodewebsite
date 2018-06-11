const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.users_get_all = (req, res, next) => {
    User.find().select( '_id email' ).exec().then(docs => {
        const userresponse = {
            count: docs.length,
            users: docs.map(doc => {
                return {email: doc.email, _id: doc._id }
            })
        };
    
     if (docs.length >= 0) { //select() returns if or else. We just need to say if docs is more than 0 produce json{}
         res.status(200).json(userresponse);
     }else{
         res.status(404).json({ //Else say this
             message: 'no users found'
         });
     }

    })
    .catch(err => {            //catch any errors
        console.log(err);       // Log them
        res.status(500).json({  //Produce them using json
            error: err 
        });
    });
};

exports.users_post = (req, res, next) => {
    User.find({email: req.body.email}) // User.find() method searches db for req.body.email and returns as array. could also use.findOne() to avoid using arrays
        .exec()                             //exec to make it a promise then IF docuser (user signing up) exists
        .then(user => {
            if (user.length >= 1) { //if user array return and is less than or equal to 1 we know there is another address with the same email
                return res.status(409).json({
                    message: "email exist"
                });                        //Conflict. req received but conflict

            }   else {
                
       bcrypt.hash(req.body.password, 10, (err, hash) => { //use bcrypt.hash to hash the req body password 10x which is typically safe. cb err or the hashed pw
        if (err) {
            return res.status(500).json({
                error: err,
                message: 'failed at bcrypt'
            });
        } else {
            const user = new User ({ //create new user in db and use the output hash as password: property
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save() //save in db then log result
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'User Created'
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    });

            }
        })
        
    };

    exports.users_signin = (req, res, next ) => { //create login router by using find(method) for an email that matches the req body email
        User.find({email: req.body.email}) //could also use findOne() instead to avoid returning an array
        .exec()
        .then(user => {  
            if(user.length < 1) { //get an array we can name user if the users length is less than 1, that means no email exists. Return 401 unauthorized
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } //use bcrypt to compare the ptext pw with the first element of the returned user array password field from the mongo model
            bcrypt.compare(req.body.password, user[0].password, (err, result) => { //use the cb to return error or result
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) { //the way that bcrypt.compare works is if result true or if result false. 
                   const token = jwt.sign({  //take the user array email and id properties to sign into the webtoken, make token an object that contains the following information
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                {
                    expiresIn: '1hr' //expiration variable
                }
            );
                    return res.status(200).json({ 
                        message: 'Auth successful',
                        token: token //pass token back in message json
                    });
                }
                res.status(401).json({
                    message: 'auth failed'
                });
            });
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }; 

    exports.user_delete = (req, res, next) => { //router to user in db by :userId
        User.remove({_id: req.params.userId}) //remove user with _id: assigned in model
        .exec()
        .then( result => { //then if no error - result if error then catch and log error 
            res.status(200).json({
                message: 'User Deleted' 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    };
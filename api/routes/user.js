//9:03 https://www.youtube.com/watch?v=0D5EEKH97NA 
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth'); //middleware we use for token auth
const usersController = require('../controllers/userscontroller');
//will be protected route only admin currently just any jwt
router.get('/', checkAuth, usersController.users_get_all);

router.post('/signup', usersController.users_post);

router.post('/login', usersController.users_signin);

router.delete('/:userId', checkAuth, usersController.user_delete);



module.exports = router;
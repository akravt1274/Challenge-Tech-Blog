const router = require('express').Router();

const userRoutes = require('./userRoutes');

const postRoutes = require('./postRoutes');

router.use('/users', userRoutes); // Signup, Login
router.use('/posts', postRoutes); // Post, Comment


module.exports = router;
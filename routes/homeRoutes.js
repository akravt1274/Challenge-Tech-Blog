const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../public/utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,  
          attributes: ['content', 'username', 'date_created'],          
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = allPosts.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('home', {
      posts,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', auth, async (req, res) => {  
  try {    
    // Get all posts for the logged in user
    const userPosts = await Post.findAll(
      {
        include: [
          {
            model: User, where: { username: req.session.username},
            attributes: ['username'],
          },
        ],
      });     

    // Serialize data so the template can read it
    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      posts, 
      username: req.session.username,
      user_id: req.session.id,    
      logged_in: req.session.logged_in      
    }); 

  } catch (err) {
        res.status(400).json(err);
  }
});

module.exports = router;

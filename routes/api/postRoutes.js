const router = require('express').Router();
const { DATE } = require('sequelize');
const { Post, Comment, User } = require('../../models');
const auth = require('../../public/utils/auth');

// display post form
router.get('/add', auth, (req, res) => {
    try {
        res.render('post', {           
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// create a new post
router.post('/add', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await Post.create({
            title,
            content,    
            date_created: new Date(),
            user_id: req.session.user_id,
        });
            
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// edit post details
router.get('/edit/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
        });
        
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        } else {
            // Serialize data so the template can read it
            const postData = post.get({ plain: true });
            res.render('update-post', { 
                postData,
                id: req.params.id,
                logged_in: req.session.logged_in 
            }); 
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// view post details
router.get('/view/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: Comment, User,
        });
        
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        } else {
            // Serialize data so the template can read it
            const postData = post.get({ plain: true });
            
            res.render('view-post', { 
                postData,
                id: req.params.id,
                logged_in: req.session.logged_in 
            }); 
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


// update post
router.put('/edit/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        } else {         
            const updatedPost = await Post.update(
                { title, content },
                { where: { id: req.params.id } },
            );
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// display comment form
router.get('/:id/comment', auth, (req, res) => {
    try {
        res.render('comment', {     
            post_id: req.params.id,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// add a comment to a post
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.create({
            content,
            date_created: new Date(),
            post_id: req.params.id,       
            username: req.session.username,
            // user_id: req.session.user_id,
            }
        );
            
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
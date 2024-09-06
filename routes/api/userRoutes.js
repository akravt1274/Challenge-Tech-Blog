const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const auth = require('../../public/utils/auth');

// display login form
router.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(400).
                json({ message: 'Incorrect username or password, please try again or sign up.' });
            return;
        }
        
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            console.log('Incorrect password');
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;            
            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// display signup form
router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(400).json(err);
    }
});

// register new user
router.post('/signup', async (req, res) => {
    try {     
        const { username, password } = req.body;
        const userExists = await User.findOne({ where: { username } });
           
        if (userExists) {
            res.status(400).json({ message: 'User already exists, please sign in.' });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });            
        
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;               
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            console.log('logout request');
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            console.log('logout request');
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
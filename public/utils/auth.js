const auth = (req, res, next) => {  
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/api/users/login');
  } else {
    next();
  }
};

module.exports = auth;
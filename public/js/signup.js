const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
            
        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
           document.location.replace('/dashboard');
        } else {
            $('#error-msg').text('Incorrect username or password, please try again or sgin in.');
        }  
    }
    else {
        $('#error-msg').text('Incorrect username or password, please try again.');
    } 
};

const loginHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/api/users/login');    
};

$(document).ready(function () {
    // Clear error message
    $('#error-msg').text(''); 

    $('#signup-btn').on('click', signupFormHandler);
    $('#login-btn').on('click', loginHandler);
});
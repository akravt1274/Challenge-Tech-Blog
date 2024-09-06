const logoutHandler = async () => {
    console.log('logoutHandler call');
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
    }
    else {
            $('#error-msg').text('Please try again');
    }        
};

$(document).ready(function () {
    $('#logout').on('click', logoutHandler);
});
const createPostHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title) {
      
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts/add', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
            
        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
            $('#error-msg').text('Please try again.');
        }       
    }         
    else {
        $('#error-msg').text('Please provide title.');
    }   
};


const updatePostHandler = async (event) => {
    event.preventDefault();
     // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title) {
        const id = event.target.getAttribute('data-id');
        console.log('id',id);
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/posts/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });     
        
        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace(`/api/posts/view/${id}`);
        } else {
            $('#error-msg').text('Please try again.');
        }       
    }         
    else {
        $('#error-msg').text('Please provide title.');
    } 
};

$(document).ready(function () {
    // Clear error message
    $('#error-msg').text('');
    $('#create').on('click', createPostHandler);
    $('#update').on('click', updatePostHandler);
});

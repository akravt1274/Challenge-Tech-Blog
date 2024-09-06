const addCommentHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const content = document.querySelector('#content').value.trim();

    if (content) {
        const postid = event.target.getAttribute('post-id');
        console.log('data_id',postid);
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/posts/${postid}/comment`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
            
        if (response.ok) {
            // If successful, redirect the browser to the home page
            document.location.replace('/');
        } else {
            $('#error-msg').text('Please try again.');
        }       
    }         
    else {
        $('#error-msg').text('Please provide comment.');
    }   
};

$(document).ready(function () {
    // Clear error message
    $('#error-msg').text('');
    $('#add-comment').on('click', addCommentHandler);
});
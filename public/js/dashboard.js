const addPostHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/api/posts/add');    
};

const deletePostHandler = async (event) => {
  //event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }   
};

$(document).ready(function () {    
  $('#add-post').on('click', addPostHandler);
  $('.delete-post').on('click', deletePostHandler);
});


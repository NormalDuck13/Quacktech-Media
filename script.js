document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const settingsBtn = document.querySelector('.settings');
    const body = document.body;

    // Load existing posts
    fetchPosts();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const name = document.getElementById('name').value;
        const media = document.getElementById('media').files[0];

        const post = {
            title,
            name,
            media: media ? URL.createObjectURL(media) : null,
        };

        savePost(post);
        addPostToDOM(post);

        postForm.reset();
    });

    settingsBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    function fetchPosts() {
        // Load posts from JSON files (for simplicity, this is a mock)
        // In a real app, you'd fetch from a server or local storage
        const mockPosts = [
            { title: 'First Post', name: 'User1', media: null },
            { title: 'Second Post', name: 'User2', media: null }
        ];

        mockPosts.forEach(post => {
            addPostToDOM(post);
        });
    }

    function savePost(post) {
        // Save post to local storage or server (mock function)
        console.log('Post saved:', post);
    }

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>Posted by: ${post.name}</p>
            ${post.media ? `<img src="${post.media}" alt="media">` : ''}
        `;

        postsDiv.appendChild(postDiv);
    }
});

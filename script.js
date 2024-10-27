document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const settingsBtn = document.querySelector('.settings');
    const body = document.body;
    const messageDiv = document.getElementById('message');
    const searchInput = document.getElementById('search');

    loadPosts();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const name = document.getElementById('name').value;
        const media = document.getElementById('media').value;

        const post = {
            title,
            name,
            media
        };

        try {
            savePost(post);
            addPostToDOM(post);
            showMessage('Posted Successfully!', 'success');
        } catch (error) {
            showMessage('Couldn\'t save your post.', 'error');
        }

        postForm.reset();
    });

    settingsBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const title = post.querySelector('h2').innerText.toLowerCase();
            const name = post.querySelector('p').innerText.toLowerCase();
            if (title.includes(searchQuery) || name.includes(searchQuery)) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    });

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => addPostToDOM(post));
    }

    function savePost(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>Posted by: ${post.name}</p>
            ${post.media ? `<video src="${post.media}" controls></video>` : ''}
        `;

        postsDiv.appendChild(postDiv);
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
    }
});


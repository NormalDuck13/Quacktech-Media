document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const settingsBtn = document.querySelector('.settings');
    const body = document.body;
    const messageDiv = document.getElementById('message');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');

    loadPosts();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const name = document.getElementById('name').value;
        const mediaFile = document.getElementById('media').files[0];

        let mediaURL = '';
        if (mediaFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                mediaURL = e.target.result;

                const post = {
                    title,
                    name,
                    mediaURL
                };

                try {
                    savePost(post);
                    addPostToDOM(post);
                    showMessage('Posted Successfully!', 'success');
                } catch (error) {
                    showMessage('Couldn\'t save your post.', 'error');
                }
            };
            reader.readAsDataURL(mediaFile);
        } else {
            const post = {
                title,
                name,
                mediaURL: null
            };

            try {
                savePost(post);
                addPostToDOM(post);
                showMessage('Posted Successfully!', 'success');
            } catch (error) {
                showMessage('Couldn\'t save your post.', 'error');
            }
        }

        postForm.reset();
    });

    settingsBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    searchButton.addEventListener('click', () => {
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

        let mediaElement = '';
        if (post.mediaURL) {
            if (post.mediaURL.startsWith('data:image')) {
                mediaElement = `<img src="${post.mediaURL}" alt="media">`;
            } else if (post.mediaURL.startsWith('data:video')) {
                mediaElement = `<video src="${post.mediaURL}" controls></video>`;
            } else if (post.mediaURL.endsWith('.gif')) {
                mediaElement = `<img src="${post.mediaURL}" alt="media">`;
            }
        }

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>Posted by: ${post.name}</p>
            ${mediaElement}
        `;

        postsDiv.appendChild(postDiv);
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
    }
});

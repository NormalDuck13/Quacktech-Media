document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const settingsBtn = document.querySelector('.settings');
    const body = document.body;

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

        savePost(post);
        addPostToDOM(post);

        postForm.reset();
    });

    settingsBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
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
});

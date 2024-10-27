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

        // Also save the post to a separate HTML file
        savePostToHtml(post);

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
        localStorage.setItem('savedPost', JSON.stringify(post)); // Save the post to localStorage
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

    function savePostToHtml(post) {
        const postHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="styles.css">
                <title>${post.title}</title>
            </head>
            <body>
                <header>
                    <h1>${post.title}</h1>
                    <div class="settings">⚙️ Settings</div>
                </header>
                <div class="container">
                    <p>Posted by: ${post.name}</p>
                    ${post.media ? `<video src="${post.media}" controls></video>` : ''}
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([postHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // Save the file locally
        const a = document.createElement('a');
        a.href = url;
        a.download = `${post.title.replace(/ /g, '_')}.html`;
        a.click();
    }
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const media = document.getElementById('media').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const post = document.createElement('div');
        post.classList.add('post');

        const postTitle = document.createElement('h2');
        postTitle.textContent = title;
        post.appendChild(postTitle);

        const postName = document.createElement('p');
        postName.textContent = `Posted by: ${name}`;
        post.appendChild(postName);

        if (media.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            post.appendChild(img);
        } else if (media.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            post.appendChild(video);
        }

        document.getElementById('posts').appendChild(post);
    };

    reader.readAsDataURL(media);

    document.getElementById('postForm').reset();
});

import { backend } from 'declarations/backend';

let selectedCategory = '';
let selectedPostId = 0;

function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

function formatText(command) {
    document.execCommand(command, false, null);
}

async function loadCategories() {
    const categories = await backend.getCategories();
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        li.addEventListener('click', () => {
            document.querySelectorAll('#category-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            loadPosts(category);
        });
        categoryList.appendChild(li);
    });
}

async function loadPosts(category) {
    selectedCategory = category;
    const posts = await backend.getPosts(category);
    const postList = document.getElementById('post-list');
    postList.innerHTML = `<h3>${category}</h3>`;
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h4>${sanitizeHTML(post.title)}</h4>
            <div>${post.content}</div>
            <p>4uth0r: ${sanitizeHTML(post.author)}</p>
            <p>P0st3d: ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
        `;
        postDiv.addEventListener('click', () => loadComments(post.id));
        postList.appendChild(postDiv);
    });
    document.getElementById('new-post-form').style.display = 'block';
}

async function loadComments(postId) {
    selectedPostId = postId;
    const comments = await backend.getComments(postId);
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div>${comment.content}</div>
            <p>4uth0r: ${sanitizeHTML(comment.author)}</p>
            <p>P0st3d: ${new Date(Number(comment.timestamp) / 1000000).toLocaleString()}</p>
        `;
        commentList.appendChild(commentDiv);
    });
    document.getElementById('comments').style.display = 'block';
}

document.getElementById('submit-post').addEventListener('click', async () => {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').innerHTML;
    const author = document.getElementById('post-author').value;
    if (title && content && author) {
        await backend.createPost(selectedCategory, sanitizeHTML(title), content, sanitizeHTML(author));
        loadPosts(selectedCategory);
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').innerHTML = '';
        document.getElementById('post-author').value = '';
    }
});

document.getElementById('submit-comment').addEventListener('click', async () => {
    const content = document.getElementById('comment-content').innerHTML;
    const author = document.getElementById('comment-author').value;
    if (content && author) {
        await backend.createComment(selectedPostId, content, sanitizeHTML(author));
        loadComments(selectedPostId);
        document.getElementById('comment-content').innerHTML = '';
        document.getElementById('comment-author').value = '';
    }
});

window.addEventListener('load', loadCategories);

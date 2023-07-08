function attachEvents() {
    const [postBtn, posts, viewBtn, comments] = ['#btnLoadPosts', '#posts', "#btnViewPost", '#post-comments']
        .map(sel => document.querySelector(sel))
    postBtn.addEventListener('click', onPost)
    viewBtn.addEventListener('click', onView)
    let postBody = '';
    async function onPost(e) {
        const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
        const data = await response.json();
        posts.innerHTML = "";
        Object.entries(data).forEach(([key, value]) => {
            let optionElement = document.createElement('option');
            optionElement.value = key
            optionElement.textContent = value.title
            posts.appendChild(optionElement)
            postBody = value.body
        })
    }
    async function onView(e) {
        let select = [...posts.children].find((x) => x.selected == true)
        const [res, comment] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/blog/posts/${select.value}`),
            fetch(`http://localhost:3030/jsonstore/blog/comments`)
        ]);
        const data = await res.json();
        comments.innerHTML = "";
        document.getElementById('post-title').textContent = posts.options[posts.selectedIndex].text
        document.getElementById('post-body').textContent = postBody
        const dataComments = await comment.json();
 
        Object.values(dataComments).forEach((el) => {
            if (data.id == el.postId) {
                let li = document.createElement('li')
                li.textContent = el.text
                li.id = el.id
                comments.appendChild(li);
            }
        });
    }
}
attachEvents();
function comments() {
   const topicName = sessionStorage.getItem('topicName');
   const time = sessionStorage.getItem('time');
   const username = sessionStorage.getItem('username');
   const postContent = sessionStorage.getItem('content');

   const form = document.querySelector('form');
   form.addEventListener('submit', submitComment);

   document.querySelector('.theme-name h2').textContent = topicName;

   document.querySelector('div.comment').innerHTML = `
   <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${username}</span> posted on <time>${time}</time></p>

        <p class="post-content">${postContent}</p>
    </div>`;

   async function loadComments() {
      document.querySelector('div.comment').innerHTML = `
   <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${username}</span> posted on <time>${time}</time></p>

        <p class="post-content">${postContent}</p>
    </div>`;

      const response = await fetch(
         'http://localhost:3030/jsonstore/collections/myboard/comments'
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);

      const date = new Date().toJSON();
      for (const post of Object.values(data)) {
         document.querySelector(
            '.comment'
         ).innerHTML += `<div id="user-comment">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <p><strong>${
                       post.username
                    }</strong> commented on <time>${date}</time></p>
                    <div class="post-content">
                        <p>${post.postText}</p>
                    </div>
                </div>
            </div>
        </div>`;
      }
   }
   loadComments();

   async function submitComment(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const postText = formData.get('postText');
      const username = formData.get('username');

      if (!postText) return alert('No text');
      else if (!username) return alert('No username');

      try {
         const settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postText, username }),
         };

         const response = await fetch(
            'http://localhost:3030/jsonstore/collections/myboard/comments',
            settings
         );
         if (!response.ok) throw new Error(response.statusText);
         loadComments();
      } catch (err) {
         alert(err.message);
      }
   }
}
comments();

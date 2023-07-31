export async function loadPosts() {
   document.querySelector('.topic-container').innerHTML = '';
   const response = await fetch(
      'http://localhost:3030/jsonstore/collections/myboard/posts'
   );
   if (!response.ok) throw new Error(response.statusText);
   const data = await response.json();

   for (const post of Object.values(data)) {
      document.querySelector('.topic-container').innerHTML += `<div id="${
         post._id
      } class="topic-name-wrapper">
      <div class="topic-name">
          <a href="#" data-content="${post.content}" class="normal">
              <h2>${post.title}</h2>
          </a>
          <div class="columns">
              <div>
                  <p>Date: <time>${generateRandomDate(
                     new Date(2013, 12, 13),
                     new Date()
                  )},</time></p>
                  <div class="nick-name">
                      <p>Username: <span>${post.username}</span></p>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
      document
         .querySelectorAll('.topic-name')
         .forEach((x) => x.addEventListener('click', redirect));
   }
}
function redirect(event) {
   const topicNameDiv = event.target.parentElement.parentElement;

   const topicData = event.target.textContent;
   const timeData = topicNameDiv.querySelector('.columns div time').textContent;
   const usernameData = topicNameDiv.querySelector(
      '.columns div .nick-name p span'
   ).textContent;
   window.location = './theme-content.html';
   sessionStorage.setItem('topicName', topicData);
   sessionStorage.setItem('time', timeData);
   sessionStorage.setItem('username', usernameData);
   sessionStorage.setItem('content', event.target.parentElement.dataset.content);
}

//Quality of life website improvements
function generateRandomDate(from, to) {
   return new Date(
      from.getTime() + Math.random() * (to.getTime() - from.getTime())
   ).toJSON();
}

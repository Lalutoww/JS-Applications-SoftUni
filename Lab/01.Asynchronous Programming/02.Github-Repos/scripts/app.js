function loadRepos() {
   const username = document.getElementById('username').value;
   const url = `https://api.github.com/users/${username}/repos`;
   const repos = document.getElementById('repos');

   fetch(url)
      .then((response) => {
         if (!response.ok) {
            throw new Error(`${response.status}`);
         }
         return response.json();
      })
      .then((data) => {
         data.forEach((element) => {
            const li = createLi(element.full_name, element.html_url);
            repos.appendChild(li);
         });
      })
      .catch((e) => {
         const li = createLi(e.message);
         repos.appendChild(li);
      });

   for (const liToRemove of document.querySelectorAll('li')) {
      repos.removeChild(liToRemove);
   }
}
function createLi(fullName, htmlUrl) {
   const li = document.createElement('li');
   const anchor = document.createElement('a');
   anchor.href = htmlUrl;
   anchor.textContent = fullName;
   li.appendChild(anchor);
   return li;
}

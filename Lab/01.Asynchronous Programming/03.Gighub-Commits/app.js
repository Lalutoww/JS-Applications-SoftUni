function loadCommits() {
   const username = document.getElementById('username');
   const repo = document.getElementById('repo');
   const commits = document.getElementById('commits');

   const url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;
   fetch(url)
      .then((response) => {
         if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
         }
         return response.json();
      })
      .then((data) => {
         data.forEach((element) => {
            const li = document.createElement('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`;
            commits.appendChild(li);
         });
      })
      .catch((e) => {
        const li = document.createElement('li');
        li.textContent = `${e.message}`;
         commits.appendChild(li);
      });

      for (const liToRemove of document.querySelectorAll('li')) {
         commits.removeChild(liToRemove);
      }
}

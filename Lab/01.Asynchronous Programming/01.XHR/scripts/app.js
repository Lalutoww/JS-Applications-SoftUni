function loadRepos() {
   const resultDivInput = document.getElementById('res');
   const url = `https://api.github.com/users/testnakov/repos`;
   const httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange', stateChangeHandler);
   function stateChangeHandler() {
      if (httpRequest.readyState == 4 && httpRequest.status === 200) {
         resultDivInput.textContent = httpRequest.responseText;
      }
   }
   httpRequest.open('GET', url);
   httpRequest.send();
}

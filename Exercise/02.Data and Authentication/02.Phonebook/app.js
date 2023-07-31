function attachEvents() {
   const loadBtn = document.getElementById('btnLoad');
   const createBtn = document.getElementById('btnCreate');
   const phonebook = document.getElementById('phonebook');
   const baseURL = `http://localhost:3030/jsonstore/phonebook`;

   loadBtn.addEventListener('click', loadHandler);
   createBtn.addEventListener('click', createHandler);

   async function createHandler() {
      const person = document.getElementById('person');
      const phone = document.getElementById('phone');

        await fetch(baseURL, {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            person: person.value,
            phone: phone.value,
         }),
      });
      person.value = '';
      phone.value = '';
   }

   async function loadHandler() {
      const response = await fetch(baseURL);
      const data = await response.json();
      phonebook.innerHTML = '';

      Object.values(data).forEach((element) => {
         const li = document.createElement('li');
         li.textContent = `${element.person}: ${element.phone}`;
         li.setAttribute('id', `${element._id}`);
         phonebook.appendChild(li);

         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Delete';
         deleteBtn.addEventListener('click', deleteHandler);

         li.appendChild(deleteBtn);
      });
   }

   async function deleteHandler(e) {
      const URL = `${baseURL}/${e.target.parentElement.getAttribute('id')}`;
      await fetch(URL, {
         method: 'delete',
      });
      loadHandler();
   }
}

attachEvents();

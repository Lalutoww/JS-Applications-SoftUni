import { loadPosts } from "./utils.js";
function app() {
   /*TODO:
        ->GET FORM ELEMENT
        ->ADD EVENT LISTENER TO THE FORM ELEMENT
        ->CHECK IF FORM INPUT VALUES ARE CORRECT
            -> if correct make a post request to `http://localhost:3030/jsonstore/collections/myboard/posts`
                ->add unique id attribute to every post to make it easier to use them afterwards
            -> if not handle the eror
        ->CLEAN UP INPUT VALUES AFTER THE PUT REQUEST
        ->IMPLEMENT CANCEL BUTTON LOGIC WHICH CLEANS UP INPUT VALUES WITHOUT SENDING DATA TO SERVER
    */

   const form = document.querySelector('form');
   const cancelBtn = document.querySelector('.cancel');
   const submitBtn = document.querySelector('.public');

   submitBtn.addEventListener('click', onSubmit);
   cancelBtn.addEventListener('click', onCancel);

   function onCancel() {
      document.getElementById('topicName').value = '';
      document.getElementById('username').value = '';
      document.getElementById('postText').value = '';
   }
   loadPosts();

   async function onSubmit(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const title = formData.get('topicName');
      const username = formData.get('username');
      const content = formData.get('postText');

      if (!title) return alert('No title');
      else if (!username) return alert('No username');
      else if (!content) return alert('No content');
      try {
         const settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, username, content }),
         };

         const response = await fetch(
            'http://localhost:3030/jsonstore/collections/myboard/posts',
            settings
         );
         if (!response.ok) throw new Error(response.statusText);
         onCancel();
         loadPosts();
      } catch (err) {
         alert(err.message);
      }
   }
}
app();

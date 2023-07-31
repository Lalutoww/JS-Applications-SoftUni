import { post } from '../api/api.js';
import { showSection } from '../utils/utils.js';
import { showCatalog } from './catalog.js';

const section = document.getElementById('createPage');

export function showCreate() {
   showSection(section);
   const form = section.querySelector('form');
   form.addEventListener('submit', onCreate);

   async function onCreate(event) {
      event.preventDefault();
      const formData = new FormData(form);
      const title = formData.get('title');
      const description = formData.get('description');
      const img = formData.get('imageURL');

      if(title.length < 6) return alert('Title should be at least 6 characters long');
      else if(description.length < 10) return alert('Description should be at least 10 characters long');
      else if(img.length < 5) return alert('image should be at least 5 characters long');

      await post('/data/ideas', { title, description, img });


      document.getElementById('ideaTitle').value = '';
      document.getElementById('createDescription').value = '';
      document.getElementById('inputURL').value = '';
      
      await showCatalog();
   }
}

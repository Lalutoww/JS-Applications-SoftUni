import { getAllIdeas, getIdeaById } from '../api/data.js';
import { showSection } from '../utils/utils.js';
import { showDetails } from './details.js';

const section = document.getElementById('dashboard-holder');

export async function showCatalog() {
   showSection(section);

   const data = await getAllIdeas();
   console.log(section);
   if (data.length < 1) {
      section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
   }else{
      section.innerHTML = '';
   for (const element of data) {
      section.innerHTML += `<div id="${element._id}" class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${element.title}</p>
    </div>
    <img class="card-image" src="${element.img}" alt="Card image cap">
    <a class="btn" id="detailsBtn" data-id="${element._id}" href="#">Details</a>
</div>`;
   }
   const btns = document.querySelectorAll('#detailsBtn');
   btns.forEach((x) => x.addEventListener('click', onDetails));
   }

   async function onDetails(event) {
      event.preventDefault();
      const id = event.target.dataset.id;

      const data = await getIdeaById(id);

      showDetails(data);
   }
}

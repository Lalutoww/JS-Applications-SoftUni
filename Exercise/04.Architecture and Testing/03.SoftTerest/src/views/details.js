import { del } from "../api/api.js";
import { getIdeaById } from "../api/data.js";
import { showSection } from "../utils/utils.js";
import { showCatalog } from "./catalog.js";

const section = document.getElementById("detailsPage");

export function showDetails(idea) {
  showSection(section)

  section.innerHTML = `<img class="det-img" src="${idea.img}" />
  <div class="desc">
      <h2 class="display-5">${idea.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${idea.description}</p>
  </div>
  <div class="text-center">
      <a class="btn detb" style="display: none;" href="">Delete</a>
  </div>`;
  const user = JSON.parse(sessionStorage.getItem('user'));
  const deleteBtn = section.querySelector('.btn.detb');

  if(user && user._id === idea._ownerId){
    deleteBtn.style.display = 'inline-block';
    deleteBtn.addEventListener('click', onDelete)
  } 

  async function onDelete(event){
    event.preventDefault();
    await del(`/data/ideas/${idea._id}`)
    showCatalog();
  }
}
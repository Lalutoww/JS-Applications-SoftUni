import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { towns } from "./towns.js";

const townsDiv = document.getElementById('towns');

   const townsTemplate = html`<ul>${towns.map((town)=> html`<li>${town}</li>`)}</ul>`
   render(townsTemplate, townsDiv);

   document.querySelector('button').addEventListener('click', search)

function search(event) {

   const searchInfo = document.getElementById('searchText').value;
   const towns = Array.from(event.target.parentElement.querySelectorAll('#towns ul li'));
   towns.map(x=>x.removeAttribute('class'));
   const filtered = towns.filter(li => li.textContent.includes(searchInfo));
   filtered.map(x=>x.classList.add('active'));

   document.getElementById('result').textContent = `${filtered.length} matches found`
}

import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const loadBtn = document.getElementById('btnLoadTowns');

loadBtn.addEventListener('click', (event) => {
   event.preventDefault();
   const townInput = document.getElementById('towns').value;
   const townsArr = townInput.split(', ');
   const townsTemplate = html`
   <ul>
      ${townsArr.map((town) => html`<li>${town}</li>`)}
   </ul>`;

   render(townsTemplate, root);
});

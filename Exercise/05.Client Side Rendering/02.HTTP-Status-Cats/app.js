import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { cats } from "./catSeeder.js";

const allCats = document.getElementById('allCats')

const catsTemplate = html`
   <ul>
      ${cats.map((cat) => html`<li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click="${clickHandler}">Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>`)}
   </ul>`;
function clickHandler(event){
    const div = event.target.parentElement.querySelector('.status');
    const target = event.target;
    if(target.textContent === 'Show status code'){
        div.style.display = 'block';
       target.textContent = 'Hide status code';
    }else{
        div.style.display = 'none'
        target.textContent = 'Show status code';
    }

}
render(catsTemplate, allCats);
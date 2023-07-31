import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

const menu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

const response = await fetch(
   'http://localhost:3030/jsonstore/advanced/dropdown'
);
const data = await response.json();

const dataTemplate = repeat(
   Object.values(data),
   (destination) => destination._id,
   (destination, index) =>
      html`<option value="${destination._id}">${destination.text}</option>`
);

render(dataTemplate, menu);

async function addItem(event) {
   const destinationName = document.getElementById('itemText').value;

   await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
      method: 'POST',
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
         text: destinationName,
      }),
   });
}

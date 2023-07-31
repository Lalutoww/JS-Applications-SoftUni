import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFurniture } from '../api/data.js';

export const factTemplate = (furniture) => html`<div class="row space-top">
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${furniture.img}" />
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href=”/data/catalog/${furniture._id}” class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
</div>`;

const dashboardTemplate = (furniture) => html`
   <h2>Fun Facts</h2>
  <section id="dashboard">
   <ul class="card-wrapper">
      ${furniture.map((f) => factTemplate(f))}
   </ul>}
   </section>
`;

export async function showDashboard(ctx) {
   const facts = await getAllFurniture();
   ctx.render(dashboardTemplate(facts));
}
